import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const WorkerChatModal = ({
  worker,
  projectId,
  onClose,
}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  const getHeaders = () => ({
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  });

  /* ================= FETCH MESSAGES ================= */

  const fetchMessages = async () => {
    if (!projectId || !worker?.id) return;

    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}/worker-activity/chat`,
        {
          headers: getHeaders(),
        }
      );

      const data = response.data?.messages || [];

      setMessages(data);
    } catch (error) {
      console.error(
        "Error fetching chat messages:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchMessages();
  }, [projectId, worker?.id]);

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [projectId, worker?.id]);

  /* ================= SCROLL ================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* ================= SEND ================= */

  const handleSend = async (e) => {
    e.preventDefault();

    const text = message.trim();

    if (!text || sending) return;

    try {
      setSending(true);

      const response = await axios.post(
        `${API_URL}/projects/${projectId}/worker-activity/chat`,
        {
          message: text,
          receiver_id: worker.id,
        },
        {
          headers: {
            ...getHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      const newMessage = response.data?.message;

      if (newMessage) {
        setMessages((prev) => [
          ...prev,
          newMessage,
        ]);
      }

      setMessage("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );
    } finally {
      setSending(false);
    }
  };

  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <span className="text-sm font-black text-blue-600">
                {worker.name
                  ?.charAt(0)
                  ?.toUpperCase() || "W"}
              </span>
            </div>

            <div>
              <h2 className="text-sm font-black text-gray-900">
                {worker.name}
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                {worker.role || "Worker"}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {/* ================= CHAT ================= */}

        <div className="h-[420px] overflow-y-auto bg-gray-50 px-5 py-4">

          {loading ? (

            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            </div>

          ) : messages.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <MessageCircle className="h-5 w-5 text-gray-300" />
              </div>

              <p className="text-sm font-bold text-gray-500">
                No messages yet
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Start a conversation with {worker.name}.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {messages.map((item) => {

                const isMine =
                  item.sender === "You";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isMine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        isMine
                          ? "rounded-br-md bg-blue-600 text-white"
                          : "rounded-bl-md bg-white border border-gray-100 text-gray-800"
                      }`}
                    >

                      {!isMine && (
                        <p className="mb-1 text-[10px] font-black text-blue-600">
                          {worker.name}
                        </p>
                      )}

                      <p className="text-sm leading-relaxed">
                        {item.message}
                      </p>

                      <p
                        className={`mt-1 text-[9px] ${
                          isMine
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {item.time}
                      </p>

                    </div>

                  </div>
                );
              })}

              <div ref={messagesEndRef} />

            </div>
          )}

        </div>

        {/* ================= INPUT ================= */}

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-gray-100 bg-white p-4"
        >

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder={`Message ${worker.name}...`}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            disabled={!message.trim() || sending}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>

        </form>

      </div>
    </div>
  );
};

export default WorkerChatModal;