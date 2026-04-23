import Link from 'next/link';
import { animalsApi } from '@/config/api';
import { CustomTable } from '@/components/CustomTable';
import { AnimalCard } from '@/components/AnimalCard';

export default async function AnimalsPage() {
  const response = await animalsApi.animalControllerFindAll({ limit: 10, page: 1, search: '' });
  const animals = response.data?.items ?? [];
  const totalAnimals = response.data?.pagination?.totalItems ?? animals.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mt-2">
          <h1 className="text-3xl font-semibold text-slate-900">Fiches animaux</h1>
        </div>
        <Link href="/" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700">
          Retour au tableau de bord
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {animals.slice(0, 3).map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Liste des animaux</h2>
            <p className="mt-2 text-sm text-slate-600">Suivez les profils et les propriétaires enregistrés.</p>
          </div>
        </div>
        <CustomTable title="Patients" kind="animals" initialData={animals} initialTotal={totalAnimals} pageSize={6} />
      </div>
    </div>
  );
}