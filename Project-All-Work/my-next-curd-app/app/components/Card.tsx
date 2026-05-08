type cardPropsType = {
    title: string,
    description: string,
    image: string
}

export default function Card({ title, description, image }: cardPropsType) {
    return (
        <div className="group relative block max-w-sm w-full sm:w-[350px] bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-800 hover:border-teal-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
            {/* Image Container with smooth zoom */}
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60"></div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="p-8 relative z-20">
                <div className="w-12 h-1 bg-teal-500 mb-6 rounded-full transition-all duration-500 group-hover:w-24"></div>

                <h5 className="mb-3 text-2xl font-black tracking-tight text-white group-hover:text-teal-400 transition-colors duration-300 uppercase italic">
                    {title}
                </h5>

                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {description}
                </p>

                {/* Floating "Learn More" or Glow bar */}
                <div className="mt-6 flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Explore Details
                    <span className="text-lg">→</span>
                </div>
            </div>

            {/* Bottom Neon Line Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
}