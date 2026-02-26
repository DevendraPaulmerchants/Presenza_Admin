import React, { useEffect, useState } from 'react';
import AttendenceChart from '../components/chart/AttendenceChart';
import DepartmentChart from '../components/chart/DepartmentChart';
import { getAllEmployees } from '../services/api/apiService';
import Loading from '../components/common/Loading';
import { createDashboardItems } from '../utils/formateddashboarddata';

function Dashboard() {
  const [empCount,setEmpCount]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
      fetchEmployeesCount()
  },[])

  const fetchEmployeesCount = async () => {
      try {
        setLoading(true);
        const response = await getAllEmployees('/dashboard');
        if (response.success) {
          setEmpCount(createDashboardItems(response.data) || [])
          // setEmpCount(response.data || []);
          console.log(response)
        } else {
          setError(response.error || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch attendance');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && <Loading message='Fetching Employees data...' />}
        {error && <p className="text-red-400">{error}</p>}
        {empCount?.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${item.iconBgColor} rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <span
                  className={`text-xs ${item.percentageTextColor} ${item.percentageBgColor} px-2 py-1 rounded-full`}
                >
                  {item.percentage}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{item.value}</h3>
              <p className="text-sm text-gray-300">{item.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendenceChart />
        <DepartmentChart />
      </div>
    </div>
  );
}

export default Dashboard;
