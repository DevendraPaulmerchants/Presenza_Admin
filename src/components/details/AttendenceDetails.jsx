import React from 'react';
import { formatedTime } from '../../utils/dateAndTime';
import { MapPin, X } from 'lucide-react';

function AttendenceDetails({ sessions = [], empCode,close }) {
  const formatDuration = (minutes) => {
    if (!minutes) return '0 minutes';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hours ${mins} minutes`;
    }
    return `${mins} minutes`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#032446] to-[#1e2f4f] rounded-lg p-6 max-w-4xl w-full mx-4 border border-white/20 shadow-2xl">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
          <h4 className="text-white/60 font-semibold text-lg">Punch Sessions for EmpId: <b className='text-white/70'>{empCode}</b></h4>
          <button
            onClick={close}
            className="text-white hover:text-red-400 cursor-pointer transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-4 text-left">Punch In</th>
                <th className="py-3 px-4 text-left">Punch Out</th>
                <th className="py-3 px-4 text-left">Duration (minutes)</th>
                <th className="py-3 px-4 text-left">Final Duration</th>
                {/* <th className="py-3 px-4 text-left">Location</th> */}
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-300">{formatedTime(session.punchIn)}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {session.punchOut ? formatedTime(session.punchOut) : '—'}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{session.durationMinutes || '—'}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {session.durationMinutes ? formatDuration(session.durationMinutes) : '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-900">
                    No session data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={close}
            className="px-4 py-2 bg-[#ff6b35] cursor-pointer text-md text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendenceDetails;
