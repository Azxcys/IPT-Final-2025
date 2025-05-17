import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DepartmentList from './components/DepartmentList';
import AccountList from './components/AccountList';
import EmployeeList from './components/EmployeeList';
import Navigation from './components/Navigation';
import './styles/components.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <Navigation />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <DepartmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <PrivateRoute>
              <AccountList />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/departments" />} />
      </Routes>
    </Router>
  );
};

export default App; 