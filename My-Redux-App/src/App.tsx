import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./app/store";
import { decrement, increment, reset } from "./features/counter/counterSlice";
import Header from "./components/Header";

export default function App() {

  const counter = useSelector((state: RootState) => state.counterReducer.counter);
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();


  return <>
    {/* Premium Background Wrapper */}
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'dark bg-[#030712]' : 'bg-white'
      }`}>

      {/* Animated Background Blobs (Optional for extra "Premium" feel) */}
      < div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-indigo-900/20" ></div >
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-purple-900/20"></div>

      <Header />

      <main className="relative flex flex-col items-center justify-center pt-20 px-4">
        <div className="w-full max-w-md p-8 text-center bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl dark:bg-white/5 dark:border-white/10">

          <h1 className="text-sm font-bold tracking-widest text-green-600 uppercase dark:text-green-400">
            Workspace
          </h1>
          <h2 className={`mt-2 text-4xl font-extrabold ${(theme === 'light') ? 'text-gray-900' : 'text-white'}`}>
            Redux Counter
          </h2>

          <div className="my-10 relative">
            <span className={`text-8xl font-black ${(theme === 'light') ? 'text-indigo-600/10' : 'text-indigo-200/10'} absolute -top-8 left-1/2 -translate-x-1/2 select-none`}>
              {counter}
            </span>
            <h3 className={`text-6xl font-bold text-gray-800 ${(theme === 'light') ? 'text-gray-900' : 'text-white'}  relative`}>
              {counter}
            </h3>
          </div>

          {/* Modernized Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(increment())}
                className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-green-500/30 hover:bg-green-500 hover:shadow-indigo-500/40 transition-all active:scale-95"
              >
                Increment
              </button>
              <button
                onClick={() => dispatch(decrement())}
                className="flex-1 bg-red-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-red-500/30 hover:bg-red-500 hover:shadow-indigo-500/40 transition-all active:scale-95"
              >
                Decrement
              </button>
            </div>

            <button
              onClick={() => dispatch(reset())}
              className="w-full text-sm font-bold text-yellow-500 hover:text-yellow-500 transition-colors py-3 px-6 rounded-2xl border border-red-200 shadow-sm"
            >
              Reset Counter
            </button>
          </div>

        </div>
      </main>
    </div >
  </>;
}



