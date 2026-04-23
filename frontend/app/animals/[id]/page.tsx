import Link from 'next/link';
import { animalsApi } from '@/config/api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const response = await animalsApi.animalControllerFindOne({ id: Number((await params).id) });
  const animal = response.data;

  if (!animal) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Animal introuvable.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Fiche patient</p>
          <h1 className="text-3xl font-semibold text-slate-900">{animal.firstName}</h1>
          <p className="mt-2 text-sm text-slate-600">Propriétaire : {animal.client?.firstName} {animal.client?.lastName}</p>
        </div>
        <Link href="/animals" className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
          Retour à la liste
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Données du patient</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>
              <span className="block text-slate-500">Espèce</span>
              <p className="capitalize">{animal.species}</p>
            </div>
            <div>
              <span className="block text-slate-500">Âge</span>
              <p>{animal.age} ans</p>
            </div>
            <div>
              <span className="block text-slate-500">Taille</span>
              <p>{animal.height} cm</p>
            </div>
            <div>
              <span className="block text-slate-500">Poids</span>
              <p>{animal.weight} kg</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Suivi du dossier</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Ce patient a été créé le {new Date(animal.createdAt).toLocaleDateString('fr-FR')}.</p>
            <p>Dernière mise à jour : {new Date(animal.updatedAt).toLocaleDateString('fr-FR')}.</p>
            <p>Identifiant de propriétaire : {animal.clientId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
