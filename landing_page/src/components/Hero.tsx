import React from 'react';
import { ArrowRight, Play, Shield, Zap, Users } from 'lucide-react';

interface HeroProps {
  onSignupClick: () => void;
}

export default function Hero({ onSignupClick }: HeroProps) {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Digital Asset
                </span>
                <br />
                <span className="text-gray-900">Management</span>
                <br />
                <span className="text-gray-700">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Organize, manage, and scale your digital assets efficiently with our powerful MERN-based platform. 
                Streamline workflows, enhance collaboration, and secure your valuable digital content.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">99.9% Uptime</p>
                  <p className="text-sm text-gray-600">Reliable & Secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lightning Fast</p>
                  <p className="text-sm text-gray-600">Optimized Performance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">10K+ Users</p>
                  <p className="text-sm text-gray-600">Trusted Worldwide</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onSignupClick}
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="font-semibold">Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-all duration-200">
                <Play className="h-5 w-5" />
                <span className="font-semibold">Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Asset Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 h-12 rounded-lg flex items-center px-4">
                    <div className="w-8 h-8 bg-purple-200 rounded-lg mr-3"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-purple-300 rounded w-3/4 mb-1"></div>
                      <div className="h-2 bg-purple-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 h-12 rounded-lg flex items-center px-4">
                    <div className="w-8 h-8 bg-blue-200 rounded-lg mr-3"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-blue-300 rounded w-2/3 mb-1"></div>
                      <div className="h-2 bg-blue-200 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-100 to-purple-100 h-12 rounded-lg flex items-center px-4">
                    <div className="w-8 h-8 bg-indigo-200 rounded-lg mr-3"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-indigo-300 rounded w-5/6 mb-1"></div>
                      <div className="h-2 bg-indigo-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}