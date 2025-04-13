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
          <div className="bg-[#D0E4F5] p-4 rounded-lg text-[#0E294B] inline-block">
            <p className="font-medium">
              All phones come pre-loaded with your choice of these privacy-respecting apps.
            </p>
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
