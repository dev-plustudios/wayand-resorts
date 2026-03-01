import React, { Suspense } from 'react';
import Scene from '../components/Scene';
import Hero from '../components/Hero';
import About from '../components/About';
import ResortShowcase from '../components/ResortShowcase';
import Services from '../components/Services';
import Booking from '../components/Booking';

export default function Home() {
    return (
        <main className="relative w-full min-h-screen bg-forest-green overflow-x-hidden">

            {/* Fixed Background Context (WebGL) */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-emerald-light">Loading Experience...</div>}>
                    <Scene />
                </Suspense>
            </div>

            {/* Scrollable Foreground Content */}
            <div className="relative z-10 pointer-events-auto">
                <Hero />
                <About />
                <ResortShowcase />
                <Services />
                <Booking />

                <footer className="w-full py-12 glass-panel border-t border-white/10 text-center">
                    <div className="flex flex-col items-center justify-center text-white/60 mb-4">
                        <h2 className="text-2xl font-bold tracking-widest text-mist-white mb-2">AERO WAYANAD</h2>
                        <p className="italic text-emerald-light text-sm">Where Nature Floats Beyond Luxury</p>
                    </div>
                    <p className="text-xs">&copy; {new Date().getFullYear()} Aero Wayanad. All Rights Reserved. Crafted by Antigravity.</p>
                </footer>
            </div>

        </main>
    );
}
