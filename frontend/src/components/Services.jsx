import React from 'react';
import { Wifi, Coffee, Map, Flame, Car, Home } from 'lucide-react';

const services = [
    { icon: <Wifi className="w-8 h-8" />, name: "High-Speed Connectivity", desc: "Stay connected even in the wilderness." },
    { icon: <Map className="w-8 h-8" />, name: "Guided Trekking", desc: "Explore hidden waterfalls and secret trails." },
    { icon: <Flame className="w-8 h-8" />, name: "Campfire Nights", desc: "Cozy evenings under the stars with local music." },
    { icon: <Coffee className="w-8 h-8" />, name: "Kerala Traditional Food", desc: "Authentic spices and flavors from local farms." },
    { icon: <Car className="w-8 h-8" />, name: "Pickup & Drop", desc: "Seamless transfers from airports and stations." },
    { icon: <Home className="w-8 h-8" />, name: "Private Cottages", desc: "Exclusive spaces designed for deep relaxation." },
];

export default function Services() {
    return (
        <section id="services" className="relative w-full py-24 px-4 bg-black/40 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-mist-white mb-4">
                        Curated <span className="text-emerald-light text-glow">Experiences</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                        Every moment at Aero Wayanad is crafted to rejuvenate your soul and ignite your sense of adventure.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {services.map((svc, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-emerald-dark/20 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-emerald-light group-hover:scale-110 group-hover:text-glow transition-all duration-300">
                                {svc.icon}
                            </div>
                            <h3 className="text-lg font-bold text-mist-white mb-2">{svc.name}</h3>
                            <p className="text-sm text-white/60 font-light">{svc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
