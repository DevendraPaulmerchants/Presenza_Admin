import { Users, UserCheck, UserX, Clock } from 'lucide-react';
 
export const createDashboardItems = (data) => {
  return [
    {
      id: 1,
      icon: Users,
      iconBgColor: 'bg-cyan-400/20',
      iconColor: 'text-cyan-300',
      value: String(data.totalEmployees || 0),
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
      value: String(data.presentEmployees || 0),
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
      value: String(data.absentEmployees || 0),
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
      value: '0', 
      label: 'Late Arrivals',
      percentage: '-3%', 
      percentageBgColor: 'bg-orange-400/20',
      percentageTextColor: 'text-orange-200',
    },
  ];
};