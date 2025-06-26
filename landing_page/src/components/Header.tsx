import React, { useState } from 'react';
import { Menu, X, Database, LogIn, UserPlus } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DAMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Pricing
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>
            <button 
              onClick={onSignupClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Pricing
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button 
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 w-full text-gray-600 hover:text-purple-600 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
                <button 
                  onClick={onSignupClick}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}