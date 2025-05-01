import { Settings, User } from 'lucide-react';

interface HeaderProps {
  toggleSettings: () => void;
  toggleUserMenu: () => void;
}

export default function Header({ toggleSettings, toggleUserMenu }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="ml-2 text-lg font-semibold text-dark-300">MapApp</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-dark-100 hover:text-primary px-3 py-2 text-sm font-medium">Maps</a>
              <a href="#" className="text-dark-100 hover:text-primary px-3 py-2 text-sm font-medium">Features</a>
              <a href="#" className="text-dark-100 hover:text-primary px-3 py-2 text-sm font-medium">Documentation</a>
            </nav>
            
            {/* Settings Button */}
            <button 
              type="button" 
              className="bg-light-300 p-1 rounded-full text-dark-100 hover:text-primary focus:outline-none"
              onClick={toggleSettings}
              aria-label="Open settings"
            >
              <Settings className="h-6 w-6" />
            </button>
            
            {/* User Menu Button */}
            <div className="relative">
              <button 
                type="button" 
                className="bg-light-300 p-1 rounded-full text-dark-100 hover:text-primary focus:outline-none"
                onClick={toggleUserMenu}
                aria-label="Open user menu"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
