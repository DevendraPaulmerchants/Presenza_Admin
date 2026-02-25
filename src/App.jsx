import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/Loading';
import PrivateRoute from './private-route/PrivateRoute';
import Login from './components/auth/LogIn';
import RequestedLeaveList from './pages/RequestedLeaveList';
import Tracker from './pages/Tracker';

// Lazy load page components
const Layout = lazy(() => import('./Layout/Layout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Attendance = lazy(() => import('./pages/Attendence'));
const EmployeeList = lazy(() => import('./pages/EmployeeList'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading message="Loading application..." />}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="employee" element={<EmployeeList />} />
            <Route path="leave_requests" element={<RequestedLeaveList />} />
            <Route path="user_tracker" element={<Tracker />} />
            <Route
              path="regularization"
              element={
                <div className="text-white mt-6">
                  <h1 className="text-3xl font-bold">Regularization</h1>
                </div>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
