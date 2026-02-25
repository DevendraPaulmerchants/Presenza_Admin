import React from 'react';
import { Clock, UserCheck, Users, UserX } from 'lucide-react';
import AttendenceChart from '../components/chart/AttendenceChart';
import DepartmentChart from '../components/chart/DepartmentChart';

const dashboardItems = [
  {
    id: 1,
    icon: Users,
    iconBgColor: 'bg-cyan-400/20',
    iconColor: 'text-cyan-300',
    value: '150',
    label: 'Total Employees',
    percentage: '+12%',
    percentageBgColor: 'bg-cyan-400/20',
    percentageTextColor: 'text-cyan-200',
  },
  {
    id: 2,
    icon: UserCheck,
    iconBgColor: 'bg-green-400/20',
    iconColor: 'text-green-300',
    value: '142',
    label: 'Present Today',
    percentage: '95%',
    percentageBgColor: 'bg-green-400/20',
    percentageTextColor: 'text-green-200',
  },
  {
    id: 3,
    icon: UserX,
    iconBgColor: 'bg-red-400/20',
    iconColor: 'text-red-300',
    value: '8',
    label: 'Absent Today',
    percentage: '5%',
    percentageBgColor: 'bg-red-400/20',
    percentageTextColor: 'text-red-200',
  },
  {
    id: 4,
    icon: Clock,
    iconBgColor: 'bg-orange-400/20',
    iconColor: 'text-orange-300',
    value: '12',
    label: 'Late Arrivals',
    percentage: '-3%',
    percentageBgColor: 'bg-orange-400/20',
    percentageTextColor: 'text-orange-200',
  },
];

function Dashboard() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardItems.map((item) => {
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
