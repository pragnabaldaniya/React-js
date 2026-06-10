import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';

interface CoinDetail {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    image: { large: string };
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
        high_24h: { usd: number };
        low_24h: { usd: number };
        price_change_percentage_24h: number;
    };
}

export default function CoinDetail() {
    const { id } = useParams<{ id: string }>();
    const [coin, setCoin] = useState<CoinDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoinDetail = async () => {
            const DETAIL_URL = `https://api.coingecko.com/api/v3/coins/${id}`;
            try {
                setLoading(true);
                const res = await axios.get(DETAIL_URL);
                if (res.status === 200) {
                    setCoin(res.data);
                    setError(null);
                }
            } catch (err) {
                console.error("Fetch Coin Detail Failed", err);
                setError("Failed to fetch data / Coin not found");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCoinDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gray-50 text-gray-600 text-sm font-medium">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading Coin Details...</span>
            </div>
        );
    }

    if (error || !coin) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
                <div className="bg-white border border-red-100 rounded-xl p-6 shadow-sm text-center max-w-xs">
                    <p className="text-sm font-medium text-red-600">{error || "Coin not found"}</p>
                    <Link to="/" className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:underline">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const isPriceUp = coin.market_data.price_change_percentage_24h >= 0;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8 flex justify-center items-start">
            <div className="w-full max-w-4xl mt-4">

                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 mb-6 transition-colors group"
                >
                    <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                {/* Main Content Card: Responsive Grid Layout */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Coin Identity & Profile */}
                    <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                            Rank #{coin.market_cap_rank || "N/A"}
                        </span>

                        <img
                            src={coin.image.large}
                            alt={coin.name}
                            className="w-20 h-20 rounded-full bg-gray-50 p-1 shadow-sm mb-4"
                        />

                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{coin.name}</h1>
                        <p className="text-xs uppercase font-mono text-gray-400 font-semibold mt-0.5">{coin.symbol}</p>

                        <div className="mt-6 border-t border-gray-50 pt-4 w-full text-center md:text-left">
                            <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Current Price</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">
                                ${coin.market_data.current_price.usd.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Market Information Grid */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                                Market Statistics
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Market Cap */}
                                <div className="bg-gray-50/50 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-100 transition-colors">
                                    <p className="text-xs text-gray-400 font-semibold">Market Cap</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1">
                                        ${coin.market_data.market_cap.usd.toLocaleString()}
                                    </p>
                                </div>

                                {/* Total Volume */}
                                <div className="bg-gray-50/50 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-100 transition-colors">
                                    <p className="text-xs text-gray-400 font-semibold">Total Volume</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1">
                                        ${coin.market_data.total_volume.usd.toLocaleString()}
                                    </p>
                                </div>

                                {/* High 24H */}
                                <div className="bg-gray-50/50 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-100 transition-colors">
                                    <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> High (24H)
                                    </p>
                                    <p className="text-sm font-bold text-gray-900 mt-1">
                                        ${coin.market_data.high_24h.usd.toLocaleString()}
                                    </p>
                                </div>

                                {/* Low 24H */}
                                <div className="bg-gray-50/50 hover:bg-gray-50 p-3.5 rounded-xl border border-gray-100 transition-colors">
                                    <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Low (24H)
                                    </p>
                                    <p className="text-sm font-bold text-gray-900 mt-1">
                                        ${coin.market_data.low_24h.usd.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Price Change Row */}
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500">Price Change (24H)</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${isPriceUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                                }`}>
                                {isPriceUp ? '▲' : '▼'} {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}