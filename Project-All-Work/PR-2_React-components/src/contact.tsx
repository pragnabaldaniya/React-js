
export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left Side: Info */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <p className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.4em]">Contact Us</p>
                            <h2 className="text-5xl font-serif text-[#2a221e]">Visit Our <br /> Coffee House</h2>
                            <p className="text-gray-500 max-w-sm leading-relaxed">
                                Ek pyali coffee aur dher saari baatein. Hum aapka intezaar kar rahe hain hamare Surat outlet par.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h4 className="font-bold text-[#2a221e] uppercase text-[10px] tracking-widest text-[#c48c5d]">Location</h4>
                                <p className="text-gray-600 text-sm">123 Brew Street, District 4, <br /> Surat, Gujarat.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-[#2a221e] uppercase text-[10px] tracking-widest text-[#c48c5d]">Contact</h4>
                                <p className="text-gray-600 text-sm">hello@pbrew.co <br /> +91 98765 43210</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-[#2a221e] uppercase text-[10px] tracking-widest text-[#c48c5d]">Hours</h4>
                                <p className="text-gray-600 text-sm">Mon - Fri: 08:00 - 20:00 <br /> Sat - Sun: 09:00 - 22:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Simple Form */}
                    <div className="bg-[#fdfaf7] p-10 rounded-[2rem]">
                        <form className="space-y-5">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#c48c5d] transition-all text-sm"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#c48c5d] transition-all text-sm"
                            />
                            <textarea
                                placeholder="How can we help?"
                                rows={4}
                                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#c48c5d] transition-all text-sm resize-none"
                            ></textarea>

                            <button className="pt-4 group flex items-center gap-3 text-[#2a221e] font-bold text-xs uppercase tracking-[0.2em]">
                                Send Message
                                <span className="w-8 h-8 rounded-full bg-[#2a221e] text-white flex items-center justify-center group-hover:bg-[#c48c5d] transition-all">
                                    →
                                </span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}