import React, { useEffect, useMemo, useState } from 'react';
import { getAllEmployees } from '../services/api/apiService';
import Loading from '../components/common/Loading';

function EmployeeList() {
  const [searchEmpId, setSearchEmpId] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(err.message || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  //-----Safe department extraction
  const departments = useMemo(() => {
    return [...new Set(employees.map((e) => e?.department).filter(Boolean))];
  }, [employees]);
  // -------- safe Status extraction ------------
  const statuses = useMemo(() => {
    return [...new Set(employees.map((e) => e?.status).filter(Boolean))];
  }, [employees]);

  const filteredEmpList = useMemo(() => {
    return employees.filter((emp) => {
      const matchesId = searchEmpId
        ? emp?.employee?.employeeCode?.toLowerCase().includes(searchEmpId.toLowerCase())
        : true;

      const matchesDept = departmentFilter ? emp?.department === departmentFilter : true;

      const matchesStatus = statusFilter ? emp?.status === statusFilter : true;

      return matchesId && matchesDept && matchesStatus;
    });
  }, [employees, searchEmpId, departmentFilter, statusFilter]);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
      {loading && <Loading message="Fetching Employee List..." />}
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex justify-between items-center px-0 flex-wrap gap-4">
        <div className="mb-6 w-64">
          <input
            type="text"
            placeholder="Search by Emp Id"
            value={searchEmpId}
            onChange={(e) => setSearchEmpId(e.target.value)}
            className="w-full px-4 py-2 text-white border border-gray-300 rounded-lg outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
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
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/10 text-md font-semibold text-gray-300">
            <th className="py-2">Emp Id</th>
            <th className="py-2">Email</th>
            <th className="py-2">Name</th>
            <th className="py-2">Department</th>
            <th className="py-2">Role</th>
            <th className="py-2">R.M Name</th>
            <th className="py-2">R.M Email</th>
            <th className="py-2">Joining Date</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold text-gray-300">
          {filteredEmpList.length > 0 ? (
            filteredEmpList.map((emp) => (
              <tr
                key={emp._id}
                className="text-center border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="py-2">{emp.employeeCode}</td>
                <td className="py-2">{emp.email}</td>
                <td className="py-2">{emp.fullName}</td>
                <td className="py-2">{emp.department}</td>
                <td className="py-2">{emp.designation}</td>
                <td className="py-2">{emp.reportingTo.name}</td>
                <td className="py-2">{emp.reportingTo.email}</td>
                <td className="py-2">{emp.joiningDate}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'Active'
                        ? 'bg-green-400/20 text-green-300'
                        : emp.status === 'InActive'
                          ? 'bg-red-400/20 text-red-300'
                          : 'bg-orange-400/20 text-orange-300'
                    }`}
                  >
                    {emp.status}
                  </span>
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

export default EmployeeList;
