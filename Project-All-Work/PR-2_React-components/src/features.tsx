
export default function Features() {
    const features = [
        {
            title: "Premium Beans",
            desc: "Hum duniya ke sabse acche kheti se chuninda beans laate hain.",
            icon: "☕"
        },
        {
            title: "Expert Barista",
            desc: "Hamare baristas ko perfection ke saath coffee banane ki maharat hai.",
            icon: "👨‍🍳"
        },
        {
            title: "Cozy Space",
            desc: "Kaam ho ya doston ke saath baatein, hamara mahol hamesha sukoon deta hai.",
            icon: "🏠"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Section Header */}
                <div className="mb-16 space-y-4">
                    <p className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.4em]">Why Choose Us</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2a221e]">What Makes Us Special</h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-10 rounded-3xl bg-[#fdfaf7] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group"
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#2a221e] mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Decorative Line */}
                <div className="mt-20 flex justify-center">
                    <div className="w-24 h-[1px] bg-gray-200"></div>
                </div>
            </div>
        </section>
    );
}