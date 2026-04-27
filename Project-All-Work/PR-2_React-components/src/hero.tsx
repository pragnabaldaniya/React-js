
import heroImg from "./assets/hero1.webp";


export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0f0a08]">
            {/* Background Overlay for better text readability */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 hover:scale-100"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    filter: 'brightness(0.5)'
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-[1px] bg-[#c48c5d]"></span>
                        <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#c48c5d]">
                            Premium Artisan Roasts
                        </p>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
                        Wake up to <br />
                        <span className="italic font-light text-[#f3e5d8]">Better Coffee.</span>
                    </h1>

                    <p className="mt-8 text-gray-300 text-lg md:text-xl max-w-md leading-relaxed font-light">
                        Experience the rich aroma of hand-picked beans, roasted to perfection in our local micro-roastery.
                    </p>

                    <div className="mt-12 flex flex-wrap gap-5">
                        <button className="group relative bg-[#c48c5d] text-white px-8 py-4 rounded-full overflow-hidden font-bold text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(196,140,93,0.4)]">
                            Explore Menu
                        </button>

                        <button className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                            Our Story
                        </button>
                    </div>
                </div>

                {/* Stats / Info at bottom */}
                <div className="absolute bottom-10 left-6 flex gap-12 text-white/40 text-[10px] tracking-[0.3em] font-bold uppercase">
                    <div><span className="block text-[#c48c5d] mb-1">Origin</span> Ethiopia & Brazil</div>
                    <div><span className="block text-[#c48c5d] mb-1">Roast</span> Medium-Dark</div>
                    <div><span className="block text-[#c48c5d] mb-1">Vibe</span> 100% Cozy</div>
                </div>
            </div>
        </section>
    );
}