import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Network } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeStyle = {
    color: 'var(--accent-primary)',
    fontWeight: '600'
  };

  const normalStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none'
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 50,
        padding: '1rem 0'
      }}
    >
      <div className="container flex justify-between items-center">

        <NavLink
          to="/"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Network
            className="w-6 h-6"
            style={{ color: 'var(--accent-primary)' }}
          />
          SkillGap AI
        </NavLink>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginRight: '1rem',
                  textDecoration: 'none',
                  ...(isActive ? activeStyle : normalStyle)
                })}
              >
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  />
                )}
                <span className="hidden-mobile">{user.name}</span>
              </NavLink>

              <NavLink
                to="/dashboard"
                style={({ isActive }) => ({
                  marginRight: '1rem',
                  textDecoration: 'none',
                  ...(isActive ? activeStyle : normalStyle)
                })}
              >
                Dashboard
              </NavLink>

              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline">
                Login
              </NavLink>

              <NavLink to="/register" className="btn btn-primary">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;