import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Image, FileText, Film, Music, FileBox, Search, 
  User, LogOut, Menu, X, Upload, Home 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navItems = [
    { name: 'All Files', icon: <Home size={20} />, path: '/dashboard?type=all' },
    { name: 'Images', icon: <Image size={20} />, path: '/dashboard?type=image' },
    { name: 'Documents', icon: <FileText size={20} />, path: '/dashboard?type=document' },
    { name: 'Videos', icon: <Film size={20} />, path: '/dashboard?type=video' },
    { name: 'Audio', icon: <Music size={20} />, path: '/dashboard?type=audio' },
    { name: 'Other Files', icon: <FileBox size={20} />, path: '/dashboard?type=other' },
    { name: 'Received Files', icon: <FileBox size={20} />, path: '/received-files' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <FileBox className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold">DAMS</span>
          </Link>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            onClick={closeSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  location.pathname === item.path.split('?')[0] && 
                  location.search === (item.path.includes('?') ? item.path.split('?')[1] : '')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeSidebar}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <button
              onClick={() => {
                navigate('/');
                closeSidebar();
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} className="mr-3" />
              Upload Files
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center justify-between">
            <Link 
              to="/profile" 
              className="flex items-center space-x-2"
              onClick={closeSidebar}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <User size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm">
          <div className="flex items-center lg:hidden">
            <button 
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl ml-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="search"
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                placeholder="Search files..."
              />
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center ml-4 lg:ml-6">
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 lg:hidden"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <User size={16} className="text-blue-600" />
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;