'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
    id: number;
    title: string;
    highlightWord: string;
    subtitle: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "EMBRACE THE",
        highlightWord: "FUTURE",
        subtitle: "FUTURE LINE",
        description: "Engineered for those who don’t follow roads — they create them. Precision handling, aggressive power, and a presence that speaks before you arrive.",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "OWN THE",
        highlightWord: "STREETS",
        subtitle: "MIDNIGHT EDITION",
        description: "Sleek design meets raw performance. Built to glide through the city with confidence, control, and undeniable attitude.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        title: "FEEL THE",
        highlightWord: "POWER",
        subtitle: "APEX COLLECTION",
        description: "Every curve crafted for speed, every detail built for dominance. This is not just a car — it’s a statement of strength.",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop&q=80",
    }
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Slides Mapping */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image with Right Alignment & Gradient Fade */}
                    <div className="absolute inset-0 flex justify-end">
                        <div className="relative w-full md:w-3/4 h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                            />
                            {/* Dark Overlays for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Content Section (Left Side) */}
                    <div className="absolute inset-0 flex items-center z-20">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="h-[2px] w-10 bg-emerald-500"></span>
                                    <span className="text-teal-500 font-bold tracking-[0.2em] text-sm md:text-base">
                                        {slide.subtitle}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-6xl font-black text-white leading-tight mb-4">
                                    {slide.title} <br />
                                    <span className="text-teal-500">{slide.highlightWord}</span>
                                </h1>

                                <div className="pl-1 border-l-2 border-gray-800">
                                    <p className="text-gray-400 text-lg md:text-xl max-w-md ml-4">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom Navigation Controls */}
            <div className="absolute bottom-10 left-6 md:left-20 z-30 flex items-center gap-8">
                {/* Navigation Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 text-white p-4 rounded-md transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 text-white p-4 rounded-md transition-all active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Slider Indicators (The 01 --- 03 part) */}
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-gray-500 font-mono text-sm">0{currentSlide + 1}</span>
                    <div className="w-32 h-[2px] bg-gray-800 relative">
                        <div
                            className="absolute h-full bg-teal-500 transition-all duration-500"
                            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-gray-500 font-mono text-sm">0{slides.length}</span>
                </div>
            </div>
        </div>
    );
}