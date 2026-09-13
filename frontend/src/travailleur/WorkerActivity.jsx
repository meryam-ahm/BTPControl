 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MessageSquare,
  Clock,
  Send,
} from 'lucide-react';

export default function WorkerActivity({
  attendance,
  setAttendance,
  onNavigate,
  projectId,
}) {
  const [chatStream, setChatStream] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingChat, setLoadingChat] = useState(true);
  const [sending, setSending] = useState(false);

  const [attendanceData, setAttendanceData] = useState(
    attendance || null
  );

  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceAction, setAttendanceAction] = useState(false);

  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [attendanceError, setAttendanceError] = useState('');

  /*
  |--------------------------------------------------------------------------
  | GET PROJECT ID
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | Do NOT use the last URL segment because your URL can be:
  |
  | /projects/11/planning
  |
  | The last segment is "planning", not "11".
  |
  */

  const getProjectIdFromUrl = () => {
    const parts = window.location.pathname
      .split('/')
      .filter(Boolean);

    // Find a numeric part in the URL.
    const numericId = [...parts]
      .reverse()
      .find((part) => /^\d+$/.test(part));

    return numericId || null;
  };

  const currentProjectId =
    projectId || getProjectIdFromUrl();

  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  console.log(
    'WorkerActivity project ID:',
    currentProjectId
  );

  /*
  |--------------------------------------------------------------------------
  | GET CHAT MESSAGES
  |--------------------------------------------------------------------------
  */

  const fetchMessages = async () => {
    if (!currentProjectId) {
      console.error('No project ID found.');
      return;
    }

    try {
      setLoadingChat(true);

      const response = await axios.get(
        `/api/projects/${currentProjectId}/worker-activity/chat`
      );

      setChatStream(response.data.messages || []);
    } catch (error) {
      console.error(
        'Error loading chat messages:',
        error
      );
    } finally {
      setLoadingChat(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | GET TODAY'S ATTENDANCE
  |--------------------------------------------------------------------------
  */

  const fetchAttendance = async () => {
    if (!currentProjectId) {
      return;
    }

    try {
      setAttendanceLoading(true);

      const response = await axios.get(
        `/api/projects/${currentProjectId}/worker-activity/attendance`
      );

      const data = response.data.attendance || null;

      setAttendanceData(data);

      if (setAttendance) {
        setAttendance(data);
      }
    } catch (error) {
      console.error(
        'Error loading attendance:',
        error
      );
    } finally {
      setAttendanceLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!currentProjectId) {
      console.error(
        'WorkerActivity: project ID is missing.'
      );
      return;
    }

    fetchMessages();
    fetchAttendance();
  }, [currentProjectId]);

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const handleSendMessage = async () => {
    if (
      !inputValue.trim() ||
      sending ||
      !currentProjectId
    ) {
      return;
    }

    try {
      setSending(true);

      const response = await axios.post(
        `/api/projects/${currentProjectId}/worker-activity/chat`,
        {
          message: inputValue.trim(),
        }
      );

      const newMessage = response.data.message;

      setChatStream((previous) => [
        ...previous,
        newMessage,
      ]);

      setInputValue('');
    } catch (error) {
      console.error(
        'Error sending message:',
        error
      );

      console.error(
        'Server response:',
        error.response?.data
      );
    } finally {
      setSending(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ENTER TO SEND
  |--------------------------------------------------------------------------
  */

  const handleKeyDown = (e) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CHECK IN
  |--------------------------------------------------------------------------
  */

  const handleCheckIn = async () => {
    if (
      attendanceAction ||
      !currentProjectId ||
      attendanceData?.check_in
    ) {
      return;
    }

    try {
      setAttendanceAction(true);
      setAttendanceError('');
      setAttendanceMessage('');

      const response = await axios.post(
        `/api/projects/${currentProjectId}/worker-activity/check-in`
      );

      const newAttendance =
        response.data.attendance;

      setAttendanceData(newAttendance);

      if (setAttendance) {
        setAttendance(newAttendance);
      }

      setAttendanceMessage(
        'You are checked in successfully.'
      );
    } catch (error) {
      console.error(
        'Check-in error:',
        error
      );

      setAttendanceError(
        error.response?.data?.message ||
        'Unable to check in.'
      );

      // Refresh in case attendance already exists
      fetchAttendance();
    } finally {
      setAttendanceAction(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CHECK OUT
  |--------------------------------------------------------------------------
  */

  const handleCheckOut = async () => {
    if (
      attendanceAction ||
      !currentProjectId ||
      !attendanceData?.check_in ||
      attendanceData?.check_out
    ) {
      return;
    }

    try {
      setAttendanceAction(true);
      setAttendanceError('');
      setAttendanceMessage('');

      const response = await axios.post(
        `/api/projects/${currentProjectId}/worker-activity/check-out`
      );

      const updatedAttendance =
        response.data.attendance;

      setAttendanceData(updatedAttendance);

      if (setAttendance) {
        setAttendance(updatedAttendance);
      }

      setAttendanceMessage(
        'Your work shift is completed.'
      );
    } catch (error) {
      console.error(
        'Check-out error:',
        error
      );

      setAttendanceError(
        error.response?.data?.message ||
        'Unable to check out.'
      );

      fetchAttendance();
    } finally {
      setAttendanceAction(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FORMAT TIME
  |--------------------------------------------------------------------------
  */

  const formatTime = (value) => {
    if (!value) {
      return '--';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '--';
    }

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /*
  |--------------------------------------------------------------------------
  | CALCULATE WORK DURATION
  |--------------------------------------------------------------------------
  */

  const getWorkDuration = () => {
    if (
      !attendanceData?.check_in ||
      !attendanceData?.check_out
    ) {
      return null;
    }

    const checkIn = new Date(
      attendanceData.check_in
    );

    const checkOut = new Date(
      attendanceData.check_out
    );

    const difference =
      checkOut.getTime() -
      checkIn.getTime();

    if (difference <= 0) {
      return null;
    }

    const totalMinutes = Math.floor(
      difference / 60000
    );

    const hours = Math.floor(
      totalMinutes / 60
    );

    const minutes =
      totalMinutes % 60;

    if (hours === 0) {
      return `${minutes} min`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}min`;
  };

  const workDuration =
    getWorkDuration();

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="p-6 space-y-5">

      {/* CHAT */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-4">

        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
          <MessageSquare
            size={16}
            className="text-blue-600"
          />
          Supervisor Chat
        </h3>

        <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 text-[11px]">

          {loadingChat ? (
            <div className="text-center text-gray-400 py-6">
              Loading messages...
            </div>
          ) : chatStream.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No messages yet.
            </div>
          ) : (
            chatStream.map((chat) => (
              <div
                key={chat.id}
                className={`flex ${
                  chat.sender === 'You'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[80%] ${
                    chat.sender === 'You'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="font-medium">
                    {chat.message}
                  </p>

                  <span className="text-[9px] opacity-60 block text-right mt-1">
                    {chat.time}
                  </span>
                </div>
              </div>
            ))
          )}

        </div>

        <div className="flex items-center space-x-2 pt-1">

          <input
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1 bg-gray-50 text-xs border border-gray-200 rounded-full px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
          />

          <button
            onClick={handleSendMessage}
            disabled={
              sending ||
              !inputValue.trim()
            }
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send
              size={12}
              className="ml-0.5"
            />
          </button>

        </div>
      </div>

      {/* ATTENDANCE */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-3">

        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
          <Clock
            size={16}
            className="text-emerald-500"
          />
          Shift Registration
        </h3>

        {attendanceLoading ? (
          <div className="text-[11px] text-gray-400">
            Loading attendance...
          </div>
        ) : attendanceData ? (
          <div className="bg-gray-50 rounded-xl px-3 py-3 text-[11px] space-y-2">

            {/* CHECK IN */}
            <div className="flex justify-between">
              <span className="text-gray-500">
                Check in
              </span>

              <span className="font-semibold text-gray-700">
                {formatTime(
                  attendanceData.check_in
                )}
              </span>
            </div>

            {/* CHECK OUT */}
            {attendanceData.check_out && (
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Check out
                </span>

                <span className="font-semibold text-gray-700">
                  {formatTime(
                    attendanceData.check_out
                  )}
                </span>
              </div>
            )}

            {/* STATUS */}
            <div className="flex justify-between">
              <span className="text-gray-500">
                Status
              </span>

              <span className="font-semibold text-emerald-600 capitalize">
                {attendanceData.check_out
                  ? 'Work done'
                  : attendanceData.status}
              </span>
            </div>

            {/* WORK DURATION */}
            {workDuration && (
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-500">
                  Work duration
                </span>

                <span className="font-semibold text-blue-600">
                  {workDuration}
                </span>
              </div>
            )}

          </div>
        ) : (
          <div className="text-[11px] text-gray-400">
            You have not checked in today.
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {attendanceMessage && (
          <div className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
            {attendanceMessage}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {attendanceError && (
          <div className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {attendanceError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">

          {/* CHECK IN */}
          <button
            onClick={handleCheckIn}
            disabled={
              attendanceAction ||
              !!attendanceData?.check_in
            }
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {attendanceData?.check_in
              ? 'Checked In'
              : attendanceAction
              ? 'Checking In...'
              : 'Check In'}
          </button>

          {/* CHECK OUT */}
          <button
            onClick={handleCheckOut}
            disabled={
              attendanceAction ||
              !attendanceData?.check_in ||
              !!attendanceData?.check_out
            }
            className="bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {attendanceData?.check_out
              ? 'Checked Out'
              : attendanceAction
              ? 'Checking Out...'
              : 'Check Out'}
          </button>

        </div>
      </div>

    </div>
  );
}

