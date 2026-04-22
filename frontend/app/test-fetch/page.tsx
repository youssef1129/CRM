'use client';

import { useEffect, useState } from 'react';
import { clientsApi } from '@/config/api';

export default function TestFetchClientPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('--- Composant monté, lancement du fetch ---');

    clientsApi.clientControllerFindAll({ body: { size: 1 } })
      .then((res) => {
        console.log('Réponse reçue !', res);
        setData(res);
      })
      .catch((err) => {
        console.error('Erreur attrapée :', err);
        setError(err.message || 'Erreur inconnue');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Test API (Client Side)</h1>

      <div className="mb-4 p-4 bg-blue-100 rounded">
        <p>Ouvre ton inspecteur (F12) et regarde l'onglet <strong>Network (Réseau)</strong>.</p>
        <p>L'URL appelée devrait être : <code className="bg-white px-1">http://localhost:8098/api/v1/clients...</code></p>
      </div>

      {loading && <p className="text-gray-500">Chargement en cours...</p>}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-400">
          <strong>Erreur :</strong> {error}
        </div>
      )}

      {data && (
        <div>
          <p className="text-green-600 font-bold mb-2">Données reçues avec succès !</p>
          <pre className="p-4 bg-gray-900 text-green-400 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
