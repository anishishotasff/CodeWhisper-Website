import React from 'react';

interface Props {
  size?: number;
  id?: string;
}

export default function Logo({ size = 28, id = 'logo' }: Props) {
  const gradId = `logobg-${id}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="50%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="72" height="52" rx="14" ry="14" fill={`url(#${gradId})`}/>
      <path d="M28 60 L22 76 L42 64 Z" fill={`url(#${gradId})`}/>
      <polyline points="28,28 20,34 28,40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="40" y1="22" x2="48" y2="46" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      <polyline points="60,28 68,34 60,40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="86" cy="18" r="4" fill="#06b6d4" opacity="0.9"/>
      <circle cx="78" cy="10" r="3" fill="#3b82f6" opacity="0.8"/>
      <circle cx="82" cy="62" r="4" fill="#7c3aed" opacity="0.8"/>
    </svg>
  );
}
