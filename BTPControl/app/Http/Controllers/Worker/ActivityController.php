<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ChatMessage;
use App\Models\Notification;
use App\Models\ProjectUser;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    private function ensureWorkerInProject(
        Request $request,
        $projectId
    ): ?JsonResponse {
        $workerId = $request->user()->id;

        $exists = ProjectUser::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $workerId
            )
            ->where(
                'role_on_proj',
                'worker'
            )
            ->exists();

        if (!$exists) {
            return response()->json([
                'message' => 'Worker is not assigned to this project.',
            ], 403);
        }

        return null;
    }

    public function messages(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $workerId = $request->user()->id;

        $messages = ChatMessage::with(
            'sender:id,name'
        )
            ->where(
                'project_id',
                $projectId
            )
            ->oldest()
            ->get()
            ->map(
                fn ($message) => [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,

                    'sender' =>
                        $message->sender_id === $workerId
                            ? 'You'
                            : ($message->sender->name ?? 'User'),

                    'message' => $message->message,
                    'attachment_url' => $message->attachment_url,
                    'is_seen' => $message->is_seen,
                    'time' => $message->created_at->format('h:i A'),
                    'created_at' => $message->created_at,
                ]
            );

        return response()->json([
            'messages' => $messages,
        ]);
    }

    public function sendMessage(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $validated = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $workerId = $request->user()->id;

        $message = ChatMessage::create([
            'project_id' => $projectId,
            'sender_id' => $workerId,
            'message' => $validated['message'],
        ]);

        return response()->json([
            'message' => [
                'id' => $message->id,
                'sender_id' => $message->sender_id,
                'sender' => 'You',
                'message' => $message->message,
                'time' => $message->created_at->format('h:i A'),
                'created_at' => $message->created_at,
            ],
        ], 201);
    }

    public function attendance(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $workerId = $request->user()->id;

        $attendance = Attendance::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $workerId
            )
            ->whereDate(
                'check_in',
                Carbon::today()
            )
            ->latest('check_in')
            ->first();

        return response()->json([
            'attendance' => $attendance,
        ]);
    }

    public function checkIn(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $workerId = $request->user()->id;

        $existing = Attendance::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $workerId
            )
            ->whereDate(
                'check_in',
                today()
            )
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'You have already checked in today.',
                'attendance' => $existing,
            ], 422);
        }

        $attendance = Attendance::create([
            'project_id' => $projectId,
            'user_id' => $workerId,
            'check_in' => now(),
            'status' => 'present',
            'role_snapshot' => 'worker',
        ]);

        return response()->json([
            'message' => 'Checked in successfully.',
            'attendance' => $attendance,
        ], 201);
    }

    public function checkOut(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $workerId = $request->user()->id;

        $attendance = Attendance::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $workerId
            )
            ->whereDate(
                'check_in',
                today()
            )
            ->whereNull('check_out')
            ->latest('check_in')
            ->first();

        if (!$attendance) {
            return response()->json([
                'message' => 'No active check-in found.',
            ], 422);
        }

        $attendance->update([
            'check_out' => now(),
        ]);

        $minutes = Carbon::parse(
            $attendance->check_in
        )->diffInMinutes(
            $attendance->check_out
        );

        $hours = intdiv(
            $minutes,
            60
        );

        $remaining = $minutes % 60;

        $duration = '';

        if ($hours > 0) {
            $duration .= "{$hours}h ";
        }

        if ($remaining > 0) {
            $duration .= "{$remaining}min";
        }

        return response()->json([
            'message' => 'Work completed successfully.',
            'attendance' => $attendance,
            'work_duration' =>
                trim($duration) ?: 'Less than 1 min',
        ]);
    }

    public function notifications(
        Request $request,
        $projectId
    ): JsonResponse {
        if (
            $error = $this->ensureWorkerInProject(
                $request,
                $projectId
            )
        ) {
            return $error;
        }

        $workerId = $request->user()->id;

        return response()->json([
            'notifications' => Notification::where(
                'user_id',
                $workerId
            )
                ->where(
                    function ($query) use ($projectId) {
                        $query
                            ->where(
                                'project_id',
                                $projectId
                            )
                            ->orWhereNull(
                                'project_id'
                            );
                    }
                )
                ->latest()
                ->get(),
        ]);
    }
}