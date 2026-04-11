import { useState } from "react";

export default function App() {
  const items = [
    {
      name: "Space",
      desc: "Space is vast and full of mysteries like stars, planets, and galaxies.",
      img: "/space.jpg",
      bg: "/bg1.avif",
    },
    {
      name: "Ocean",
      desc: "Oceans cover 70% of Earth and are home to amazing marine life.",
      img: "/ocean.png",
      bg: "/bg2.jpg",
    },
    {
      name: "AI",
      desc: "Artificial Intelligence is shaping the future with smart technology.",
      img: "/ai.avif",
      bg: "/bg3.jpg",
    },
    {
      name: "Nature",
      desc: "Nature gives us peace, beauty, and life through forests and mountains.",
      img: "/nature.png",
      bg: "/bg4.jpg",
    },
  ];

  
  const [active, setActive] = useState(items[0]);

  return (
    <div
      style={{
        backgroundImage: `url(${active.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "0.7s",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-[90%] max-w-xl text-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-10 shadow-2xl text-white">

          <img
            src={active.img}
            alt={active.name}
            className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-white/30"
          />

          <h1 className="text-3xl font-bold mb-4">{active.name}</h1>

          <p className="text-gray-200 text-sm leading-relaxed">
            {active.desc}
          </p>

          <div className="flex justify-center gap-5 mt-10 flex-wrap">
            {items.map((item) => (
              <div
                key={item.name}
                onClick={() => setActive(item)}
                className={`
                  h-16 w-16 rounded-full overflow-hidden cursor-pointer
                  border-4 shadow-lg transition-all duration-300
                  ${
                    active.name === item.name
                      ? "scale-110 border-white ring-4 ring-white/30"
                      : "border-white/40 grayscale hover:scale-105"
                  }
                `}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}