import React from 'react';

export default function About() {
    return (
        <section className="py-20 bg-[#fdfaf7]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Side: Image */}
                <div className="relative group">
                    <div className="rounded-2xl overflow-hidden shadow-xl border-[10px] border-white">
                        <img
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                            alt="Cafe Vibe"
                            className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-5 -right-5 bg-[#c48c5d] text-white p-6 rounded-2xl shadow-lg hidden md:block">
                        <p className="text-3xl font-bold">10+</p>
                        <p className="text-[10px] uppercase tracking-widest font-semibold">Years of Brewing</p>
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-[1.5px] bg-[#c48c5d]"></span>
                        <span className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.3em]">
                            Since 2016
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-[#2a221e] leading-tight">
                        Quality Coffee, <br />
                        <span className="italic text-gray-400">Roasted with Love.</span>
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        Hamara maqsad sirf ek cup coffee dena nahi, balki aapke din ko behtar banana hai. Hum chuninda kheti se beans laate hain aur unhe dhyan se roast karte hain taaki aapko har sip mein wahi purana aur asli swad mile.
                    </p>

                    <div className="pt-6 grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-[#2a221e] font-bold text-lg">Pure Organic</h4>
                            <p className="text-gray-500 text-sm mt-1">Directly sourced from the finest farms.</p>
                        </div>
                        <div>
                            <h4 className="text-[#2a221e] font-bold text-lg">Freshly Brewed</h4>
                            <p className="text-gray-500 text-sm mt-1">Ground only when you order.</p>
                        </div>
                    </div>

                    <button className="mt-8 bg-transparent border-b-2 border-[#c48c5d] pb-1 text-[#2a221e] font-bold text-sm uppercase tracking-widest hover:text-[#c48c5d] transition-all">
                        Read Full Story
                    </button>
                </div>

            </div>
        </section>
    );
}