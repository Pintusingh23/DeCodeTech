import { FiLogOut } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <header className="bg-yellow-400 shadow-sm w-full px-4 sm:px-6 py-4 flex justify-between items-center z-10 relative">
      {/* Left - Dashboard Title */}
      <div className="flex items-center gap-2 sm:gap-4 md:hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">DeCode</h2>
      </div>

      <div className="hidden md:block">
        {/* Empty space for desktop to keep the layout balanced since Sidebar handles branding */}
      </div>
      
      {/* Right - Admin Actions */}
      <div className="flex items-center gap-2 sm:gap-5">
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-full flex items-center gap-2 font-semibold text-xs sm:text-sm transition-colors shadow-sm"
        >
          <FiLogOut className="text-base sm:text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}