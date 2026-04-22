'use client';

import { useState, useEffect } from 'react';
import { clientsApi } from "@/config/api";

export default function Home() {
  const [clients, setClients] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await clientsApi.clientControllerFindAll({ limit: 5, page: 1, search: '' });
        setClients(response);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    getClients();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Clients Récents</h2>
        {clients?.data?.items ? (
          <div className="space-y-2">
            {clients.data.items.map((client: any) => (
              <div key={client.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{client.firstName} {client.lastName}</p>
                  <p className="text-sm text-gray-600">{client.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun client trouvé.</p>
        )}
      </div>
    </div>
  );
}
