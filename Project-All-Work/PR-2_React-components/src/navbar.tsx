
export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
            <div className="bg-[#1a1310]/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl px-8 py-4 flex items-center justify-between">

                {/* Logo with P */}
                <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
                    <a href="#" className="flex items-center gap-2 ...">
                        <span className="bg-[#c48c5d] ... px-3 py-0.5 rounded">P</span>
                        <span>Brew & Co.</span>
                    </a>
                </div>

                {/* Nav Links */}
                <ul className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] text-gray-300">
                    {['HOME', 'ABOUT', 'SERVICES', 'MENU', 'GALLERY'].map((item) => (
                        <li key={item} className="relative h-5 overflow-hidden cursor-pointer group">
                            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                                {item}
                            </span>
                            <span className="block absolute left-0 top-full transition-transform duration-500 group-hover:-translate-y-full text-[#c48c5d]">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Reservation Button */}
                <a href="#contact">
                    <button className="bg-[#c48c5d] ...  text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#a6734a] transition-all duration-300">
                        Book a Table
                    </button>
                </a>

            </div>
        </nav>
    );
}