<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
  use App\Models\ChatMessage;

class ChatMessageSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=100; $i++) {
        ChatMessage::create([
            'sender_id' => rand(1,20),
            'receiver_id' => rand(1,20),
            'project_id' => rand(1,5),
            'message' => "Message $i",
            'is_seen' => false
        ]);
    }
}
}
