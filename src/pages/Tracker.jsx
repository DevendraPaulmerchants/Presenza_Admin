import { useEffect, useState } from 'react';

import TopApplication from '../components/tracker/TopApplication';
import UsesWindows from '../components/tracker/UsesWindows';
import { getAllEmployees } from '../services/api/apiService';
import AcivityStats from '../components/tracker/AcivityStats';
import Loading from '../components/common/Loading';
import { Filter } from 'lucide-react';

function Tracker() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees('/employee');

      if (response.success) {
        setEmployees(response.data.data || []);
      } else {
        setError(response.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch attendance:',err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f4f] via-[#2a4470] to-[#1e2f4f] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Activity Tracker</h1>
            <p className="text-cyan-200">Monitor employee computer activity and productivity</p>
          </div>
        </div>

        {/* -------- Employee name and Date Selection ---------*/}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
          {loading && <Loading message="Fetching Employee List..." />}
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Select Employee */}
            <div className="flex-1">
              <label className="text-sm text-gray-300 mb-2 block">Select Employee</label>
              <select
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg outline-none"
                value={selectedEmp}
                onChange={(e) => setSelectedEmp(e.target.value)}
              >
                <option value="" disabled className="text-black">
                  Select Employee
                </option>
                {employees?.map((val) => {
                  return (
                    <option key={val._id} value={val._id} className="text-black">
                      {val.fullName}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Activity date */}
            <div className="flex-1">
              <label className="text-sm text-gray-300 mb-2 block">Activity Date</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>
            {/* Modify button */}
            <div className="flex gap-2">
              <button className="flex gap-0 cursor-pointer items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff8555] text-white">
                <Filter className="mr-2 h-4 w-4" />
                Modify
              </button>
            </div>
          </div>
        </div>
        {/* ------- productivity and efficient calculator ---------- */}
        <AcivityStats />
        {/*--------------- Top Application and window uses by employees ------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Application */}
          <TopApplication selectedEmp={selectedEmp} />
          {/* Top Window Titles */}
          <UsesWindows selectedEmp={selectedEmp} />
        </div>
      </div>
    </div>
  );
}
export default Tracker;
