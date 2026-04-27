

export default function Footer() {
    return (
        <footer className="bg-[#2a221e] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                            <span className="bg-[#c48c5d] text-white px-3 py-1 rounded-lg">P</span>
                            <span className="tracking-widest uppercase text-sm">Brew & Co.</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Har cup mein ek naya swad aur har swad mein ek nayi kahani. Join us for the perfect coffee experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-[#c48c5d] text-xs font-bold uppercase tracking-widest">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="hover:text-white cursor-pointer transition-colors">Our Menu</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Coffee Beans</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Visit Store</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Brewing Guides</li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h4 className="text-[#c48c5d] text-xs font-bold uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms of Use</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact Support</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-[#c48c5d] text-xs font-bold uppercase tracking-widest">Stay Updated</h4>
                        <p className="text-sm text-gray-400">Subscribe for brewing tips & special offers.</p>
                        <div className="flex border-b border-gray-600 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-600"
                            />
                            <button className="text-[#c48c5d] font-bold text-xs uppercase tracking-widest ml-2">Join</button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">
                        © 2026 P Brew & Co. All rights reserved.
                    </p>

                    <div className="flex gap-8 text-gray-400">
                        {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                            <span key={social} className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-[#c48c5d] transition-colors">
                                {social}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}