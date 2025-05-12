"use client";

import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const patternStyle = {
    backgroundImage: `
      linear-gradient(to bottom right, #e6f0ff, white, #e0ecff),
      radial-gradient(#2563eb 0.3px, transparent 0.3px)
    `,
    backgroundSize: '100% 100%, 18px 18px',
    backgroundPosition: '0 0, 0 0',
    backgroundBlendMode: 'normal, color-burn',
    opacity: 0.75
  };

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 -z-10" 
        style={patternStyle}
      />
      {children}
    </div>
  );
}
