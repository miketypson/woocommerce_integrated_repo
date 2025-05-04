"use client";

import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0E294B] to-[#1E5C97] rounded-lg p-8 mb-12 shadow-md text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-100 opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about privacy, security, and our products.
          </p>
        </div>
        
        {/* FAQ Accordions */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                What is GrapheneOS and why should I use it?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                GrapheneOS is a privacy and security-focused mobile operating system built on top of Android. 
                Unlike standard Android or iOS, GrapheneOS is designed with enhanced security features that 
                protect your data from surveillance and attacks. It offers strong app sandboxing, hardened 
                memory allocation, and complete control over app permissions without compromising usability. 
                We recommend GrapheneOS for anyone concerned about digital privacy, as it provides the best 
                balance of security, privacy, and functionality available on mobile devices today.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                How do Faraday bags protect my digital privacy?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                Faraday bags work by creating an electromagnetic shield around your device, blocking all wireless 
                signals including cellular, WiFi, Bluetooth, GPS, and RFID. When your device is inside a properly 
                sealed Faraday bag, it cannot receive or transmit any data, making it impossible for remote tracking, 
                data collection, or remote activation of microphones or cameras. Our premium Faraday bags feature 
                multiple layers of specialized signal-blocking materials that provide lab-tested protection against 
                a wide spectrum of frequencies. They're particularly useful when traveling, during sensitive meetings, 
                or simply when you want guaranteed privacy from digital surveillance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                What data do your privacy apps collect?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                None. Our privacy applications are built with a zero-collection policy, meaning they do not gather, 
                store, or transmit any personal information, usage statistics, or metadata. All processing happens 
                locally on your device, and no data is ever sent to our servers or third parties. Additionally, all 
                our apps are open-source, so the code can be publicly audited to verify this commitment. We believe 
                privacy tools should never compromise the very privacy they claim to protect, which is why our applications 
                operate entirely offline whenever possible and implement end-to-end encryption for any necessary communications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                Are secure phones more difficult to use than regular smartphones?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                This is a common misconception. While early privacy-focused phones often sacrificed user experience 
                for security, modern secure phones like our GrapheneOS devices maintain a familiar Android interface 
                with minimal learning curve. Most users find the transition seamless, as all basic functions work 
                just like any other smartphone. The main difference is that you'll have more granular control over 
                permissions and security settings, and some Google-dependent services may require alternatives. 
                We provide detailed setup guides and ongoing support to help new users navigate these minor differences, 
                ensuring that enhanced privacy doesn't come at the cost of usability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                How do anonymous prepaid SIMs enhance my privacy?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                Prepaid anonymous SIM cards provide a layer of separation between your identity and your mobile 
                communications. Unlike contract SIMs, which are directly linked to your personal information, 
                our prepaid SIMs don't require ID verification or personal details. This makes it significantly 
                harder for companies, advertisers, and other entities to build profiles based on your communications 
                and location data. When used in combination with a secure phone and privacy-focused communication apps, 
                prepaid SIMs help minimize your digital footprint and reduce opportunities for tracking and surveillance, 
                though they're not a complete solution on their own.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                Why is open-source software important for privacy?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                Open-source software is crucial for privacy because it enables transparency and accountability. 
                When software is open-source, the code can be publicly reviewed by security researchers and privacy 
                advocates who can verify that it does what it claims and doesn't contain hidden functionality to 
                collect or transmit your data. With proprietary (closed-source) software, you must blindly trust 
                the vendor's claims about privacy and security. Additionally, open-source software often benefits 
                from community contributions that improve security over time, and generally provides better long-term 
                support as it's not dependent on a single company's business decisions. At Fortress Technologies, 
                all our software is open-source for these reasons, allowing anyone to verify our privacy claims.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-[#0E294B] font-medium">
                How can I protect my privacy beyond using secure hardware?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700">
                While secure hardware like privacy-focused phones is an excellent foundation, comprehensive privacy 
                protection requires a multi-layered approach. We recommend using encrypted messaging apps for all 
                communications, a trustworthy VPN or Tor for internet browsing, strong unique passwords with a password 
                manager, two-factor authentication for important accounts, and regular privacy checkups on your social 
                media and online accounts. It's also important to be mindful of your digital behavior—limiting the 
                information you share online, being cautious with new apps and services, and staying informed about 
                emerging privacy threats. Privacy is ultimately a continuous practice rather than a one-time product 
                purchase, and we provide resources on our website to help you develop these privacy-preserving habits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#0E294B] mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help with any additional questions about our products and services.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#0E294B] text-white px-6 py-3 rounded-md hover:bg-[#1E5C97] transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
