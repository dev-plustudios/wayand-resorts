import React from 'react';
import ecoDomeImage from '../assets/OIP.webp';

const rooms = [
    {
        title: "Floating Villa",
        description: "Suspended among the tree canopy with panoramic valley views and a private plunge pool.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Eco Dome Suite",
        description: "Geodesic glass domes offering stargazing and a deep connection with the surrounding mist.",
        image: ecoDomeImage
    },
    {
        title: "Heritage Cottage",
        description: "Traditional Kerala architecture blended with modern smart-home amenities and private gardens.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export default function ResortShowcase() {
    return (
        <section id="resort" className="relative w-full py-24 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-mist-white mb-4">
                        Sanctuary <span className="text-emerald-light text-glow">Suites</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                        Immerse yourself in our meticulously designed accommodations where the line between indoors and nature blurs completely.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rooms.map((room, idx) => (
                        <div key={idx} className="glass-card rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-forest-green/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-mist-white mb-3 group-hover:text-emerald-light transition-colors">{room.title}</h3>
                                <p className="text-white/70 font-light leading-relaxed mb-6">{room.description}</p>
                                <div className="w-full h-[1px] bg-white/10 mb-6"></div>
                                <button className="text-emerald-light uppercase tracking-[0.2em] text-sm font-semibold hover:text-white transition-colors">
                                    View Details &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
