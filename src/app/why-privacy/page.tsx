import {
  Shield,
  Lock,
  ExternalLink,
  AlertTriangle,
  Code as LucideCode,
  ArrowRight as LucideArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Commitment to Privacy | Fortress Technologies',
  description:
    'Discover why open‑source, verifiable code is the cornerstone of our phone and connectivity products—and how genuine transparency protects you from hidden back‑doors.',
};

export default function WhyPrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ───────────────────────────────── Hero ─────────────────────────────── */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Commitment to Privacy
          </h1>
          <p className="text-lg text-gray-600">
            Fortress exists for one purpose: to give individuals complete control over
            their digital lives—no telemetry, no hidden switches, no compromises.
          </p>
        </header>

        <article className="prose max-w-none">
          {/* ───────── The Growing Importance ───────── */}
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">
            Why Privacy Has Become Non‑Negotiable
          </h2>
          <p>
            Personal data now fuels a multi‑trillion‑dollar surveillance economy. Every
            click, swipe, and location ping is harvested into behavioural profiles that
            influence elections, insurance rates, even dating prospects. In this new
            landscape, <strong>privacy is no longer a luxury &mdash; it is survival
            infrastructure</strong>.
          </p>

          <p>
            What was once harmless “analytics” has morphed into precision targeting,
            biometric tracking, and mass data breaches that echo for decades. A single
            compromise can expose financial records, intimate photos, or your real‑time
            location history to hostile actors in seconds.
          </p>

          {/* ───────── Threat Landscape Box ───────── */}
          <div className="bg-[#D0E4F5] p-6 rounded-lg my-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-[#0E294B] mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#0E294B] mb-2">
                  The Modern Threat Landscape
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Global Data Brokerage</strong> – 4,000+ firms trade
                    behaviour graphs on billions of users.
                  </li>
                  <li>
                    <strong>Nation‑State Surveillance</strong> – advanced spyware such
                    as <em>Pegasus</em> silently harvests cameras and mics.
                  </li>
                  <li>
                    <strong>Ransomware 2.0</strong> – data is exfiltrated <em>and</em>{" "}
                    encrypted, then auctioned on leak sites.
                  </li>
                  <li>
                    <strong>Algorithmic Gatekeeping</strong> – opaque A.I. scores decide
                    loans, jobs, parole &mdash; often unfairly.
                  </li>
                  <li>
                    <strong>Social Engineering at Scale</strong> – deep‑fake voice
                    phishing (“vishing”) raised global losses by 550 % in 2024.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ───────── Emerging Tech Section ───────── */}
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">
            Emerging Technologies Multiply the Risk — Unless Design Is Private by Default
          </h2>
          <p>
            Without privacy‑centric design, next‑gen tech becomes next‑gen tracking.
          </p>

          {/* Cards grid (kept from original) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {[
              {
                title: 'Artificial Intelligence & ML',
                body:
                  'Deep‑learning models can infer political leanings, medical conditions, ' +
                  'or even pregnancy status from seemingly harmless data. Without open ' +
                  'weights and auditing, these inferences remain invisible—and unaccountable.',
              },
              {
                title: 'Internet of Things (IoT)',
                body:
                  'From doorbells to sleep trackers, billions of “smart” sensors funnel ' +
                  'raw telemetry to proprietary clouds. Many ship with hard‑coded creds ' +
                  'and OTA updates you can’t inspect.',
              },
              {
                title: 'Facial Recognition & Biometrics',
                body:
                  'High‑resolution cameras and gait‑analysis algorithms now identify you ' +
                  'in milliseconds. Unlike a password, your face cannot be rotated after a leak.',
              },
              {
                title: 'Advanced Data Analytics',
                body:
                  'The mosaic effect stitches innocuous data points into dangerously ' +
                  'precise dossiers. Privacy is only as strong as the weakest anonymisation.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.body}</p>
              </div>
            ))}
          </div>

          {/* ───────── Rise in Crime Section ───────── */}
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">
            Cybercrime: The World’s Third‑Largest Economy
          </h2>
          <p>
            Global damages from cybercrime are projected to surpass{" "}
            <strong>$13 trillion by 2028</strong>. Personal data is the oil that fuels
            that engine&mdash;used for identity theft, ransomware, corporate
            espionage, and disinformation. Reducing your digital footprint isn’t
            paranoia; it’s basic risk management.
          </p>

          {/* List of crimes unchanged */}

          {/* ───────── Open‑Source Commitment Gradient ───────── */}
          <div className="bg-gradient-to-r from-[#0E294B] to-[#1E5C97] text-white p-8 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">Our Open‑Source Pledge</h2>
            <p className="mb-4">
              Transparency is the cornerstone of trust. Fortress publishes{" "}
              <em>every</em> line of code that touches your data—mobile firmware,
              connectivity daemons, cloud micro‑services, even manufacturing test
              scripts.
            </p>
            <p className="mb-6">
              Open‑source means anyone can audit, reproduce, and harden our stack.
              No NDAs, no black boxes—just verifiable security.
            </p>

            {/* Four icon cards kept from original */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'No Hidden Back‑Doors',
                  text:
                    "Auditable repositories make it impossible to slip clandestine " +
                    "surveillance payloads into production firmware.",
                },
                {
                  icon: Lock,
                  title: 'Security Through Transparency',
                  text: 'Bugs are fixed in hours, not months, when 10,000 eyes read the code.',
                },
                {
                  icon: ExternalLink,
                  title: 'Independent Verification',
                  text:
                    'Academics, NGOs, and enterprise auditors can validate every claim we make.',
                },
                {
                  icon: LucideCode,
                  title: 'Community Improvement',
                  text: 'Global contributors continuously submit patches and performance optimisations.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white/10 p-4 rounded-lg flex flex-col"
                >
                  <div className="flex items-center mb-2">
                    <card.icon className="h-5 w-5 mr-2" />
                    <h3 className="font-bold">{card.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/open-source"
                className="inline-flex items-center bg-white text-[#0E294B] px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Explore Our Open‑Source Projects
                <LucideArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ───────────────────── NEW Open‑Source Deep‑Dive ─────────────────── */}
          <section className="my-12 space-y-8">
            <h2 className="text-2xl font-bold text-[#0E294B]">
              Open Source: The Only Proven Defense Against Back‑Doors
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Transparent Peer Review',
                  body:
                    'Malicious code cannot hide in public. Thousands of engineers and ' +
                    'researchers globally audit our repos every day—amplifying assurance far ' +
                    'beyond any closed QA team.',
                },
                {
                  title: 'Reproducible Builds',
                  body:
                    'We publish deterministic build scripts so anyone can compile our code and ' +
                    'verify the binary hash equals the image shipped on their device. ' +
                    'Trust—then verify.',
                },
                {
                  title: 'Patch Velocity',
                  body:
                    'When a zero‑day drops, the open‑source community mobilises within hours. ' +
                    'Closed vendors often require quarterly cycles or private negotiations.',
                },
                {
                  title: 'No Secret Telemetry',
                  body:
                    'If we attempted to sneak metrics or ads into our codebase, contributors ' +
                    'would flag and remove them within minutes. Openness enforces discipline.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#D0E4F5]/60 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#0E294B] mb-3">
                Closed‑Source Failures: Lessons Learned
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Juniper ScreenOS (2015):</strong> Secret NSA‑style RNG back‑door
                  undetected for years.
                </li>
                <li>
                  <strong>Dual_EC_DRBG Spec:</strong> A compromised standard pushed into
                  cryptographic libraries for a decade until open researchers sounded the alarm.
                </li>
                <li>
                  <strong>Huawei Remote Debug (2019):</strong> Undocumented admin accounts on
                  consumer phones, uncovered only after reverse engineering binary blobs.
                </li>
              </ul>
            </div>

            <p className="text-gray-600">
              We therefore pledge: every firmware update, every companion app, every backend
              micro‑service will remain <strong>100 % open‑source</strong>. If you cannot verify
              the code, you do not control the device.
            </p>
          </section>

          {/* ───────── Taking Control Cards (unchanged) ───────── */}
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">
            Take Back Control of Your Digital Life
          </h2>
          <p>
            Fortress products are engineered so you don’t have to trade usability for privacy.
            The following categories give you immediate, tangible protection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {[
              {
                href: '/shop/secure-phones',
                title: 'Secure Phones',
                desc:
                  'GrapheneOS‑powered Pixel devices with verifiable builds, hardened memory ' +
                  'allocator, and zero Google Play Services.',
              },
              {
                href: '/shop/faraday-products',
                title: 'Faraday Products',
                desc:
                  'Signal‑blocking sleeves and bags to render wireless exfiltration—' +
                  'WiFi, 5G, Bluetooth—physically impossible.',
              },
              {
                href: '/shop/connectivity',
                title: 'Private Connectivity',
                desc:
                  'Pre‑paid data SIMs and eSIMs that require no ID, keeping your movements ' +
                  'decoupled from traditional telco logs.',
              },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* ───────── Privacy is a Fundamental Right ───────── */}
          <h2 className="text-2xl font-bold text-[#0E294B] mb-4">
            Privacy Is a Fundamental Human Right
          </h2>
          <p>
            The ability to decide who sees your personal information underpins autonomy, free
            expression, and democracy itself. By choosing open, verifiable tools you support a
            digital ecosystem that respects human dignity.
          </p>
          <ul className="list-disc pl-5 space-y-2 my-4">
            <li>
              <strong>Personal autonomy</strong> – make choices without algorithmic coercion
            </li>
            <li>
              <strong>Freedom of expression</strong> – speak without fear of surveillance
            </li>
            <li>
              <strong>Intellectual freedom</strong> – explore ideas privately
            </li>
            <li>
              <strong>Human dignity</strong> – control personal boundaries
            </li>
            <li>
              <strong>Democratic participation</strong> – engage civically without profiling
            </li>
          </ul>

          <div className="mt-12 text-center">
            <Link href="/shop">
              <button className="bg-[#0E294B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1E5C97] transition-colors">
                Explore Our Privacy Solutions
              </button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

/* ——— Utility inline SVGs (unchanged) ——— */
function Code(props: React.SVGProps<SVGSVGElement>) {
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
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
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
