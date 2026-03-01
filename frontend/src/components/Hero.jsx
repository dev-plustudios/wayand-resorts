import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl glass-card p-10 md:p-16 rounded-3xl"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-mist-white mb-4 tracking-tight">
                    Where Nature <br />
                    <span className="text-transparent bg-clip-text bg-emerald-gradient text-glow">Floats Beyond Luxury</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light">
                    Experience the untamed beauty of Wayanad hills combined with futuristic eco-luxury, suspended in perfect harmony.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#booking" className="px-8 py-4 rounded-full bg-emerald-gradient text-white font-bold text-lg shadow-[0_0_20px_rgba(63,163,77,0.5)] hover:scale-105 transition-transform duration-300">
                        Reserve Your Stay
                    </a>
                    <a href="#about" className="px-8 py-4 rounded-full glass-panel text-white font-medium hover:bg-white/10 transition-colors duration-300">
                        Explore the Magic
                    </a>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
            >
                <span className="text-xs uppercase tracking-[0.2em] mb-2 text-emerald-light">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-light to-transparent"></div>
            </motion.div>
        </section>
    );
}
