import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Users, X } from "lucide-react";
import axios from "axios";

const ProjectChat = ({ currentProject }) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    const messagesEndRef = useRef(null);

    const projectId = currentProject?.project_id;

    const projectName =
        currentProject?.project_name ||
        currentProject?.name ||
        "Current Project";

    const getHeaders = () => {
        const token = localStorage.getItem("token");

        return {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }, 100);
    };

    // Load messages when chat opens
    useEffect(() => {
        if (!open || !projectId) return;

        const loadMessages = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/projects/${projectId}/chat`,
                    {
                        headers: getHeaders(),
                    }
                );

                setMessages(response.data.messages || []);

                scrollToBottom();
            } catch (error) {
                console.error("Failed to load project chat:", error);

                if (error.response) {
                    console.error(
                        "Status:",
                        error.response.status
                    );

                    console.error(
                        "Response:",
                        error.response.data
                    );
                }

                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [open, projectId]);

    // Scroll whenever messages change
    useEffect(() => {
        if (open) {
            scrollToBottom();
        }
    }, [messages, open]);

    const sendMessage = async () => {
        const text = message.trim();

        if (!text || !projectId || sending) return;

        setSending(true);

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/projects/${projectId}/chat`,
                {
                    message: text,
                },
                {
                    headers: getHeaders(),
                }
            );

            const newMessage = response.data.chat_message;

            setMessages((prev) => [...prev, newMessage]);

            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);

            if (error.response) {
                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Response:",
                    error.response.data
                );
            }
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    if (!currentProject) return null;

    return (
        <>
            {/* PROJECT CHAT BUTTON */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-3 h-full px-5 border-l border-gray-100 bg-white hover:bg-gray-50 transition text-left"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>

                <div className="min-w-[170px]">
                    <p className="text-sm font-bold text-gray-900">
                        Project Chat
                    </p>

                    <div className="flex items-center gap-1.5 mt-0.5">
                        <Users className="h-3.5 w-3.5 text-gray-400" />

                        <span className="text-[11px] text-gray-400">
                            Workers & Site Manager
                        </span>
                    </div>
                </div>
            </button>

            {/* CHAT PANEL */}
            {open && (
                <div className="fixed inset-0 z-[100]">

                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/20"
                        onClick={() => setOpen(false)}
                    />

                    {/* CHAT */}
                    <div className="absolute right-6 top-[80px] w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-blue-600" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-gray-900">
                                        Project Chat
                                    </h2>

                                    <p className="text-[11px] text-gray-400">
                                        {projectName}
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                            >
                                <X className="w-4 h-4" />
                            </button>

                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">

                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-xs text-gray-400">
                                        Loading messages...
                                    </p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">

                                        <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />

                                        <p className="text-sm font-semibold text-gray-600">
                                            Project Chat
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            No messages yet.
                                        </p>

                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">

                                    {messages.map((chatMessage) => {
                                        const token = localStorage.getItem("token");

                                        let currentUserId = null;

                                        try {
                                            const payload = JSON.parse(
                                                atob(
                                                    token?.split(".")[1] || ""
                                                )
                                            );

                                            currentUserId =
                                                payload?.sub ||
                                                payload?.user_id ||
                                                payload?.id;
                                        } catch {
                                            currentUserId = null;
                                        }

                                        const isMine =
                                            Number(chatMessage.sender_id) ===
                                            Number(currentUserId);

                                        return (
                                            <div
                                                key={chatMessage.id}
                                                className={`flex ${
                                                    isMine
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`max-w-[75%] ${
                                                        isMine
                                                            ? "items-end"
                                                            : "items-start"
                                                    } flex flex-col`}
                                                >
                                                    {!isMine && (
                                                        <span className="text-[10px] font-semibold text-gray-400 mb-1">
                                                            {chatMessage.sender?.name ||
                                                                "User"}
                                                        </span>
                                                    )}

                                                    <div
                                                        className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                                                            isMine
                                                                ? "bg-blue-600 text-white rounded-br-md"
                                                                : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                                                        }`}
                                                    >
                                                        {chatMessage.message}
                                                    </div>

                                                    <span className="text-[9px] text-gray-400 mt-1">
                                                        {new Date(
                                                            chatMessage.created_at
                                                        ).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div ref={messagesEndRef} />

                                </div>
                            )}

                        </div>

                        {/* MESSAGE INPUT */}
                        <div className="p-4 border-t border-gray-100 bg-white">

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder="Write a message..."
                                    disabled={sending}
                                    className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 disabled:bg-gray-50"
                                />

                                <button
                                    type="button"
                                    onClick={sendMessage}
                                    disabled={
                                        sending ||
                                        !message.trim()
                                    }
                                    className="px-4 h-10 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sending ? "..." : "Send"}
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectChat;