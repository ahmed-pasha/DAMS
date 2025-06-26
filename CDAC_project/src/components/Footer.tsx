import React from 'react';
import { Database, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DAMS
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transform your digital asset management with our powerful MERN-based platform. 
              Organize, secure, and scale your digital content efficiently.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Services</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Asset Organization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Advanced Search</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Security & Permissions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Analytics & Reporting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">API Integration</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">support@dams.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">+91 9876543219</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-purple-400 mt-1" />
                <span className="text-gray-400">CDAC<br />Electronic City, Banglore.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Digital Asset Management System. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
