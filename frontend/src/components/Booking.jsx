import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Booking() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', checkIn: '', checkOut: '',
        guests: '2', roomType: 'Floating Villa', specialRequests: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const roomPrices = {
        'Floating Villa': 15000,
        'Eco Dome Suite': 12000,
        'Heritage Cottage': 8000
    };

    const calculateTotal = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const date1 = new Date(formData.checkIn);
        const date2 = new Date(formData.checkOut);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) return 0;
        return diffDays * (roomPrices[formData.roomType] || 0);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending booking request...' });

        try {
            const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/booking`,
  {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    totalAmount: calculateTotal()
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Booking requested successfully! Check your email for confirmation.' });
                setFormData({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '2', roomType: 'Floating Villa', specialRequests: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to connect to the server.' });
        }
    };

    const estimatedTotal = calculateTotal();

    return (
        <section id="booking" className="relative w-full py-24 px-4 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full glass-card p-8 md:p-12 rounded-3xl border border-emerald-light/20 relative overflow-hidden">

                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-light/20 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                    <h2 className="text-4xl font-bold text-mist-white mb-2">Reserve Your <span className="text-emerald-light">Escape</span></h2>
                    <p className="text-white/70 font-light">Select your dates and we'll send a confirmation to your email.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-emerald-light mb-2">Full Name <span className="text-red-500">*</span></label>
                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm text-emerald-light mb-2">Email Address <span className="text-red-500">*</span></label>
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light transition-colors" placeholder="johndoe@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm text-emerald-light mb-2">Phone Number <span className="text-red-500">*</span></label>
                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light transition-colors" placeholder="+91 98765 43210" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-emerald-light mb-2">Check In <span className="text-red-500">*</span></label>
                                <input required type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light css-calendar-icon" />
                            </div>
                            <div>
                                <label className="block text-sm text-emerald-light mb-2">Check Out <span className="text-red-500">*</span></label>
                                <input required type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light css-calendar-icon" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-emerald-light mb-2">Guests <span className="text-red-500">*</span></label>
                                <select name="guests" value={formData.guests} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light">
                                    <option className="bg-forest-green" value="1">1 Person</option>
                                    <option className="bg-forest-green" value="2">2 People</option>
                                    <option className="bg-forest-green" value="3">3 People</option>
                                    <option className="bg-forest-green" value="4">4 People</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-emerald-light mb-2">Room Type <span className="text-red-500">*</span></label>
                                <select name="roomType" value={formData.roomType} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light">
                                    <option className="bg-forest-green" value="Floating Villa">Floating Villa</option>
                                    <option className="bg-forest-green" value="Eco Dome Suite">Eco Dome Suite</option>
                                    <option className="bg-forest-green" value="Heritage Cottage">Heritage Cottage</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-emerald-light mb-2">Special Requests</label>
                            <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows="2" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-light resize-none placeholder-white/30" placeholder="Any dietary requirements, celebrations..."></textarea>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-6 p-6 rounded-2xl bg-black/30 border border-emerald-light/30 flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <p className="text-emerald-light text-sm font-semibold uppercase tracking-widest mb-1">Estimated Total</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-mist-white">₹{estimatedTotal.toLocaleString()}</p>
                                <p className="text-xs text-white/50">(Taxes extra)</p>
                            </div>
                            <p className="text-sunset-orange text-xs mt-2 font-medium">⚠️ Payment to be completed at the property on check-in day.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className="mt-6 md:mt-0 px-8 py-4 rounded-full bg-emerald-gradient text-white font-bold text-lg shadow-[0_0_20px_rgba(63,163,77,0.4)] hover:shadow-[0_0_30px_rgba(63,163,77,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {status.type === 'loading' ? 'Processing...' : 'Request Booking'}
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {status.message && (
                        <div className={`col-span-1 md:col-span-2 p-4 mt-2 rounded-xl text-center text-sm font-medium ${status.type === 'success' ? 'bg-emerald-light/20 text-emerald-light border border-emerald-light/50' : 'bg-red-500/20 text-red-200 border border-red-500/50'}`}>
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
