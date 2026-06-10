import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface Coin {
    id: string;
    market_cap_rank: number;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
}

export default function Dashboard() {
    const [allCoin, setAllCoin] = useState<Coin[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllCoin = async () => {
        const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;
        try {
            setLoading(true);
            const res = await axios.get(BASE_URL);
            if (res.status === 200) {
                setAllCoin(res.data);
                setError(null);
            }
        } catch (error) {
            console.error("Fetch All Coin Failed", error);
            setError("Failed to fetch data. Please try again later.");
            setAllCoin([]); // क्रैश से बचने के लिए खाली एरे सेट किया
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, []);

    // Optional chaining (?.) का उपयोग किया ताकि allCoin null होने पर भी ऐप क्रैश न हो
    const filteredCoins = allCoin?.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    ) || [];

    // Light Theme Loading State
    if (loading) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-screen bg-gray-50 text-gray-800 text-xl font-medium">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading Crypto Data...</span>
            </div>
        );
    }

    // Light Theme Error State
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 text-xl font-semibold p-4 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm max-w-md">
                    <p>{error}</p>
                    <button
                        onClick={fetchAllCoin}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Top Section: Heading Left, Searchbar Right */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-gray-200 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
                            Crypto Markets
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Top cryptocurrencies sorted by market capitalization
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="w-full sm:w-72 lg:w-80">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name or symbol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm transition-all"
                            />
                            {/* Simple Search Icon Graphic */}
                            <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table View - Light Theme */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-200">
                                <th className="py-4 px-6 font-semibold w-20">Rank</th>
                                <th className="py-4 px-6 font-semibold">Coin</th>
                                <th className="py-4 px-6 font-semibold">Symbol</th>
                                <th className="py-4 px-6 font-semibold text-right">Price (USD)</th>
                                <th className="py-4 px-6 font-semibold text-right">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {filteredCoins.length > 0 ? (
                                filteredCoins.map((coin) => (
                                    <tr
                                        key={coin.id}
                                        className="hover:bg-blue-50/40 transition-colors duration-150"
                                    >
                                        {/* Rank */}
                                        <td className="py-4 px-6 text-sm font-medium text-gray-400">
                                            #{coin.market_cap_rank}
                                        </td>

                                        {/* Coin Image + Name */}
                                        <td className="py-4 px-6 text-sm">
                                            <Link to={`/coin/${coin.id}`} className="flex items-center gap-3 group inline-flex">
                                                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full shadow-sm" />
                                                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {coin.name}
                                                </span>
                                            </Link>
                                        </td>

                                        {/* Symbol */}
                                        <td className="py-4 px-6 text-sm uppercase font-mono text-gray-500 font-medium">
                                            {coin.symbol}
                                        </td>

                                        {/* Price */}
                                        <td className="py-4 px-6 text-sm text-right font-bold text-gray-900">
                                            ${coin.current_price?.toLocaleString() ?? "0.00"}
                                        </td>

                                        {/* Market Cap */}
                                        <td className="py-4 px-6 text-sm text-right text-gray-600 font-medium">
                                            ${coin.market_cap?.toLocaleString() ?? "0"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">
                                        No coins found matching "{search}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}