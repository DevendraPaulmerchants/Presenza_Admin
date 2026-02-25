import React from 'react';
import { PiUsersFourDuotone } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  {
    id: 1,
    title: 'Dashboard',
    path: 'dashboard',
    icon: RxDashboard,
  },
  {
    id: 2,
    path: 'attendance',
    title: 'Attendance',
    icon: RxDashboard,
  },
  {
    id: 3,
    path: 'employee',
    title: 'Employees',
    icon: PiUsersFourDuotone,
  },
  {
    id: 4,
    path: 'leave_requests',
    title: 'Leave Requests',
    icon: PiUsersFourDuotone,
  },
  {
    id: 5,
    path: 'regularization',
    title: 'Regularization',
    icon: PiUsersFourDuotone,
  },
  {
    id: 6,
    path: 'user_tracker',
    title: 'User Tracker',
    icon: PiUsersFourDuotone,
  },
];

function NavigationItem() {
  return (
    <div className="bg-white/10 rounded-[50px] p-2 my-8 w-fit">
      <ul className="list-none p-0 text-white text-[20px] flex gap-4 items-center">
        {sidebarItems.map((item) => (
          <ListItem key={item.id} title={item.title} icon={item.icon} path={item.path} />
        ))}
      </ul>
    </div>
  );
}

export default NavigationItem;

const ListItem = ({ title, icon: Icon, path }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  return (
    <li
      className={`flex items-center gap-1 cursor-pointer py-0 px-3 rounded-[50px] transition-colors ${
        isActive ? 'bg-[#ff6b35]' : 'hover:bg-[#ff6b35]'
      }`}
    >
      {/* {Icon && <Icon className="text-xl" />} */}
      <Link to={path} className="no-underline text-white hover:text-[#131a1b] transition-colors">
        {title}
      </Link>
    </li>
  );
};
