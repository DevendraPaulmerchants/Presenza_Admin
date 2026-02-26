import React, { useState, useEffect, useMemo } from 'react';
import { getEmpAttendence } from '../services/api/apiService';
import { formatedDate, formatedTime } from '../utils/dateAndTime';
import { Eye } from 'lucide-react';
import AttendenceDetails from '../components/details/AttendenceDetails';
import Loading from '../components/common/Loading';
import { captalizeWords } from '../utils/captalizeWords';

function Attendance() {
  const [searchEmpId, setSearchEmpId] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDetails, setIsDetails] = useState(false);
  const [empSession, setEmpSession] = useState(null);

  const[empCode,setEmpCode]=useState('')

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmpAttendence('/attendance');

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

  //-----Safe department extraction
  const departments = useMemo(() => {
    return [...new Set(employees.map((e) => e?.employee?.departmentName).filter(Boolean))];
  }, [employees]);

  const statuses = useMemo(() => {
    return [...new Set(employees.map((e) => e?.status).filter(Boolean))];
  }, [employees]);

  // ----- Correct filtering logic
  const filteredAttendance = useMemo(() => {
    return employees.filter((emp) => {
      const matchesId = searchEmpId
        ? emp?.employee?.employeeCode?.toLowerCase().includes(searchEmpId.toLowerCase())
        : true;

      const matchesDept = departmentFilter
        ? emp?.employee?.departmentName === departmentFilter
        : true;

      const matchesStatus = statusFilter ? emp?.status === statusFilter : true;

      const matchesDate = dateFilter ? emp?.date === dateFilter : true;

      return matchesId && matchesDept && matchesStatus && matchesDate;
    });
  }, [employees, searchEmpId, departmentFilter, statusFilter, dateFilter]);
  const openDetailsPage = (empCode) => {
    setIsDetails(true);
    setEmpCode(empCode)
  };
  const closeDetailsPage = () => {
    setIsDetails(false);
  };
  return (
    <>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        {/* Loading */}
        {loading && <Loading message="Fetching Employee Attendence..." />}

        {/* Error */}
        {error && <p className="text-red-400">{error}</p>}

        {/* Filters */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
          <div className="w-64">
            <input
              type="text"
              placeholder="Search by Emp Id"
              value={searchEmpId}
              onChange={(e) => setSearchEmpId(e.target.value)}
              className="w-full px-4 py-2 text-white border border-gray-300 rounded-lg outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            {/* ---- Department wise filter ----------- */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/5 text-white border border-white/20 outline-none"
            >
              <option value="" className="text-black">
                All Departments
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="text-black">
                  {dept}
                </option>
              ))}
            </select>
            {/* -------- Status wise filter ----------- */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/5 text-white border border-white/20 outline-none"
            >
              <option value="" className="text-black">
                All Status
              </option>
              {statuses.map((st) => (
                <option key={st} value={st} className="text-black">
                  {st}
                </option>
              ))}
            </select>

            <input
              type="date"
              max={today}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/5 text-white border border-white/20 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/10 text-md font-semibold text-gray-300">
              <th className="py-2">Emp Id</th>
              <th className="py-2">Email</th>
              <th className="py-2">Department</th>
              <th className="py-2">Role</th>
              <th className="py-2">Punch-in Time</th>
              <th className="py-2">Punch-out Time</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Details</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold text-gray-300">
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((emp) => (
                <tr
                  key={emp._id}
                  className="text-center border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-2">{emp?.employee?.employeeCode}</td>
                  <td className="py-2">{emp?.employee?.email}</td>
                  <td className="py-2">{emp?.employee?.departmentName}</td>
                  <td className="py-2">{emp?.employee?.designationName}</td>
                  <td className="py-2">{formatedTime(emp?.firstPunchIn) || '-'}</td>
                  <td className="py-2">{formatedTime(emp?.lastPunchOut) || '_'}</td>
                  <td className="py-2">{formatedDate(emp?.date)}</td>
                  <td className="py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.status === 'PRESENT'
                          ? 'bg-green-400/20 text-green-300'
                          : emp.status === 'ABSENT'
                            ? 'bg-red-400/20 text-red-300'
                            : 'bg-orange-400/20 text-orange-300'
                      }`}
                    >
                      {captalizeWords(emp.status)}
                    </span>
                  </td>
                  <td className="py-2">
                    <button
                      className="flex items-center w-full justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => {
                        setEmpSession(emp.sessions);
                        openDetailsPage(emp?.employee?.employeeCode);
                      }}
                    >
                      <Eye size={20} />
                    </button>
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
      {isDetails && <AttendenceDetails empCode={empCode} sessions={empSession} close={closeDetailsPage} />}
    </>
  );
}

export default Attendance;
