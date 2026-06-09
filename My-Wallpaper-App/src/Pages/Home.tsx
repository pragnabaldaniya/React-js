import axios from "axios";
import { useEffect, useState } from "react"

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
    comments: number
}

export default function Home() {

    const [allHits, setAllHits] = useState<WallPaperHit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [liveSearch, setLiveSearch] = useState<string>('');



    useEffect(() => {
        fetchAllWallpaper();
    }, [liveSearch]);


    const apiKey = "55655519-4fe167e08e129d414f2c150ca";
    const api = `https://pixabay.com/api/?key=${apiKey}&q=${liveSearch}`;

    const fetchAllWallpaper = async () => {
        const wallPaperAPI = (api);

        console.log(wallPaperAPI);



        setLoading(true);

        try {
            const response = await axios.get(wallPaperAPI);

            if (response.status === 200) {

                console.log("Response : ", response.data);

                setAllHits(response.data.hits);

                setLoading(false);

                console.log("HITS DATA:", response.data.hits);
            }
        } catch (error) {
            console.log("Something went wrong..", error);

        }

    };





    return (
        <div className="min-h-screen bg-white">
            {/* Simplified Hero Section - Ab yahan search bar nahi hai */}
            <div className="relative h-[300px] flex items-center justify-center bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                    <img
                        src="https://images.unsplash.com/photo-1493119508027-2b584f234d6c?q=80&w=2000"
                        className="w-full h-full object-cover grayscale"
                        alt="Hero Background"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {liveSearch ? `Results for "${liveSearch}"` : "Stunning Free Stock Photos"}
                    </h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">
                        The internet’s source for visuals. Powered by creators everywhere.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">

                {/* Quick Filter Tags (Optional but looks great) */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    {['Nature', 'Architecture', 'Business', 'Technology', 'Travel'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => { setLiveSearch(tag); }}
                            className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-black transition-all"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="mb-4 w-full h-72 bg-gray-100 animate-pulse rounded-sm"></div>
                        ))}
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {allHits.map((wallpaper) => (
                            <div
                                key={wallpaper.id}
                                className="break-inside-avoid relative group cursor-zoom-in"
                            >
                                {/* Image with Soft Border */}
                                <img
                                    src={wallpaper.largeImageURL}
                                    alt={wallpaper.tags}
                                    className="w-full h-auto transition-all duration-300 group-hover:brightness-90"
                                    loading="lazy"
                                />

                                {/* Simple Dark Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                                    <div className="flex justify-end">
                                        <button className="bg-white/90 p-2 rounded shadow-sm hover:bg-white">
                                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <img src={wallpaper.userImageURL || 'https://via.placeholder.com/32'} className="w-8 h-8 rounded-full" alt="" />
                                            <span className="text-white text-sm font-medium truncate">{wallpaper.user}</span>
                                        </div>
                                        <a
                                            href={wallpaper.largeImageURL}
                                            download
                                            target="_blank"
                                            className="bg-white/90 text-gray-900 px-3 py-1.5 rounded text-xs font-bold hover:bg-white"
                                        >
                                            ↓
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
