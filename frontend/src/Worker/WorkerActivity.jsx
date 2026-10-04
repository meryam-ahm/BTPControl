import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Menu,
  MessageSquare,
  Clock,
  CheckCircle2,
  LogOut,
  Send,
  CheckCheck,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

export default function WorkerActivity({
  projectId,
  attendance,
  setAttendance,
  onNavigate,
}) {
  const [chatStream, setChatStream] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [workDuration, setWorkDuration] = useState(null);

  const currentProjectId = projectId;

  /*
  |--------------------------------------------------------------------------
  | AUTH
  |--------------------------------------------------------------------------
  */

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  };

  /*
  |--------------------------------------------------------------------------
  | CURRENT USER
  |--------------------------------------------------------------------------
  */

  const getCurrentUserId = () => {
    const userId =
      localStorage.getItem("user_id") ||
      localStorage.getItem("userId");

    return userId ? Number(userId) : null;
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD CHAT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!currentProjectId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not authenticated. Please log in again."
      );
      return;
    }

    const loadMessages = async () => {
      try {
        setLoadingMessages(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/projects/${currentProjectId}/chat`,
          {
            headers: getAuthHeaders(),
          }
        );

        console.log("CHAT RESPONSE:", response.data);

        const messages = Array.isArray(
          response.data?.messages
        )
          ? response.data.messages
          : [];

        setChatStream(messages);
      } catch (err) {
        console.error(
          "Error loading messages:",
          err.response?.status,
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          setError(
            "Your session has expired. Please log in again."
          );
        } else {
          setError(
            err.response?.data?.message ||
              "Unable to load messages."
          );
        }
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [currentProjectId]);

  /*
  |--------------------------------------------------------------------------
  | LOAD ATTENDANCE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!currentProjectId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not authenticated. Please log in again."
      );
      return;
    }

    const loadAttendance = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/projects/${currentProjectId}/worker-activity/attendance`,
          {
            headers: getAuthHeaders(),
          }
        );

        const currentAttendance =
          response.data?.attendance;

        setAttendance(currentAttendance || null);

        if (
          currentAttendance?.check_in &&
          currentAttendance?.check_out
        ) {
          calculateDuration(
            currentAttendance.check_in,
            currentAttendance.check_out
          );
        } else {
          setWorkDuration(null);
        }
      } catch (err) {
        console.error(
          "Error loading attendance:",
          err.response?.status,
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          setError(
            "Your session has expired. Please log in again."
          );
        }
      }
    };

    loadAttendance();
  }, [currentProjectId, setAttendance]);

  /*
  |--------------------------------------------------------------------------
  | CALCULATE WORK DURATION
  |--------------------------------------------------------------------------
  */

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) {
      setWorkDuration(null);
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    if (difference <= 0) {
      setWorkDuration(null);
      return;
    }

    const totalMinutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      totalMinutes / 60
    );

    const minutes = totalMinutes % 60;

    let duration = "";

    if (hours > 0) {
      duration += `${hours}h `;
    }

    if (minutes > 0) {
      duration += `${minutes}min`;
    }

    if (!duration) {
      duration = "Less than 1 min";
    }

    setWorkDuration(duration.trim());
  };

  /*
  |--------------------------------------------------------------------------
  | FORMAT TIME
  |--------------------------------------------------------------------------
  */

  const formatTime = (dateValue) => {
    if (!dateValue) {
      return "--:--";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "--:--";
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const handleSendMessage = async () => {
    const text = inputValue.trim();

    if (!text || !currentProjectId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not authenticated. Please log in again."
      );
      return;
    }

    try {
      setSendingMessage(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        `${API_URL}/projects/${currentProjectId}/chat`,
        {
          message: text,
        },
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "SENT MESSAGE RESPONSE:",
        response.data
      );

      const newMessage =
        response.data?.chat_message;

      if (newMessage) {
        setChatStream((previous) => [
          ...previous,
          newMessage,
        ]);
      }

      setInputValue("");
    } catch (err) {
      console.error(
        "Error sending message:",
        err
      );

      console.error(
        "Server response:",
        err.response?.data
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to send message."
        );
      }
    } finally {
      setSendingMessage(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ENTER TO SEND
  |--------------------------------------------------------------------------
  */

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CHECK IN
  |--------------------------------------------------------------------------
  */

  const handleCheckIn = async () => {
    if (!currentProjectId) {
      setError("No project selected.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not authenticated. Please log in again."
      );
      return;
    }

    try {
      setCheckingIn(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        `${API_URL}/projects/${currentProjectId}/worker-activity/check-in`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      const newAttendance =
        response.data?.attendance;

      setAttendance(newAttendance || null);
      setWorkDuration(null);

      setMessage(
        "You are checked in successfully."
      );
    } catch (err) {
      console.error(
        "Error checking in:",
        err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to check in."
        );
      }
    } finally {
      setCheckingIn(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CHECK OUT
  |--------------------------------------------------------------------------
  */

  const handleCheckOut = async () => {
    if (!currentProjectId) {
      setError("No project selected.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not authenticated. Please log in again."
      );
      return;
    }

    try {
      setCheckingOut(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        `${API_URL}/projects/${currentProjectId}/worker-activity/check-out`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      const updatedAttendance =
        response.data?.attendance;

      setAttendance(
        updatedAttendance || null
      );

      if (response.data?.work_duration) {
        setWorkDuration(
          response.data.work_duration
        );
      } else if (
        updatedAttendance?.check_in &&
        updatedAttendance?.check_out
      ) {
        calculateDuration(
          updatedAttendance.check_in,
          updatedAttendance.check_out
        );
      }

      setMessage(
        "Work completed successfully."
      );
    } catch (err) {
      console.error(
        "Error checking out:",
        err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to check out."
        );
      }
    } finally {
      setCheckingOut(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ATTENDANCE STATE
  |--------------------------------------------------------------------------
  */

  const isCheckedIn =
    !!attendance?.check_in &&
    !attendance?.check_out;

  const isCheckedOut =
    !!attendance?.check_in &&
    !!attendance?.check_out;

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="p-5 space-y-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">
            Worker Activity
          </p>

          <h2 className="text-xl font-bold text-gray-800">
            Activity
          </h2>
        </div>

        <button
          onClick={() =>
            onNavigate?.("home")
          }
          className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-500"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-3 py-2.5 text-xs font-semibold">
          <CheckCircle2 size={15} />
          <span>{message}</span>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl px-3 py-2.5 text-xs font-semibold">
          <AlertCircle
            size={15}
            className="shrink-0 mt-0.5"
          />

          <span>{error}</span>
        </div>
      )}

      {/* CHAT */}

      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare
              size={16}
              className="text-blue-600"
            />

            Project Chat
          </h3>

          <span className="text-[9px] text-gray-400">
            Project #{currentProjectId || "--"}
          </span>

        </div>

        {/* MESSAGES */}

        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">

          {loadingMessages ? (
            <div className="text-center py-8 text-xs text-gray-400">
              Loading messages...
            </div>
          ) : chatStream.length === 0 ? (
            <div className="text-center py-8">

              <MessageSquare
                size={22}
                className="mx-auto text-gray-300 mb-2"
              />

              <p className="text-xs text-gray-400">
                No messages yet.
              </p>

              <p className="text-[10px] text-gray-300 mt-1">
                Start a conversation with your team.
              </p>

            </div>
          ) : (
            chatStream.map((chat, index) => {

              const currentUserId =
                getCurrentUserId();

              const isMine =
                currentUserId !== null &&
                Number(chat.sender_id) ===
                  currentUserId;

              const senderName =
                chat.sender?.name ||
                chat.sender_name ||
                "Team member";

              return (
                <div
                  key={chat.id || index}
                  className={`flex ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-3 py-2.5 rounded-2xl ${
                      isMine
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >

                    {!isMine && (
                      <p className="text-[9px] font-bold text-blue-600 mb-1">
                        {senderName}
                      </p>
                    )}

                    <p className="text-[11px] font-medium leading-relaxed">
                      {chat.message}
                    </p>

                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${
                        isMine
                          ? "text-white/60"
                          : "text-gray-400"
                      }`}
                    >

                      <span className="text-[8px]">
                        {formatTime(
                          chat.created_at ||
                            chat.updated_at
                        )}
                      </span>

                      {isMine && (
                        <CheckCheck size={10} />
                      )}

                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>

        {/* INPUT */}

        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100">

          <input
            type="text"
            value={inputValue}
            onChange={(event) =>
              setInputValue(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder="Message your team..."
            disabled={
              sendingMessage ||
              !currentProjectId
            }
            className="flex-1 bg-gray-50 text-xs border border-gray-200 rounded-full px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />

          <button
            onClick={handleSendMessage}
            disabled={
              sendingMessage ||
              !inputValue.trim() ||
              !currentProjectId
            }
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white flex items-center justify-center shrink-0 transition"
          >
            <Send
              size={13}
              className="ml-0.5"
            />
          </button>

        </div>

      </div>

      {/* ATTENDANCE */}

      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Clock
              size={16}
              className="text-emerald-500"
            />

            Shift Registration
          </h3>

          {attendance?.status && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase">
              {attendance.status}
            </span>
          )}

        </div>

        {/* TIMES */}

        <div className="grid grid-cols-2 gap-3 mb-4">

          <div className="bg-gray-50 rounded-2xl p-3">

            <div className="flex items-center gap-1.5 text-gray-400 mb-1">

              <Clock size={12} />

              <span className="text-[9px] font-semibold uppercase">
                Check In
              </span>

            </div>

            <p className="text-sm font-bold text-gray-800">
              {attendance?.check_in
                ? formatTime(
                    attendance.check_in
                  )
                : "--:--"}
            </p>

          </div>

          <div className="bg-gray-50 rounded-2xl p-3">

            <div className="flex items-center gap-1.5 text-gray-400 mb-1">

              <LogOut size={12} />

              <span className="text-[9px] font-semibold uppercase">
                Check Out
              </span>

            </div>

            <p className="text-sm font-bold text-gray-800">
              {attendance?.check_out
                ? formatTime(
                    attendance.check_out
                  )
                : "--:--"}
            </p>

          </div>

        </div>

        {/* DURATION */}

        {workDuration && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={16}
                className="text-blue-600"
              />

              <div>

                <p className="text-[9px] text-blue-500 font-semibold uppercase">
                  Work Completed
                </p>

                <p className="text-sm font-bold text-blue-700">
                  {workDuration} worked
                </p>

              </div>

            </div>

          </div>
        )}

        {/* BUTTONS */}

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={handleCheckIn}
            disabled={
              checkingIn ||
              checkingOut ||
              isCheckedIn ||
              isCheckedOut ||
              !currentProjectId
            }
            className={`text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              isCheckedIn ||
              isCheckedOut
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >

            <CheckCircle2 size={14} />

            {checkingIn
              ? "Checking..."
              : isCheckedIn
              ? "Checked In"
              : isCheckedOut
              ? "Completed"
              : "Check In"}

          </button>

          <button
            onClick={handleCheckOut}
            disabled={
              checkingOut ||
              checkingIn ||
              !isCheckedIn ||
              !currentProjectId
            }
            className={`text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              isCheckedIn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >

            <LogOut size={14} />

            {checkingOut
              ? "Checking..."
              : "Check Out"}

          </button>

        </div>

        {!attendance && (
          <p className="text-center text-[10px] text-gray-400 mt-3">
            You have not checked in today.
          </p>
        )}

        {isCheckedIn && (
          <p className="text-center text-[10px] text-emerald-600 font-medium mt-3">
            You are currently working.
          </p>
        )}

        {isCheckedOut && (
          <p className="text-center text-[10px] text-blue-600 font-medium mt-3">
            Your shift is finished for today.
          </p>
        )}

      </div>

    </div>
  );
}