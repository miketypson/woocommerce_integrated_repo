import { Shield, Lock, ExternalLink, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Why Privacy Matters | Data Security in the Digital Age",
  description: "Learn why data privacy and security are more important than ever in today's digital landscape with emerging technologies and increasing online threats.",
};

export default function WhyPrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Privacy Matters
          </h1>
          <p className="text-lg text-gray-600">
            In today's interconnected world, protecting your digital privacy has never been more important.
          </p>
        </div>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">The Growing Importance of Data Privacy</h2>
          
          <p>
            As our lives become increasingly digital, the amount of personal data we generate grows exponentially. 
            From browsing habits and location data to personal communications and financial information, this data 
            creates a detailed picture of who we are, what we do, and how we think.
          </p>
          
          <p>
            Unfortunately, this data is often collected, stored, and analyzed without our meaningful consent or 
            knowledge. Tech companies, advertisers, data brokers, and even malicious actors are constantly seeking 
            access to this information for various purposes - some commercial, some more concerning.
          </p>
          
          <div className="bg-[#D0E4F5] p-6 rounded-lg my-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-[#0E294B] mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#0E294B] mb-2">The Privacy Threat Landscape</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Mass Surveillance:</strong> Both governmental and corporate entities engage in widespread data collection.</li>
                  <li><strong>Data Breaches:</strong> Major organizations regularly suffer breaches exposing personal information.</li>
                  <li><strong>Identity Theft:</strong> Personal data can be used to impersonate you for financial gain.</li>
                  <li><strong>Algorithmic Discrimination:</strong> Your data can be used to make automated decisions that affect your opportunities.</li>
                  <li><strong>Manipulation:</strong> Detailed profiles enable targeted influence campaigns.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">Emerging Technologies Amplify Privacy Concerns</h2>
          
          <p>
            Several emerging technologies are making privacy protection more urgent than ever:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Artificial Intelligence & Machine Learning</h3>
              <p className="text-gray-600 mb-3">
                AI systems can analyze vast amounts of data to identify patterns and make predictions about individuals, 
                often revealing sensitive information that was never explicitly shared.
              </p>
              <p className="text-gray-600">
                These systems can infer your political views, sexual orientation, health conditions, and other sensitive 
                attributes from seemingly innocuous data.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Internet of Things (IoT)</h3>
              <p className="text-gray-600 mb-3">
                Smart devices in our homes, cars, and on our bodies are constantly collecting data about our behaviors, 
                preferences, and physical states.
              </p>
              <p className="text-gray-600">
                Many of these devices have poor security practices and vague privacy policies, creating numerous 
                vulnerabilities in our personal spaces.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Facial Recognition & Biometrics</h3>
              <p className="text-gray-600 mb-3">
                These technologies enable identification and tracking without consent, potentially eliminating 
                anonymity in public spaces.
              </p>
              <p className="text-gray-600">
                Unlike passwords, biometric data cannot be changed if compromised, creating permanent vulnerabilities.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Data Analytics</h3>
              <p className="text-gray-600 mb-3">
                Modern data analysis techniques can combine information from multiple sources to create detailed 
                profiles of individuals, even when individual data points seem anonymous.
              </p>
              <p className="text-gray-600">
                This "mosaic effect" means that even careful sharing of some data can lead to significant privacy losses.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">The Rise in Online Crime</h2>
          
          <p>
            Cybercrime has evolved from isolated incidents to a sophisticated global industry. According to recent 
            statistics, cybercrime damages are projected to reach $10.5 trillion annually by 2025, up from $3 trillion 
            in 2015.
          </p>
          
          <p>
            Personal data is a primary target for these criminals, who use it for:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li>Financial fraud and identity theft</li>
            <li>Targeted phishing attacks</li>
            <li>Account takeovers</li>
            <li>Extortion and ransomware</li>
            <li>Corporate espionage</li>
          </ul>
          
          <p>
            As our digital footprints grow, so does our vulnerability to these threats. Strong privacy practices are 
            an essential part of personal security in the digital age.
          </p>
          
          <div className="bg-gradient-to-r from-[#0E294B] to-[#1E5C97] text-white p-8 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">Our Open-Source Commitment</h2>
            <p className="mb-4">
              At our core, we believe that true privacy requires transparency and verifiability. That's why we've 
              made a commitment to open-source all of our software and provide detailed documentation of our security 
              practices.
            </p>
            <p className="mb-6">
              Open-source software allows anyone to inspect, verify, and contribute to the code. This transparency 
              ensures that:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2" />
                  <h3 className="font-bold">No Hidden Backdoors</h3>
                </div>
                <p className="text-white/80 text-sm">
                  You can verify that our software doesn't contain hidden surveillance capabilities or security vulnerabilities.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 mr-2" />
                  <h3 className="font-bold">Security Through Transparency</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Security vulnerabilities are identified and fixed quickly through community review.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  <h3 className="font-bold">Independent Verification</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Security researchers and privacy advocates can independently verify our claims.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 mr-2" />
                  <h3 className="font-bold">Community Improvement</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Our software benefits from the collective expertise of the privacy and security community.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/open-source" className="inline-flex items-center bg-white text-[#0E294B] px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors">
                Explore Our Open-Source Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">Taking Control of Your Digital Privacy</h2>
          
          <p>
            While the privacy landscape may seem daunting, there are concrete steps you can take to protect your 
            personal information. Our products and services are designed to give you back control over your digital life:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Link href="/shop/secure-phones" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Secure Phones</h3>
                <p className="text-gray-600">
                  Our GrapheneOS-powered phones provide a secure foundation for your digital life without Google services tracking your every move.
                </p>
              </div>
            </Link>
            
            <Link href="/shop/faraday-products" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Faraday Products</h3>
                <p className="text-gray-600">
                  Block unwanted signals and prevent tracking with our range of signal-blocking faraday bags and pouches.
                </p>
              </div>
            </Link>
            
            <Link href="/shop/connectivity" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Private Connectivity</h3>
                <p className="text-gray-600">
                  Our prepaid data SIMs and connectivity solutions help you stay connected without sacrificing your privacy.
                </p>
              </div>
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">Privacy is a Fundamental Right</h2>
          
          <p>
            We believe that privacy is not just a preference but a fundamental human right. The ability to control 
            who has access to your personal information is essential for:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li><strong>Personal autonomy</strong> - Making choices free from manipulation</li>
            <li><strong>Freedom of expression</strong> - Speaking without fear of surveillance</li>
            <li><strong>Intellectual freedom</strong> - Exploring ideas without judgment</li>
            <li><strong>Human dignity</strong> - Maintaining control over your personal boundaries</li>
            <li><strong>Democratic participation</strong> - Engaging in civic life without tracking</li>
          </ul>
          
          <p>
            By choosing privacy-focused products and services, you're not just protecting yourself—you're supporting 
            a vision of the digital world that respects human dignity and freedom.
          </p>
          
          <div className="mt-12 text-center">
            <Link href="/shop">
              <button className="bg-[#0E294B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1E5C97] transition-colors">
                Explore Our Privacy Solutions
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing imports for Code and ArrowRight
function Code(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
