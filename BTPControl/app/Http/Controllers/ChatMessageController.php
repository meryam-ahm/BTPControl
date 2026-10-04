<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\Project;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    /**
     * Get project chat messages.
     */
    public function index(Request $request, Project $project)
    {
        $user = $request->user();

        // User must belong to this project
        $isMember = $project->users()
            ->where('users.id', $user->id)
            ->exists();

        if (!$isMember) {
            return response()->json([
                'message' => 'You are not a member of this project.'
            ], 403);
        }

        $messages = ChatMessage::with('sender:id,name')
            ->where('project_id', $project->id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'messages' => $messages
        ]);
    }

    /**
     * Send a message to the project chat.
     */
    public function store(Request $request, Project $project)
    {
        $user = $request->user();

        // User must belong to this project
        $isMember = $project->users()
            ->where('users.id', $user->id)
            ->exists();

        if (!$isMember) {
            return response()->json([
                'message' => 'You are not a member of this project.'
            ], 403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:5000',
            'attachment_url' => 'nullable|string|max:2048',
        ]);

        $chatMessage = ChatMessage::create([
            'project_id' => $project->id,
            'sender_id' => $user->id,
            'message' => $validated['message'],
            'attachment_url' => $validated['attachment_url'] ?? null,
            'is_seen' => false,
        ]);

        $chatMessage->load('sender:id,name');

        return response()->json([
            'message' => 'Message sent successfully.',
            'chat_message' => $chatMessage
        ], 201);
    }
}