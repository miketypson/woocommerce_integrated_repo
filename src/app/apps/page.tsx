import AppList from "@/components/apps/AppList";

export const metadata = {
  title: "Privacy-Focused Apps | Security & Privacy Analysis",
  description: "Detailed breakdown of privacy-focused apps, their functionality, security features, and potential vulnerabilities.",
};

export default function AppsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy-Focused Apps
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We carefully select and analyze apps that respect your privacy and security.
            Each app is evaluated for its functionality, security features, and potential vulnerabilities.
          </p>
          <div className="bg-[#D0E4F5] p-4 rounded-lg text-[#0E294B] mb-6">
            <p className="font-medium">
              All phones come pre-loaded with your choice of these privacy-respecting apps.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Verified and Pre-Downloaded Apps
            </h2>
            <p className="text-gray-700 mb-4">
              All apps listed on this page have been carefully vetted, tested, and verified by our security team. 
              These pre-selected applications prioritize your privacy and security while providing essential functionality.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice About Other Apps</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      While you can download additional apps through the App Store applications listed here (Aurora Store, F-Droid), 
                      we strongly advise against installing apps from unknown sources or apps that have not been vetted for privacy.
                    </p>
                    <p className="mt-2">
                      Many mainstream apps contain trackers, invasive permissions, and data collection mechanisms that may compromise your privacy. 
                      Any app installed outside our recommendations is at your own risk and may undermine the privacy protections we've implemented.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AppList />
        
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Verify Your Device's Security
          </h2>
          <p className="text-gray-600 mb-4">
            As part of our commitment to transparency and security, we provide tools and resources to help you verify that your device is secure and hasn't been compromised.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Open-Source Verification</h3>
              <p className="text-gray-600 text-sm">
                All our software is open-source, allowing you to inspect the code yourself or have it audited by security professionals. Links to our GitHub repositories are provided with each product.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Security Auditing Tools</h3>
              <p className="text-gray-600 text-sm">
                We include security auditing tools that can scan your device for potential vulnerabilities or signs of compromise. These tools are regularly updated to detect the latest threats.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Verified Boot</h3>
              <p className="text-gray-600 text-sm">
                Our phones use GrapheneOS's verified boot process to ensure that the operating system hasn't been tampered with. This provides cryptographic verification of the entire OS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
