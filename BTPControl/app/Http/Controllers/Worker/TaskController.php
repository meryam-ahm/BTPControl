<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Task;
use App\Models\TaskUpdate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function complete(
        Request $request,
        $taskId
    ): JsonResponse {
        $request->validate([
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $workerId = $request->user()->id;

        $task = Task::where(
            'id',
            $taskId
        )
            ->where(
                'assigned_to',
                $workerId
            )
            ->first();

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found or not assigned to this worker.',
            ], 404);
        }

        if (
            in_array(
                $task->status,
                ['completed', 'cancelled']
            )
        ) {
            return response()->json([
                'message' => 'This task cannot be completed.',
            ], 422);
        }

        $result = DB::transaction(
            function () use (
                $request,
                $task,
                $workerId
            ) {
                $task->update([
                    'progress' => 100,
                    'status' => 'completed',
                ]);

                $taskUpdate = TaskUpdate::create([
                    'task_id' => $task->id,
                    'updated_by' => $workerId,
                    'progress' => 100,
                    'note' => 'Task marked as completed by the worker.',
                ]);

                $media = null;

                if ($request->hasFile('photo')) {
                    $path = $request
                        ->file('photo')
                        ->store(
                            'task-proofs',
                            'public'
                        );

                    $media = Media::create([
                        'project_id' => $task->project_id,
                        'task_id' => $task->id,
                        'uploaded_by' => $workerId,
                        'type' => 'photo',
                        'url' => $path,
                        'related_type' => 'task',
                        'related_id' => $task->id,
                    ]);
                }

                return compact(
                    'task',
                    'taskUpdate',
                    'media'
                );
            }
        );

        return response()->json([
            'success' => true,
            'message' => 'Task marked as completed successfully.',
            ...$result,
        ]);
    }
}