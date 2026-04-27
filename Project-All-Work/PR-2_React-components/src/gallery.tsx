
import img1 from "./assets/gallery0.avif";
import img2 from "./assets/gallery2.avif"
import img3 from "./assets/gallery3.avif"
import img4 from "./assets/gallery4.avif"
import img5 from "./assets/gallery1.avif"

export default function Gallery() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.4em]">Our Vibe</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2a221e]">Snapshots from the Cafe</h2>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">

                    {/* Image 1 - Large Vertical */}
                    <div className="md:row-span-2 md:col-span-1 bg-gray-100 rounded-3xl overflow-hidden group relative">
                        <img
                            src={img1}
                            alt="Gallery 1"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    </div>

                    {/* Image 2 - Horizontal */}
                    <div className="md:col-span-2 bg-gray-100 rounded-3xl overflow-hidden group relative">
                        <img
                            src={img2}
                            alt="Gallery 2"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    </div>

                    {/* Image 3 - Small Square */}
                    <div className="md:col-span-1 bg-gray-100 rounded-3xl overflow-hidden group relative">
                        <img
                            src={img3}
                            alt="Gallery 3"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    </div>

                    {/* Image 4 - Small Square */}
                    <div className="md:col-span-1 bg-gray-100 rounded-3xl overflow-hidden group relative">
                        <img
                            src={img4}
                            alt="Gallery 4"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    </div>

                    {/* Image 5 - Medium Horizontal */}
                    <div className="md:col-span-2 bg-gray-100 rounded-3xl overflow-hidden group relative">
                        <img
                            src={img5}
                            alt="Gallery 5"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                    </div>

                </div>

                {/* Instagram CTA */}
                <div className="mt-16 text-center">
                    <button className="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c48c5d] transition-all duration-300">
                        Follow us on Instagram
                    </button>
                </div>
            </div>
        </section>
    );
}