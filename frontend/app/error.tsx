'use client';

import { useEffect } from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-red-50 p-8">
        <FiAlertTriangle className="text-8xl text-red-500" />
      </div>
      
      <h1 className="text-3xl font-black text-slate-900">Oups ! Quelque chose s&apos;est mal passé</h1>
      <p className="mt-4 max-w-md text-slate-500 font-medium">
        Une erreur s&apos;est produite lors du chargement de cette page. 
        Nos équipes ont été informées.
      </p>
      
      {error.message && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs font-mono text-slate-400">
          ID Erreur: {error.digest || error.message}
        </div>
      )}
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-teal-700"
        >
          <FiRefreshCw className="text-lg" />
          Réessayer
        </button>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-8 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200"
        >
          <FiHome className="text-lg" />
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
