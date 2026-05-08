import { Outlet } from 'react-router';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    // Background ko halka Amber rakha hai taaki "Sweet" vibe aaye
    <div className="min-h-screen bg-amber-50/30 text-slate-800 font-sans">

      <Header />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Is div ke andar aapka Chocolates/Fruits wala content display hoga */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-emerald-900/5 border border-white p-8">
          <Outlet />
        </div>

        <ToastContainer />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
          Made with <span className="text-orange-400">🧡</span> for Sweet Lovers
        </p>
      </footer>
    </div>
  );
}