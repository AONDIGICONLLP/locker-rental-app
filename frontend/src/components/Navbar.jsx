import { Link, useNavigate } from 'react-router-dom';
import { Lock, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '/assets/img/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden sm:block bg-stone-900 text-stone-300 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <span>Now live in 9+ Indian cities</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-brand-400" /> 1800-000-0000
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-brand-400" /> support@securelocker.app
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center h-full py-2">
            <img 
              src={logo} 
              alt="Secure Lockers Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
            <Link to="/browse" className="text-stone-600 hover:text-brand-700 px-2 py-1">
              Browse Lockers
            </Link>

            {!user && (
              <>
                <Link to="/login" className="text-stone-600 hover:text-brand-700 px-2 py-1">
                  Log in
                </Link>
                <Link to="/signup" className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
                  Sign up
                </Link>
              </>
            )}

            {user && user.role === 'owner' && (
              <Link to="/owner" className="text-stone-600 hover:text-brand-700 px-2 py-1">
                My Lockers
              </Link>
            )}
            {user && user.role === 'renter' && (
              <Link to="/my-bookings" className="text-stone-600 hover:text-brand-700 px-2 py-1">
                My Bookings
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-stone-200">
                <span className="hidden sm:flex flex-col items-end leading-tight">
                  <span className="text-stone-800 font-semibold">{user.name}</span>
                  <span className="text-xs text-stone-400 capitalize">{user.role}</span>
                </span>
                <button onClick={handleLogout} className="text-stone-500 hover:text-red-600 px-2 py-1">
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}