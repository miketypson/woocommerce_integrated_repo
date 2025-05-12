"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQAccordions() {
  return (
    <div className="space-y-10">
      {/* Products FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-[#0E294B] mb-6">Products</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="products-1">
              <AccordionTrigger className="px-6 text-base font-medium">
                What products do you offer?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Fortress Technologies offers a range of privacy-focused products:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Privacy-focused smartphones with GrapheneOS pre-installed</li>
                  <li>Premium Faraday bags for signal blocking</li>
                  <li>Prepaid data SIM cards for anonymous connectivity</li>
                  <li>Secure communication tools and applications</li>
                  <li>Encrypted storage devices</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products-2">
              <AccordionTrigger className="px-6 text-base font-medium">
                Are your products open-source?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Yes, transparency is our cornerstone. All of our software is open-source and can be audited by anyone to verify our security claims. We believe that privacy requires trust, and trust requires transparency. Our repositories are publicly available for inspection, contribution, and verification.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products-3">
              <AccordionTrigger className="px-6 text-base font-medium">
                What operating system do your phones use?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Our phones come pre-installed with GrapheneOS, a privacy and security focused mobile OS with Android app compatibility. GrapheneOS provides strong security and privacy protections by default without sacrificing usability or features.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products-4">
              <AccordionTrigger className="px-6 text-base font-medium">
                Do your phones support regular Android apps?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Yes, our phones support standard Android applications through GrapheneOS's compatibility layer. You can install apps from the Aurora Store or, if you choose, through Google Play Services (sandboxed for additional security). This gives you the flexibility to use your favorite apps while maintaining enhanced privacy.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Shipping & Returns FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-[#0E294B] mb-6">Shipping & Returns</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping-1">
              <AccordionTrigger className="px-6 text-base font-medium">
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Yes, we ship our privacy products worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs fees and import taxes depending on the destination country's regulations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-2">
              <AccordionTrigger className="px-6 text-base font-medium">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Domestic orders typically ship within 1-2 business days and arrive within 3-5 business days. International shipping times vary by destination, usually taking 7-14 business days. You'll receive a tracking number once your order ships.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-3">
              <AccordionTrigger className="px-6 text-base font-medium">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  We offer a 30-day satisfaction guarantee on most products. If you're not completely satisfied with your purchase, you can return it for a full refund. Some exceptions apply for opened software licenses and activated SIM cards. Please contact our support team for specific details regarding your purchase.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Privacy & Security FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-[#0E294B] mb-6">Privacy & Security</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy-1">
              <AccordionTrigger className="px-6 text-base font-medium">
                Do you collect user data?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  We have a strict no-logging policy across all our services and products. We do not collect telemetry, usage statistics, or personal information beyond what's minimally required to process orders and provide customer support. All of our code is open-source and can be audited to verify these claims.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy-2">
              <AccordionTrigger className="px-6 text-base font-medium">
                How secure are your phones compared to stock Android or iOS?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Our phones running GrapheneOS provide significantly enhanced security compared to stock Android or iOS through multiple layers of protection:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Hardened memory allocator to prevent memory exploitation</li>
                  <li>Advanced app sandboxing beyond standard Android</li>
                  <li>Strengthened verified boot process</li>
                  <li>Removal of unnecessary services that could pose security risks</li>
                  <li>Regular security updates delivered promptly</li>
                  <li>No Google services running with system privileges</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy-3">
              <AccordionTrigger className="px-6 text-base font-medium">
                What makes Faraday bags effective?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Our Faraday bags use multiple layers of high-shielding metallic fabric that blocks all wireless signals including cellular, WiFi, Bluetooth, GPS, and NFC. This prevents any remote tracking, data transmission, or reception when your device is sealed inside. Each bag is laboratory tested to ensure effective signal blocking across all common frequencies.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Support FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-[#0E294B] mb-6">Support & Warranty</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="support-1">
              <AccordionTrigger className="px-6 text-base font-medium">
                What warranty do you provide?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  All hardware products come with a standard 1-year limited warranty covering manufacturing defects and hardware failures not caused by accidental damage. Extended warranty options are available for purchase at checkout.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support-2">
              <AccordionTrigger className="px-6 text-base font-medium">
                How do I get technical support?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Technical support is available through multiple channels:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Email support: support@fortresstechnologies.com</li>
                  <li>Phone support: +1 (555) 123-4567 (Mon-Fri, 9AM-6PM)</li>
                  <li>Community forums</li>
                  <li>Documentation and knowledge base at docs.fortresstechnologies.com</li>
                </ul>
                <p className="mt-2">
                  For urgent matters, please use our phone support line during business hours.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support-3">
              <AccordionTrigger className="px-6 text-base font-medium">
                Do you offer business or enterprise support?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                <p>
                  Yes, we offer specialized support packages for businesses and organizations with volume licensing, priority support, custom deployment assistance, and dedicated account management. Please contact our business sales team at business@fortresstechnologies.com for more information.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
