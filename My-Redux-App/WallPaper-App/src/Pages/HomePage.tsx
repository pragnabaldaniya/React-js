import axios from "axios";
import { useEffect, useState } from "react";

interface WallPaperHit {
    id: number,
    largeImageURL: string,
    tags: string,
    userImageURL: string,
    user: string,
    type: string,
    views: number,
    downloads: number,
    likes: number,
    comment: number
}

export default function HomePage() {
    const [allHits, setAllHits] = useState<WallPaperHit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchAllWallpaper();
    }, []);

    const fetchAllWallpaper = async () => {
        const wallPaperAPI = `https://pixabay.com/api/?key=55640430-9a37a6661afc6a98888c358fb&q=${search}`;

        setLoading(true);

        try {
            const res = await axios.get(wallPaperAPI);

            if (res.status === 200) {
                console.log("Response : ", res.data);
                setAllHits(res.data.hits);

                setLoading(false);
            }
        } catch (e) {
            console.log("Something went wrong", e);
        }

    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Hero Section with Glassmorphism Search */}
            <div className="relative h-[400px] flex items-center justify-center bg-indigo-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        The web’s highest quality <br /> {search} open source images.
                    </h1>
                    <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/20 p-2 rounded-2xl border border-white/30 shadow-2xl">
                        <div>
                            <input
                                type="text"
                                placeholder="Search for high-resolution wallpapers..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border-none rounded-xl py-4 px-6 text-gray-800 focus:ring-0 outline-none shadow-inner"
                            />

                            <button onClick={() => fetchAllWallpaper()} className="bg-blue-400 m-2 p-2 border rounded">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 py-12">

                {/* Modern Masonry-inspired Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {allHits.map((wallpaper) => (
                            <div
                                key={wallpaper.id}
                                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Image */}
                                <img
                                    src={wallpaper.largeImageURL}
                                    alt={wallpaper.tags}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                                {/* Interactive Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                                    <div className="flex justify-end">
                                        <button className="bg-white/20 backdrop-blur-md p-2 rounded-lg text-white hover:bg-white/40 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white">
                                            <img src={wallpaper.userImageURL || 'https://via.placeholder.com/30'} className="w-8 h-8 rounded-full border border-white/50" alt="" />
                                            <span className="text-sm font-medium truncate max-w-[100px]">{wallpaper.user}</span>
                                        </div>
                                        <a
                                            href={wallpaper.largeImageURL}
                                            download
                                            target="_blank"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-500 transition-colors"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}