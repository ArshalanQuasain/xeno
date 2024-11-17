import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token or session storage
    alert('You have been logged out.');
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 w-full z-50 shadow-md mb-10">
      <div className="container mx-auto flex items-center justify-between px-4 py-2"> 
        {/* Logo */}
        <div className="text-lg font-bold tracking-wide">
          CRM
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-medium'
                : 'hover:text-yellow-300'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/add-customer"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-medium'
                : 'hover:text-yellow-300'
            }
          >
            Add Customer
          </NavLink>
          <NavLink
            to="/dashboard/segments"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-medium'
                : 'hover:text-yellow-300'
            }
          >
            Segments
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-medium'
                : 'hover:text-yellow-300'
            }
          >
            Add Orders
          </NavLink>
          <NavLink
            to="/dashboard/campaigns"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-medium'
                : 'hover:text-yellow-300'
            }
          >
            Campaigns
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
