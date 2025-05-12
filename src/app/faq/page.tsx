import FAQAccordions from "@/components/faq/FAQAccordions";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ───────────────────────────────── Hero ─────────────────────────────── */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our privacy-focused products and services.
          </p>
        </header>

        {/* ───────────────────────────────── FAQ Categories ─────────────────────────────── */}
        <FAQAccordions />

        {/* ───────────────────────────────── Contact CTA ─────────────────────────────── */}
        <div className="mt-12 p-8 bg-[#D0E4F5] rounded-lg text-center">
          <h2 className="text-xl font-bold text-[#0E294B] mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-700 mb-6">
            Our team is ready to answer any other questions you might have about our products and services.
          </p>
          <a 
            href="/contact-us" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0E294B] hover:bg-[#1E5C97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E294B]"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
