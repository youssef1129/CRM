import Link from 'next/link';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';
import { FaGhost } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-slate-50 p-8">
        <FaGhost className="text-8xl text-slate-200 animate-bounce" />
      </div>

      <h1 className="text-5xl font-black text-slate-900">404</h1>
      <h2 className="mt-2 text-2xl font-bold text-slate-800">Page introuvable</h2>
      <p className="mt-4 max-w-md text-slate-500 font-medium">
        Oups ! La page que vous recherchez semble s&apos;être égarée.
        Vérifiez l&apos;URL ou retournez sur le tableau de bord.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-100"
        >
          <FiHome className="text-lg" />
          Retour à l&apos;accueil
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-8 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200"
        >
          <FiArrowLeft className="text-lg" />
          Page précédente
        </button>
      </div>

      <div className="mt-12 flex items-center gap-2 text-slate-400">
        <FiSearch />
        <span className="text-sm font-bold uppercase tracking-widest">Recherche de solutions</span>
      </div>
    </div>
  );
}
