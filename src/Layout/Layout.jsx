import React from 'react';
import Header from '../components/common/Header';
import NavigationItem from '../components/navigationItem/NavigationItem';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f4f] via-[#2a4470] to-[#1e2f4f] p-6">
      <Header />
      <NavigationItem />
      <Outlet />
    </div>
  );
}

export default Layout;
