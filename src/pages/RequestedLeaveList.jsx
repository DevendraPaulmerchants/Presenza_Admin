import { CheckCircle, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import Toast from '../components/common/Toast';

const requestedLeave = [
  {
    empId: 'E06838',
    email: 'devendra.kumar@paulmerchants.net',
    reportingManager: 'Abhishek Singh',
    leaveType: 'Vacation',
    reason: 'Family vacation',
    from: '02/03/2026',
    to: '12/03/2026',
    status: 'Pending',
  },
  {
    empId: 'E06838',
    email: 'devendra.kumar@paulmerchants.net',
    reportingManager: 'Abhishek Singh',
    leaveType: 'Sick Leave',
    reason: 'Medical appointment',
    from: '27/03/2026',
    to: '28/03/2026',
    status: 'Approved',
  },
];

function RequestedLeaveList() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(interval);
  }, []);

  const handleLeaveApproval = () => {
    console.log('Approved');
  };
  const handleLeaveRejection = () => {
    console.log('Rejected');
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
      {loading && <Loading message="Fetching Requested Leave List..." />}

      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/10 text-md font-semibold text-gray-300">
            <th className="py-2">Emp Id</th>
            <th className="py-2">Email</th>
            <th className="py-2">R.M Name</th>
            <th className="py-2">Leave Type</th>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold text-gray-300">
          {requestedLeave.length > 0 ? (
            requestedLeave.map((emp, id) => (
              <tr
                key={id}
                className="text-center border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="py-2">{emp.empId}</td>
                <td className="py-2">{emp.email}</td>
                <td className="py-2">{emp.reportingManager}</td>
                <td className="py-2">{emp.reason}</td>
                <td className="py-2">{emp.from}</td>
                <td className="py-2">{emp.to}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'Approved'
                        ? 'bg-green-400/20 text-green-300'
                        : emp.status === 'Reject'
                          ? 'bg-red-400/20 text-red-300'
                          : 'bg-orange-400/20 text-orange-300'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex gap-4 justify-center">
                    <button title="Approve" onClick={handleLeaveApproval}>
                      <CheckCircle className="cursor-pointer text-green-500" />
                    </button>
                    <button title="Reject" onClick={handleLeaveRejection}>
                      <XCircle className=" cursor-pointer border-red-500 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-4 text-center text-gray-900">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestedLeaveList;
