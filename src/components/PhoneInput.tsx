import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Country {
  code: string;   // e.g. "+91"
  iso: string;    // e.g. "IN"
  name: string;   // e.g. "India"
  flag: string;   // emoji
}

export const COUNTRIES: Country[] = [
  { code: '+1',   iso: 'US', name: 'United States',    flag: '🇺🇸' },
  { code: '+1',   iso: 'CA', name: 'Canada',            flag: '🇨🇦' },
  { code: '+44',  iso: 'GB', name: 'United Kingdom',    flag: '🇬🇧' },
  { code: '+91',  iso: 'IN', name: 'India',             flag: '🇮🇳' },
  { code: '+61',  iso: 'AU', name: 'Australia',         flag: '🇦🇺' },
  { code: '+49',  iso: 'DE', name: 'Germany',           flag: '🇩🇪' },
  { code: '+33',  iso: 'FR', name: 'France',            flag: '🇫🇷' },
  { code: '+81',  iso: 'JP', name: 'Japan',             flag: '🇯🇵' },
  { code: '+86',  iso: 'CN', name: 'China',             flag: '🇨🇳' },
  { code: '+55',  iso: 'BR', name: 'Brazil',            flag: '🇧🇷' },
  { code: '+7',   iso: 'RU', name: 'Russia',            flag: '🇷🇺' },
  { code: '+82',  iso: 'KR', name: 'South Korea',       flag: '🇰🇷' },
  { code: '+39',  iso: 'IT', name: 'Italy',             flag: '🇮🇹' },
  { code: '+34',  iso: 'ES', name: 'Spain',             flag: '🇪🇸' },
  { code: '+31',  iso: 'NL', name: 'Netherlands',       flag: '🇳🇱' },
  { code: '+46',  iso: 'SE', name: 'Sweden',            flag: '🇸🇪' },
  { code: '+47',  iso: 'NO', name: 'Norway',            flag: '🇳🇴' },
  { code: '+45',  iso: 'DK', name: 'Denmark',           flag: '🇩🇰' },
  { code: '+41',  iso: 'CH', name: 'Switzerland',       flag: '🇨🇭' },
  { code: '+43',  iso: 'AT', name: 'Austria',           flag: '🇦🇹' },
  { code: '+32',  iso: 'BE', name: 'Belgium',           flag: '🇧🇪' },
  { code: '+351', iso: 'PT', name: 'Portugal',          flag: '🇵🇹' },
  { code: '+48',  iso: 'PL', name: 'Poland',            flag: '🇵🇱' },
  { code: '+90',  iso: 'TR', name: 'Turkey',            flag: '🇹🇷' },
  { code: '+966', iso: 'SA', name: 'Saudi Arabia',      flag: '🇸🇦' },
  { code: '+971', iso: 'AE', name: 'UAE',               flag: '🇦🇪' },
  { code: '+65',  iso: 'SG', name: 'Singapore',         flag: '🇸🇬' },
  { code: '+60',  iso: 'MY', name: 'Malaysia',          flag: '🇲🇾' },
  { code: '+62',  iso: 'ID', name: 'Indonesia',         flag: '🇮🇩' },
  { code: '+63',  iso: 'PH', name: 'Philippines',       flag: '🇵🇭' },
  { code: '+66',  iso: 'TH', name: 'Thailand',          flag: '🇹🇭' },
  { code: '+84',  iso: 'VN', name: 'Vietnam',           flag: '🇻🇳' },
  { code: '+880', iso: 'BD', name: 'Bangladesh',        flag: '🇧🇩' },
  { code: '+92',  iso: 'PK', name: 'Pakistan',          flag: '🇵🇰' },
  { code: '+94',  iso: 'LK', name: 'Sri Lanka',         flag: '🇱🇰' },
  { code: '+977', iso: 'NP', name: 'Nepal',             flag: '🇳🇵' },
  { code: '+20',  iso: 'EG', name: 'Egypt',             flag: '🇪🇬' },
  { code: '+27',  iso: 'ZA', name: 'South Africa',      flag: '🇿🇦' },
  { code: '+234', iso: 'NG', name: 'Nigeria',           flag: '🇳🇬' },
  { code: '+254', iso: 'KE', name: 'Kenya',             flag: '🇰🇪' },
  { code: '+52',  iso: 'MX', name: 'Mexico',            flag: '🇲🇽' },
  { code: '+54',  iso: 'AR', name: 'Argentina',         flag: '🇦🇷' },
  { code: '+56',  iso: 'CL', name: 'Chile',             flag: '🇨🇱' },
  { code: '+57',  iso: 'CO', name: 'Colombia',          flag: '🇨🇴' },
  { code: '+64',  iso: 'NZ', name: 'New Zealand',       flag: '🇳🇿' },
];

interface Props {
  value: string;
  onChange: (fullNumber: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ value, onChange, placeholder = '9876543210' }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find(c => c.iso === 'IN') || COUNTRIES[0]
  );
  const [number, setNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.value.replace(/\D/g, '');
    setNumber(n);
    onChange(`${selectedCountry.code}${n}`);
  };

  const selectCountry = (c: Country) => {
    setSelectedCountry(c);
    onChange(`${c.code}${number}`);
    setOpen(false);
    setSearch('');
  };

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search) ||
    c.iso.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', marginBottom: 14 }} ref={dropRef}>
      <div style={{ display: 'flex', gap: 8 }}>
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '11px 12px', borderRadius: 10, flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${open ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: '#f1f5f9', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 14, transition: 'border-color 0.2s',
          }}
        >
          <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedCountry.code}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 9, opacity: 0.5 }}
          >▼</motion.span>
        </button>

        {/* Number input */}
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          placeholder={placeholder}
          style={{
            flex: 1, padding: '11px 14px', borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#f1f5f9', fontSize: 14, outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              width: '100%', zIndex: 1000,
              background: 'rgba(15,15,26,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            {/* Search */}
            <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search country..."
                autoFocus
                style={{
                  width: '100%', padding: '7px 10px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f1f5f9', fontSize: 12, outline: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* List */}
            <div style={{ maxHeight: 220, overflowY: 'auto' }}>
              {filtered.map(c => (
                <motion.button
                  key={`${c.iso}-${c.code}`}
                  type="button"
                  onClick={() => selectCountry(c)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '9px 14px',
                    background: selectedCountry.iso === c.iso ? 'rgba(124,58,237,0.15)' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{c.flag}</span>
                  <span style={{ fontSize: 13, color: '#f1f5f9', flex: 1 }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)', fontWeight: 600 }}>{c.code}</span>
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '12px 14px', fontSize: 12, color: 'rgba(241,245,249,0.4)', textAlign: 'center' }}>
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
