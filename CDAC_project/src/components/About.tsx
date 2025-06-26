import React from 'react';
import { Target, Eye, Award, Users2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About Our Digital Asset Management System
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Built with cutting-edge MERN stack technology, our platform revolutionizes how organizations 
                manage their digital assets. We combine powerful functionality with intuitive design to deliver 
                a solution that scales with your business needs.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To simplify digital asset management by providing powerful, user-friendly tools 
                    that help organizations organize, secure, and maximize the value of their digital content.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To become the leading digital asset management platform that empowers businesses 
                    worldwide to unlock the full potential of their digital resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-bold text-2xl text-gray-900">5+ Years</p>
                <p className="text-gray-600">Experience</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <Users2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold text-2xl text-gray-900">10K+</p>
                <p className="text-gray-600">Happy Users</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Why Choose DAMS?</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Built with modern MERN stack</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Scalable and secure architecture</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-gray-700">Intuitive user experience</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">24/7 customer support</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-3"></div>
                    <h5 className="font-medium text-gray-900">MongoDB</h5>
                    <p className="text-sm text-gray-600">NoSQL Database</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg mb-3"></div>
                    <h5 className="font-medium text-gray-900">Express.js</h5>
                    <p className="text-sm text-gray-600">Backend Framework</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg mb-3"></div>
                    <h5 className="font-medium text-gray-900">React</h5>
                    <p className="text-sm text-gray-600">Frontend Library</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-3"></div>
                    <h5 className="font-medium text-gray-900">Node.js</h5>
                    <p className="text-sm text-gray-600">Runtime Environment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
