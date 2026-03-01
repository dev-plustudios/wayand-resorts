import React from 'react';
import peakImage from '../assets/View-At-The-Peak.jpg';

export default function About() {
    return (
        <section id="about" className="relative w-full py-24 px-4 min-h-screen flex items-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="glass-panel p-8 rounded-3xl" data-aos="fade-right">
                    <h2 className="text-4xl md:text-5xl font-bold text-mist-white mb-6">
                        Discover <span className="text-emerald-light text-glow">Wayanad's</span> Soul
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-6 font-light">
                        Nestled in the pristine hills of Kerala, Aero Wayanad offers an escape into nature without compromising on modern luxury. Wake up to the whispers of pine trees, misty mornings rolling over Chembra Peak, and the untouched beauty of the Western Ghats.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                        Our eco-luxury resort is thoughtfully integrated into the landscape. From our suspended forest decks to infinity pools overlooking tea plantations, every element is designed to connect you deeply with the environment.
                    </p>
                </div>

                {/* Image Display */}
                <div className="relative h-[500px] w-full rounded-3xl overflow-hidden glass-card group" data-aos="fade-left">
                    {/* We will use real images from Wayanad. Using a placeholder for now that fits the theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-green to-transparent z-10 opacity-60"></div>
                    <img
                        src={peakImage}
                        alt="View At The Peak Wayanad"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-2xl font-bold text-white mb-2 text-glow">Chembra Peak View</h3>
                        <p className="text-emerald-light">Exclusive access to premier trails</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
