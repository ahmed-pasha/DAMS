import React from 'react';
import { 
  Zap, 
  Smartphone, 
  Globe, 
  Lock, 
  RefreshCw, 
  Headphones,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Optimized architecture ensures quick loading times and smooth user experience.',
      highlight: 'Up to 3x faster than competitors'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Access your assets anywhere, anytime with our fully responsive mobile interface.',
      highlight: 'Works on all devices'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Worldwide content delivery network ensures fast access from anywhere.',
      highlight: '99.9% uptime guarantee'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols protect your valuable assets.',
      highlight: 'SOC 2 compliant'
    },
    {
      icon: RefreshCw,
      title: 'Real-time Sync',
      description: 'Instant synchronization across all devices and team members.',
      highlight: 'Zero data loss'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you whenever you need it.',
      highlight: 'Average response: 2 minutes'
    }
  ];

  const benefits = [
    'Reduce storage costs by up to 40%',
    'Improve team productivity by 60%',
    'Cut search time from hours to seconds',
    'Eliminate duplicate assets',
    'Streamline approval workflows',
    'Ensure brand consistency',
    'Meet compliance requirements',
    'Scale with your business growth'
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features That Make a Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is packed with advanced features designed to streamline your 
            digital asset management workflow and boost productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-3">
                {feature.description}
              </p>
              
              <div className="inline-flex items-center text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {feature.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Transform Your Business Operations
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of organizations that have revolutionized their digital 
                asset management with our comprehensive platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 group flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                <span>See All Benefits</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Performance Metrics</h4>
                    <div className="text-green-600 text-sm font-medium">+127% ↑</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Asset Retrieval Speed</span>
                        <span className="text-gray-900">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Team Productivity</span>
                        <span className="text-gray-900">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Storage Optimization</span>
                        <span className="text-gray-900">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
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