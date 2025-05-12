"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Info, Check, ChevronDown } from 'lucide-react';

// Define structure to organize apps by category
type App = {
  id: string;
  name: string;
  description: string;
  privacyFeatures: string[];
  securityRating: number;
  privacyRating: number;
  vulnerabilities: string;
  isRecommended: boolean;
  icon?: string;
  website?: string;
};

type AppCategory = {
  category: string;
  apps: App[];
};

const appCategories: AppCategory[] = [
  {
    category: "App Store",
    apps: [
      {
        id: 'aurora-store',
        name: 'Aurora Store',
        description: 'Open-source client for Google Play Store with privacy features and anonymous browsing.',
        privacyFeatures: ['Anonymous accounts', 'No Google services required', 'Open-source'],
        securityRating: 4,
        privacyRating: 4,
        vulnerabilities: 'Apps from Google Play may still contain trackers.',
        isRecommended: true,
      },
      {
        id: 'f-droid',
        name: 'F-Droid',
        description: 'Open-source app repository with only free and open source software (FOSS).',
        privacyFeatures: ['Only FOSS apps', 'No tracking', 'Reproducible builds'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited app selection compared to commercial stores.',
        isRecommended: true,
        website: 'https://f-droid.org/',
      },
      {
        id: 'neo-store',
        name: 'Neo-Store',
        description: 'Modern F-Droid client with improved UI and advanced features.',
        privacyFeatures: ['F-Droid compatible', 'No tracking', 'Modern interface'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Same limitations as F-Droid regarding app selection.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Cloud Storage",
    apps: [
      {
        id: 'ente-photos',
        name: 'Ente Photos',
        description: 'End-to-end encrypted photo storage with privacy-first approach.',
        privacyFeatures: ['End-to-end encryption', 'No metadata harvesting', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited free storage compared to commercial alternatives.',
        isRecommended: true,
      },
      {
        id: 'proton-drive',
        name: 'Proton Drive',
        description: 'Secure cloud storage from the makers of ProtonMail with end-to-end encryption.',
        privacyFeatures: ['End-to-end encryption', 'Zero-access encryption', 'Swiss privacy laws'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited free storage tier.',
        isRecommended: true,
        website: 'https://proton.me/drive',
      },
    ]
  },
  {
    category: "Communication",
    apps: [
      {
        id: 'signal',
        name: 'Signal',
        description: 'Secure messaging app with end-to-end encryption and advanced privacy features.',
        privacyFeatures: ['End-to-end encryption', 'No metadata collection', 'Disappearing messages'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Phone number required for registration.',
        isRecommended: true,
        website: 'https://signal.org/',
      },
      {
        id: 'threema-libre',
        name: 'Threema Libre',
        description: 'Privacy-focused messenger with minimal data collection and strong encryption.',
        privacyFeatures: ['No phone number required', 'End-to-end encryption', 'Minimal metadata'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Smaller user base than major messaging apps.',
        isRecommended: true,
        website: 'https://threema.ch/',
      },
      {
        id: 'telegram',
        name: 'Telegram',
        description: 'Feature-rich messaging platform with optional end-to-end encryption.',
        privacyFeatures: ['Secret chats', 'Self-destructing messages', 'No phone number sharing'],
        securityRating: 3,
        privacyRating: 3,
        vulnerabilities: 'Regular chats not end-to-end encrypted by default.',
        isRecommended: false,
      },
      {
        id: 'molly',
        name: 'Molly',
        description: 'Hardened fork of Signal with enhanced security features and privacy improvements.',
        privacyFeatures: ['Signal protocol', 'Security enhancements', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Phone number still required for registration.',
        isRecommended: true,
      },
      {
        id: 'simplex',
        name: 'SimpleX',
        description: 'Decentralized messaging without identifiers, providing enhanced anonymity.',
        privacyFeatures: ['No user identifiers', 'Decentralized', 'End-to-end encryption'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Smaller user base and fewer features than mainstream apps.',
        isRecommended: true,
      },
      {
        id: 'session',
        name: 'Session',
        description: 'Private messenger that minimizes sensitive metadata and doesn\'t require a phone number.',
        privacyFeatures: ['No phone number required', 'Onion routing', 'Decentralized'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Smaller user base compared to mainstream messengers.',
        isRecommended: true,
      },
      {
        id: 'cheogram',
        name: 'Cheogram',
        description: 'XMPP client focusing on compatibility, privacy, and ease of use.',
        privacyFeatures: ['XMPP protocol', 'Federation', 'End-to-end encryption'],
        securityRating: 4,
        privacyRating: 4,
        vulnerabilities: 'Less user-friendly than more mainstream messaging apps.',
        isRecommended: false,
      },
      {
        id: 'briar',
        name: 'Briar',
        description: 'Peer-to-peer encrypted messaging that works even without internet access.',
        privacyFeatures: ['Peer-to-peer', 'Works offline', 'Tor integration'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Requires both users to be online simultaneously for message delivery.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "VPN",
    apps: [
      {
        id: 'mullvad-vpn',
        name: 'Mullvad',
        description: 'Privacy-focused VPN with anonymous account creation and no logging policy.',
        privacyFeatures: ['No logs', 'Anonymous payments', 'WireGuard protocol'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Smaller server network than some competitors.',
        isRecommended: true,
        website: 'https://mullvad.net/',
      },
      {
        id: 'protonvpn',
        name: 'ProtonVPN',
        description: 'Secure VPN service with strong encryption and no-logs policy from the makers of ProtonMail.',
        privacyFeatures: ['No logs', 'Open-source', 'Secure core architecture'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Free tier has limited speeds and server options.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Mail",
    apps: [
      {
        id: 'protonmail',
        name: 'Proton Mail',
        description: 'Encrypted email service with end-to-end encryption and zero-access encryption.',
        privacyFeatures: ['End-to-end encryption', 'Zero-access encryption', 'Swiss privacy laws'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Email subject lines not encrypted. Limited integration with other providers.',
        isRecommended: true,
        website: 'https://proton.me/mail',
      },
      {
        id: 'k9-mail',
        name: 'K-9 Mail',
        description: 'Open-source email client with support for multiple accounts and encryption.',
        privacyFeatures: ['OpenPGP support', 'Open-source', 'Local encryption'],
        securityRating: 4,
        privacyRating: 4,
        vulnerabilities: 'Relies on email provider security for non-encrypted emails.',
        isRecommended: true,
      },
      {
        id: 'thunderbird',
        name: 'Thunderbird',
        description: 'Fully-featured, open-source email client with strong privacy features and encryption support.',
        privacyFeatures: ['OpenPGP support', 'Open-source', 'Privacy-focused'],
        securityRating: 4,
        privacyRating: 4,
        vulnerabilities: 'More complex setup for encryption features.',
        isRecommended: false,
      },
      {
        id: 'tutamail',
        name: 'Tuta Mail',
        description: 'End-to-end encrypted email service based in Germany with strong privacy focus.',
        privacyFeatures: ['End-to-end encryption', 'Encrypted metadata', 'German privacy laws'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited free tier features.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Mail Forwarding",
    apps: [
      {
        id: 'addy',
        name: 'addy.io',
        description: 'Email alias service to protect your real email address from spam and tracking.',
        privacyFeatures: ['Email aliasing', 'No logging', 'PGP encryption support'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'Limited free tier with few aliases.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Temp Mail Service",
    apps: [
      {
        id: 'guerrilla-mail',
        name: 'Guerrilla Mail',
        description: 'Disposable temporary email service for one-time registrations and verification.',
        privacyFeatures: ['Disposable addresses', 'No registration required', 'Automatic expiry'],
        securityRating: 3,
        privacyRating: 4,
        vulnerabilities: 'Emails not encrypted and stored on their servers temporarily.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "PGP Tool",
    apps: [
      {
        id: 'openkeychain',
        name: 'OpenKeychain',
        description: 'OpenPGP implementation for Android allowing secure communication and encryption.',
        privacyFeatures: ['OpenPGP standard', 'Open-source', 'Key management'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Requires technical knowledge to use effectively.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Browsers",
    apps: [
      {
        id: 'duckduckgo',
        name: 'DuckDuckGo',
        description: 'Privacy-focused browser with built-in tracker blocking and privacy features.',
        privacyFeatures: ['Tracker blocking', 'Private search', 'HTTPS enforcement'],
        securityRating: 4,
        privacyRating: 4,
        vulnerabilities: 'Less features than some mainstream browsers.',
        isRecommended: true,
      },
      {
        id: 'tor',
        name: 'Tor',
        description: 'Browser focused on anonymity, routing traffic through the Tor network.',
        privacyFeatures: ['Onion routing', 'No browsing history', 'Anti-fingerprinting'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Slower browsing experience due to routing.',
        isRecommended: true,
        website: 'https://www.torproject.org/',
      },
      {
        id: 'mullvad-browser',
        name: 'Mullvad',
        description: 'Privacy-focused browser based on Firefox, developed by Mullvad VPN.',
        privacyFeatures: ['Anti-fingerprinting', 'Tracking protection', 'Privacy by default'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Some websites may break due to strict privacy protections.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Torrent",
    apps: [
      {
        id: 'libretorrent',
        name: 'LibreTorrent',
        description: 'Free and open-source torrent client for Android with a simple interface.',
        privacyFeatures: ['Open-source', 'Ad-free', 'No tracking'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'P2P sharing exposes IP address to peers unless used with VPN.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "App Updates",
    apps: [
      {
        id: 'obtainium',
        name: 'Obtainium',
        description: 'Tool for installing and updating apps directly from source, bypassing app stores.',
        privacyFeatures: ['Direct from source', 'No middlemen', 'No tracking'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'Requires careful source verification to avoid malicious apps.',
        isRecommended: true,
      },
      {
        id: 'accrescent',
        name: 'Accrescent',
        description: 'Privacy-focused alternative app store with verified safe applications.',
        privacyFeatures: ['No tracking', 'Verified applications', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited selection of apps available.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Document Reader",
    apps: [
      {
        id: 'opendocument-droid',
        name: 'OpenDocument.droid',
        description: 'Open-source document reader for Android supporting multiple document formats.',
        privacyFeatures: ['Open-source', 'No tracking', 'Offline functionality'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'Limited format support compared to commercial alternatives.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Cryptocurrency DEX",
    apps: [
      {
        id: 'haveno',
        name: 'Haveno',
        description: 'Decentralized exchange focused on privacy and security for cryptocurrency trading.',
        privacyFeatures: ['Decentralized', 'No KYC', 'Private trades'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'New platform with developing ecosystem.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Cryptocurrency Wallets",
    apps: [
      {
        id: 'cake-wallet',
        name: 'Cake Wallet',
        description: 'Open-source crypto wallet with built-in exchange functionality for privacy coins.',
        privacyFeatures: ['Non-custodial', 'Built-in exchange', 'Privacy coin support'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'User responsible for key management and backups.',
        isRecommended: true,
      },
      {
        id: 'trezor-wallet',
        name: 'Trezor Wallet',
        description: 'Official companion app for Trezor hardware wallets for secure crypto management.',
        privacyFeatures: ['Hardware security', 'Open-source', 'Offline signing'],
        securityRating: 5,
        privacyRating: 4,
        vulnerabilities: 'Requires physical hardware wallet for full security benefits.',
        isRecommended: true,
      },
      {
        id: 'electrum-wallet',
        name: 'Electrum Wallet',
        description: 'Lightweight, secure Bitcoin wallet with advanced features for power users.',
        privacyFeatures: ['Open-source', 'Coin control', 'Connect to own node'],
        securityRating: 5,
        privacyRating: 4,
        vulnerabilities: 'Bitcoin-only, requires additional security measures for high privacy.',
        isRecommended: true,
      },
      {
        id: 'monero-com-wallet',
        name: 'Monero.com Wallet',
        description: 'Dedicated wallet for Monero privacy cryptocurrency with enhanced security features.',
        privacyFeatures: ['Privacy by default', 'Non-custodial', 'Hidden balances'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Monero-focused with limited support for other cryptocurrencies.',
        isRecommended: true,
      },
      {
        id: 'monerujo-wallet',
        name: 'Monerujo Wallet',
        description: 'Open-source Monero wallet for Android with strong privacy and security focus.',
        privacyFeatures: ['Privacy by default', 'Node switching', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Monero-only wallet with no other cryptocurrency support.',
        isRecommended: true,
      },
      {
        id: 'trust-wallet',
        name: 'Trust',
        description: 'Multi-cryptocurrency wallet with built-in Web3 DApp browser and exchange capabilities.',
        privacyFeatures: ['Non-custodial', 'Local key storage', 'Multiple blockchain support'],
        securityRating: 4,
        privacyRating: 3,
        vulnerabilities: 'Owned by Binance, which may raise privacy concerns for some users.',
        isRecommended: false,
      },
      {
        id: 'metamask-wallet',
        name: 'Metamask',
        description: 'Popular Ethereum and ERC-20 token wallet with DApp browser functionality.',
        privacyFeatures: ['Non-custodial', 'Local key storage', 'Open-source'],
        securityRating: 4,
        privacyRating: 3,
        vulnerabilities: 'Collects some analytics data and IP addresses.',
        isRecommended: false,
      },
      {
        id: 'phantom-wallet',
        name: 'Phantom',
        description: 'Solana blockchain wallet with support for tokens, NFTs, and DApp integrations.',
        privacyFeatures: ['Non-custodial', 'Local key storage', 'Token management'],
        securityRating: 4,
        privacyRating: 3,
        vulnerabilities: 'Primarily focused on Solana ecosystem with limited cross-chain support.',
        isRecommended: false,
      },
    ]
  },
  {
    category: "Note-taking",
    apps: [
      {
        id: 'standard-notes',
        name: 'Standard Notes',
        description: 'End-to-end encrypted notes app with cross-platform sync and extended features.',
        privacyFeatures: ['End-to-end encryption', 'Open-source', 'Self-hosting option'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Advanced features require paid subscription.',
        isRecommended: true,
        website: 'https://standardnotes.com/',
      },
    ]
  },
  {
    category: "Calendar",
    apps: [
      {
        id: 'pocketplan',
        name: 'PocketPlan',
        description: 'Privacy-focused calendar app with encrypted events and minimal data collection.',
        privacyFeatures: ['Encrypted events', 'No cloud requirement', 'Open-source'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'More limited features compared to mainstream calendar apps.',
        isRecommended: true,
      },
      {
        id: 'tuta-calendar',
        name: 'Tuta Calendar',
        description: 'Encrypted calendar from Tutanota with strong privacy focus and secure sharing.',
        privacyFeatures: ['End-to-end encryption', 'Secure sharing', 'Privacy-first design'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Limited integration with non-Tuta services.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Password Manager",
    apps: [
      {
        id: 'bitwarden',
        name: 'Bitwarden',
        description: 'Open-source password manager with end-to-end encryption and cross-platform support.',
        privacyFeatures: ['Zero-knowledge architecture', 'End-to-end encryption', 'Self-hosting option'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Some advanced features require paid subscription.',
        isRecommended: true,
        website: 'https://bitwarden.com/',
      },
    ]
  },
  {
    category: "Home Launcher",
    apps: [
      {
        id: 'neolauncher',
        name: 'Neolauncher',
        description: 'Privacy-respecting Android launcher with customizable interface and no telemetry.',
        privacyFeatures: ['No telemetry', 'Open-source', 'Permission control'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'Limited advanced features compared to mainstream launchers.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Media Player",
    apps: [
      {
        id: 'vlc',
        name: 'VLC',
        description: 'Open-source multimedia player supporting virtually all media formats with privacy focus.',
        privacyFeatures: ['No tracking', 'No ads', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Occasional security updates needed for codec vulnerabilities.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "YouTube",
    apps: [
      {
        id: 'newpipe',
        name: 'NewPipe',
        description: 'Lightweight YouTube frontend that allows watching videos without Google services or tracking.',
        privacyFeatures: ['No Google services', 'Background playback', 'Download capability'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Can break when YouTube changes their API.',
        isRecommended: true,
        website: 'https://newpipe.net/',
      },
      {
        id: 'libretube',
        name: 'libreTube',
        description: 'Free and open source YouTube client using Piped API for enhanced privacy.',
        privacyFeatures: ['No ads', 'No tracking', 'Alternative API'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Relies on third-party instances that may have downtime.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Maps",
    apps: [
      {
        id: 'osmand',
        name: 'OsmAnd',
        description: 'Open-source mapping application using OpenStreetMap data with offline capabilities.',
        privacyFeatures: ['Offline maps', 'No tracking', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'More complex UI than some commercial alternatives.',
        isRecommended: true,
      },
      {
        id: 'organic-maps',
        name: 'Organic Maps',
        description: 'Privacy-focused offline maps app based on OpenStreetMap data with no tracking.',
        privacyFeatures: ['No ads', 'No tracking', 'Offline functionality'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Less detailed POI data than some commercial offerings.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Certificate Hash Viewer",
    apps: [
      {
        id: 'appverifier',
        name: 'AppVerifier',
        description: 'Tool to verify the authenticity of apps by checking their signature certificates.',
        privacyFeatures: ['Local verification', 'No network access', 'Signature checking'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Requires some technical knowledge to interpret results.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "2FA",
    apps: [
      {
        id: 'aegis-authenticator',
        name: 'Aegis Authenticator',
        description: 'Free, secure and open-source 2FA app for managing two-factor authentication tokens.',
        privacyFeatures: ['Encrypted vault', 'Export/import', 'Open-source'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'User responsible for managing backups of 2FA tokens.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Tor Routing",
    apps: [
      {
        id: 'orbot',
        name: 'Orbot',
        description: 'Proxy app that empowers other apps to use the Tor network for enhanced privacy.',
        privacyFeatures: ['Tor routing', 'App-specific routing', 'Anti-censorship'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Slower connections due to routing through Tor network.',
        isRecommended: true,
      },
    ]
  },
  {
    category: "Cryptography",
    apps: [
      {
        id: 'cryptool',
        name: 'Cryptool',
        description: 'Educational suite of applications for cryptography and cryptanalysis learning and experimentation.',
        privacyFeatures: ['Offline operation', 'Educational focus', 'Multiple encryption algorithms'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'Primarily educational; not all implementations suitable for production use.',
        isRecommended: false,
      },
    ]
  },
  {
    category: "Exploit Protection",
    apps: [
      {
        id: 'wasted',
        name: 'Wasted',
        description: 'Android security hardening tool to protect against various common exploit vectors.',
        privacyFeatures: ['Attack surface reduction', 'System hardening', 'Vulnerability mitigation'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'May cause compatibility issues with some applications.',
        isRecommended: true,
      },
      {
        id: 'sentry',
        name: 'Sentry',
        description: 'Security monitoring tool to detect and prevent potential exploit attempts.',
        privacyFeatures: ['Local monitoring', 'Privacy-focused', 'No cloud dependency'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Advanced features may require root access.',
        isRecommended: true,
      },
      {
        id: 'network-custom',
        name: 'Network (custom)',
        description: 'Custom network security solution for monitoring and filtering network traffic.',
        privacyFeatures: ['Traffic analysis', 'Connection filtering', 'Privacy protection'],
        securityRating: 5,
        privacyRating: 5,
        vulnerabilities: 'Complex setup requires technical networking knowledge.',
        isRecommended: true,
      },
      {
        id: 'private-lock',
        name: 'Private Lock',
        description: 'Physical security tool that locks device when unexpected movement is detected.',
        privacyFeatures: ['Physical security', 'Theft protection', 'Privacy guard'],
        securityRating: 4,
        privacyRating: 5,
        vulnerabilities: 'May trigger false positives in high-movement environments.',
        isRecommended: true,
      },
    ]
  }
];

const AppCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start">
          {/* App Icon */}
          <div className="w-16 h-16 bg-[#D0E4F5] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            {app.icon ? (
              <img src={app.icon} alt={app.name} className="w-10 h-10" />
            ) : (
              <Shield className="h-8 w-8 text-[#0E294B]" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {app.name}
              </h3>
              
              {app.isRecommended && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Recommended
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mb-1">{app.category}</p>
            
            <p className="text-gray-600 text-sm mb-3">
              {app.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div>
                  <span className="text-xs text-gray-500 block">Security</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#0E294B]">{app.securityRating}/5</span>
                    <Lock className="ml-1 h-3 w-3 text-[#0E294B]" />
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Privacy</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#0E294B]">{app.privacyRating}/5</span>
                    <Shield className="ml-1 h-3 w-3 text-[#0E294B]" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-[#0E294B] text-sm font-medium flex items-center hover:underline"
              >
                <Info className="mr-1 h-4 w-4" />
                {expanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Privacy Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {app.privacyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Potential Vulnerabilities</h4>
              <p className="text-sm text-gray-600">{app.vulnerabilities}</p>
            </div>
            
            {app.website && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Official Website</h4>
                <a 
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit developer website
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AppList = () => {
  return (
    <div className="space-y-10">
      {appCategories.map((category) => (
        <div key={category.category} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
          <div className="space-y-6">
            {category.apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppList;
