import Link from 'next/link';
import { clientsApi } from '@/config/api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const response = await clientsApi.clientControllerFindOne({ id: Number((await params).id) });
  const client = response.data;

  if (!client) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Client introuvable.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className='mt-5'>
          <h1 className="text-3xl font-semibold text-slate-900">{client.civility} {client.firstName} {client.lastName}</h1>
        </div>
        <Link href="/" className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
          Retour au tableau de bord
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Informations</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>
              <span className="block text-slate-500">Email</span>
              <p>{client.email}</p>
            </div>
            <div>
              <span className="block text-slate-500">Téléphone</span>
              <p>{client.phone}</p>
            </div>
            <div>
              <span className="block text-slate-500">Animaux</span>
              <p>{client.animals?.length ?? 0} patient{client.animals?.length === 1 ? '' : 's'}</p>
            </div>
            <div>
              <span className="block text-slate-500">Créé le</span>
              <p>{new Date(client.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Animaux associés</h2>
          <div className="mt-4 space-y-3">
            {client.animals?.length ? (
              client.animals.map((animal) => (
                <div key={animal.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{animal.firstName}</p>
                      <p className="text-sm text-slate-600">{animal.species}</p>
                    </div>
                    <p className="text-sm text-slate-500">{animal.age} ans • {animal.weight} kg</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">Aucun animal associé pour ce propriétaire.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}