
export default function Menu() {
    const menuItems = [
        {
            name: "Caramel Macchiato",
            price: "$5.50",
            desc: "Fresh espresso with creamy milk and caramel drizzle.",
            image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "Dark Roast Espresso",
            price: "$4.00",
            desc: "Strong, bold, and perfectly balanced single shot.",
            image: "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGFyayUyMHJvYXN0JTIwZXNwcmVzc298ZW58MHx8MHx8fDA%3D"
        },
        {
            name: "Iced Vanilla Latte",
            price: "$6.00",
            desc: "Smooth vanilla syrup mixed with cold brew and ice.",
            image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "Classic Cappuccino",
            price: "$4.50",
            desc: "Equal parts of espresso, steamed milk, and foam.",
            image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400"
        }
    ];

    return (
        <section className="py-24 bg-[#fdfaf7]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <p className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.4em]">Our Best Sellers</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2a221e]">Popular Menu</h2>
                    </div>
                    <button className="text-[#c48c5d] font-bold text-sm uppercase tracking-widest border-b-2 border-[#c48c5d] pb-1 hover:text-[#2a221e] hover:border-[#2a221e] transition-all">
                        View Full Menu
                    </button>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menuItems.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                                    <span className="text-[#2a221e] font-bold text-sm">{item.price}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 px-2">
                                <h3 className="text-xl font-bold text-[#2a221e] group-hover:text-[#c48c5d] transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <p className="mt-16 text-center text-gray-400 text-sm italic">

                </p>
            </div>
        </section>
    );
}