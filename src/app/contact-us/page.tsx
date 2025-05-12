import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Fortress Technologies',
  description:
    "Get in touch with our team for inquiries about our privacy-focused products and services. We're here to help protect your digital life.",
};

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ───────────────────────────────── Hero ─────────────────────────────── */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Have questions or inquiries? Our team is here to help protect your digital privacy.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ───────────────────────────────── Contact Info ─────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#0E294B] mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-[#1E5C97] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@fortresstechnologies.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-[#1E5C97] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#1E5C97] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Privacy Street<br />
                      Secure City, ST 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────── Contact Form ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#0E294B] mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium text-gray-900">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium text-gray-900">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-medium text-gray-900">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is your message about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-medium text-gray-900">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-gray-500">
                    We'll respond within 24-48 business hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
