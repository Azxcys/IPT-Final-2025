import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/departments">Departments</Link>
        </li>
        <li className="nav-item">
          <Link to="/employees">Employees</Link>
        </li>
        <li className="nav-item">
          <Link to="/accounts">Accounts</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 'auto' }}>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 