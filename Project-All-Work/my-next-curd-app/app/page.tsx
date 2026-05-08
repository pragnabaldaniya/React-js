import Card from "./components/Card";
import Slider from "./components/Slider";

export default function Home() {
  const cardViewData = [
    {
      title: "Performance Engines",
      description: "Experience the raw power of high-octane V8 and V12 engines tuned for the track.",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Electric Future",
      description: "Sustainable power meets extreme torque. Explore the next generation of EV supercars.",
      image: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Luxury Interiors",
      description: "Premium leather, ambient lighting, and state-of-the-art cockpit technology.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Aerodynamics",
      description: "Crafted for speed. Every curve is designed to cut through the wind with precision.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Smart Inventory",
      description: "Seamlessly manage your fleet with our advanced tracking and pricing systems.",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-black pb-20">
      <Slider />

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="mb-12 text-center md:text-left">
          <span className="text-teal-500 font-bold tracking-[0.3em] text-xs uppercase">Premium Collection</span>
          <h2 className="text-4xl font-black text-white italic mt-2">FEATURED <span className="text-teal-400">SPECS</span></h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          {cardViewData.map((cardData, index) => (
            <Card
              key={index}
              title={cardData.title}
              description={cardData.description}
              image={cardData.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
}