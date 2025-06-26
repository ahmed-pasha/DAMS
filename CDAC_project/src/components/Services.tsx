import React from 'react';
import { 
  FolderOpen, 
  Search, 
  Shield, 
  Share2, 
  BarChart3, 
  Workflow,
  Cloud,
  Settings
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: FolderOpen,
      title: 'Asset Organization',
      description: 'Intelligent categorization and tagging system to keep your digital assets organized and easily accessible.',
      features: ['Smart categorization', 'Custom tags', 'Folder structures', 'Bulk operations']
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Powerful search engine with filters, metadata search, and AI-powered content recognition.',
      features: ['Full-text search', 'Visual similarity', 'Metadata filters', 'Smart suggestions']
    },
    {
      icon: Shield,
      title: 'Security & Permissions',
      description: 'Enterprise-grade security with role-based access control and detailed permission management.',
      features: ['Role-based access', 'Encryption', 'Audit trails', 'Compliance ready']
    },
    {
      icon: Share2,
      title: 'Collaboration Tools',
      description: 'Seamless sharing and collaboration features for teams to work together efficiently.',
      features: ['Team workspaces', 'Real-time sync', 'Comments & reviews', 'Version control']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into asset usage, performance metrics, and user behavior.',
      features: ['Usage analytics', 'Performance metrics', 'Custom reports', 'Data export']
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Streamline processes with automated workflows and approval chains.',
      features: ['Custom workflows', 'Approval chains', 'Auto-tagging', 'Notifications']
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamless integration with popular cloud storage providers and CDN services.',
      features: ['Multi-cloud support', 'CDN integration', 'Auto backup', 'Sync capabilities']
    },
    {
      icon: Settings,
      title: 'API & Integrations',
      description: 'Robust REST API and pre-built integrations with popular tools and platforms.',
      features: ['REST API', 'Webhooks', 'Third-party apps', 'Custom integrations']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Digital Asset Management Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From organization to analytics, our platform provides everything you need to manage 
            your digital assets effectively and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg w-fit mb-4 group-hover:from-purple-200 group-hover:to-blue-200 transition-colors duration-300">
                <service.icon className="h-6 w-6 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Asset Management?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get started with our comprehensive solution today and experience the difference.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
