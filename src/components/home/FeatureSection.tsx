import { Shield, Code, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';

const FeatureSection = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Open Source Transparency",
      description: "All our software is open source, allowing you to verify our security claims. We believe transparency builds trust and ensures accountability.",
      link: "/open-source"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersecurity Expertise",
      description: "Built by experts with extensive backgrounds in software development and cybersecurity. Our solutions are designed with security best practices at their core.",
      link: "/about"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Privacy Education",
      description: "We provide resources to help you understand why data privacy matters in an era of emerging tech and increasing online threats.",
      link: "/why-privacy"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "End-to-End Protection",
      description: "Our comprehensive product range ensures your digital life remains private, from secure phones to faraday bags and privacy-focused software.",
      link: "/shop"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy-First, Open-Source Solutions
          </h2>
          <p className="text-lg text-gray-600">
            We're committed to protecting your digital privacy through transparent, 
            open-source technology and expert-designed security solutions.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 hover:border-[#D0E4F5] transition-all duration-300 hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-full bg-[#D0E4F5] flex items-center justify-center mb-6 text-[#0E294B] group-hover:bg-[#0E294B] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              
              <Link 
                href={feature.link}
                className="inline-flex items-center text-[#0E294B] font-medium hover:underline"
              >
                Learn more
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        {/* GrapheneOS Highlight */}
        <div className="mt-16 bg-gradient-to-r from-[#0E294B] to-[#1E5C97] rounded-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">
                Powered by GrapheneOS
              </h3>
              <p className="text-white/80 mb-4">
                Our secure phones come pre-installed with GrapheneOS, the privacy-focused 
                mobile operating system that provides unparalleled security without compromising usability.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                  Enhanced Security
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                  No Google Services
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                  Open Source
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                  Privacy by Default
                </span>
              </div>
              <div className="flex space-x-4">
                <Link 
                  href="/shop/secure-phones"
                  className="bg-white text-[#0E294B] px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  View Secure Phones
                </Link>
                <Link 
                  href="https://grapheneos.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  Learn About GrapheneOS
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center">
                <div className="text-white text-opacity-90 text-center">
                  <Shield className="h-16 w-16 mx-auto mb-2" />
                  <span className="text-sm">GrapheneOS Logo Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
