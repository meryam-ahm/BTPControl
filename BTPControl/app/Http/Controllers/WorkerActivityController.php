```php
<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\ChatMessage;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WorkerActivityController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Temporary Worker
    |--------------------------------------------------------------------------
    | Until login/authentication is implemented, worker ID 48
    | represents the current worker.
    |--------------------------------------------------------------------------
    */

    private $workerId = 48;

    /*
    |--------------------------------------------------------------------------
    | CHAT - GET MESSAGES
    |--------------------------------------------------------------------------
    */

    public function getMessages($projectId)
    {
        $userId = $this->workerId;

        $messages = ChatMessage::with('sender:id,name')
            ->where('project_id', $projectId)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) use ($userId) {

                return [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,

                    'sender' => $message->sender_id == $userId
                        ? 'You'
                        : ($message->sender->name ?? 'User'),

                    'message' => $message->message,

                    'attachment_url' =>
                        $message->attachment_url,

                    'is_seen' =>
                        $message->is_seen,

                    'time' =>
                        $message->created_at->format('h:i A'),

                    'created_at' =>
                        $message->created_at,
                ];
            });

        return response()->json([
            'messages' => $messages
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CHAT - SEND MESSAGE
    |--------------------------------------------------------------------------
    */

    public function sendMessage(
        Request $request,
        $projectId
    ) {
        $request->validate([
            'message' =>
                'required|string|max:5000',
        ]);

        $userId = $this->workerId;

        $message = ChatMessage::create([
            'project_id' => $projectId,
            'sender_id' => $userId,
            'message' => $request->message,
        ]);

        return response()->json([
            'message' => [
                'id' => $message->id,

                'sender_id' =>
                    $message->sender_id,

                'sender' => 'You',

                'message' =>
                    $message->message,

                'time' =>
                    $message->created_at->format('h:i A'),

                'created_at' =>
                    $message->created_at,
            ]
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE - GET TODAY
    |--------------------------------------------------------------------------
    */

    public function getMyAttendance($projectId)
    {
        $userId = $this->workerId;

        $attendance = Attendance::where(
                'project_id',
                $projectId
            )
            ->where(
                'user_id',
                $userId
            )
            ->whereDate(
                'check_in',
                Carbon::today()
            )
            ->latest('check_in')
            ->first();

        return response()->json([
            'attendance' => $attendance
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE - CHECK IN
    |--------------------------------------------------------------------------
    */

    public function checkIn(
        Request $request,
        $projectId
    ) {
        $userId = $this->workerId;

        /*
        |--------------------------------------------------------------------------
        | Check if already checked in today
        |--------------------------------------------------------------------------
        */

        $existing = Attendance::where(
                'project_id',
                $projectId
            )
            ->where(
                'user_id',
                $userId
            )
            ->whereDate(
                'check_in',
                Carbon::today()
            )
            ->first();

        if ($existing) {
            return response()->json([
                'message' =>
                    'You have already checked in today.',

                'attendance' =>
                    $existing
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Create attendance
        |--------------------------------------------------------------------------
        */

        $attendance = Attendance::create([
            'project_id' => $projectId,

            'user_id' => $userId,

            'check_in' => now(),

            'status' => 'present',

            'role_snapshot' => 'worker',
        ]);

        return response()->json([
            'message' =>
                'Checked in successfully.',

            'attendance' =>
                $attendance
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE - CHECK OUT
    |--------------------------------------------------------------------------
    */

    public function checkOut(
        Request $request,
        $projectId
    ) {
        $userId = $this->workerId;

        /*
        |--------------------------------------------------------------------------
        | Find today's open attendance
        |--------------------------------------------------------------------------
        */

        $attendance = Attendance::where(
                'project_id',
                $projectId
            )
            ->where(
                'user_id',
                $userId
            )
            ->whereDate(
                'check_in',
                Carbon::today()
            )
            ->whereNull(
                'check_out'
            )
            ->latest('check_in')
            ->first();

        if (!$attendance) {
            return response()->json([
                'message' =>
                    'You have not checked in today or you already checked out.'
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Check out
        |--------------------------------------------------------------------------
        */

        $attendance->update([
            'check_out' => now(),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Calculate worked duration
        |--------------------------------------------------------------------------
        */

        $checkIn = Carbon::parse(
            $attendance->check_in
        );

        $checkOut = Carbon::parse(
            $attendance->check_out
        );

        $totalMinutes =
            $checkIn->diffInMinutes(
                $checkOut
            );

        $hours =
            intdiv(
                $totalMinutes,
                60
            );

        $minutes =
            $totalMinutes % 60;

        $duration = '';

        if ($hours > 0) {
            $duration .=
                $hours . 'h ';
        }

        if ($minutes > 0) {
            $duration .=
                $minutes . 'min';
        }

        if ($duration === '') {
            $duration = 'Less than 1 min';
        }

        return response()->json([
            'message' =>
                'Work completed successfully.',

            'attendance' =>
                $attendance,

            'work_duration' =>
                trim($duration)
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */

    public function getNotifications($projectId)
    {
        $userId = $this->workerId;

        $notifications = Notification::where(
                'user_id',
                $userId
            )
            ->where(function ($query) use ($projectId) {

                $query
                    ->where(
                        'project_id',
                        $projectId
                    )
                    ->orWhereNull(
                        'project_id'
                    );

            })
            ->latest()
            ->get();

        return response()->json([
            'notifications' =>
                $notifications
        ]);
    }
}
