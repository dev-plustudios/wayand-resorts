import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Wayanad', href: '#about' },
    { name: 'Resort', href: '#resort' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(63,163,77,0.4)]">
              <Leaf className="text-emerald-light w-6 h-6 z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-mist-white leading-tight">AERO</span>
              <span className="text-[10px] tracking-[0.2em] text-emerald-light font-medium uppercase">Wayanad</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-emerald-light hover:text-glow transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a href="#booking" className="px-5 py-2 rounded-full bg-emerald-gradient text-white font-semibold shadow-[0_0_20px_rgba(63,163,77,0.4)] hover:shadow-[0_0_30px_rgba(63,163,77,0.6)] hover:scale-105 transition-all duration-300">
              Book Now
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-emerald-light">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel absolute top-full left-0 w-full flex flex-col items-center py-6 space-y-4 border-t border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-emerald-light font-medium"
            >
              {link.name}
            </a>
          ))}
          <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="px-6 py-2 rounded-full bg-emerald-gradient text-white font-semibold mt-4">
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
