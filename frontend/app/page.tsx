import { clientsApi, animalsApi } from '@/config/api';
import { CustomTable } from '@/components/CustomTable';
import { ClientCard } from '@/components/ClientCard';
import { AddClientButton } from '@/components/AddClientButton';

export default async function Home() {
  const clientsResponse = await clientsApi.clientControllerFindAll({ limit: 8, page: 1, search: '' });
  const animalsResponse = await animalsApi.animalControllerFindAll({ limit: 8, page: 1, search: '' });

  const clients = clientsResponse.data?.items ?? [];
  const animals = animalsResponse.data?.items ?? [];
  const totalClients = clientsResponse.data?.pagination?.totalItems ?? clients.length;
  const totalAnimals = animalsResponse.data?.pagination?.totalItems ?? animals.length;

  return (
    <div className="space-y-8 mt-2">
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Clinique</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">VetCRM</h2>
          <p className="mt-2 text-sm text-slate-600">Tableau de bord principal pour votre pratique.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Clients enregistrés</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{totalClients}</h2>
          <p className="mt-2 text-sm text-slate-600">Dernières fiches propriétaires enregistrées.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Animaux suivis</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{totalAnimals}</h2>
          <p className="mt-2 text-sm text-slate-600">Patients actifs dans la clinique.</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {clients.slice(0, 3).map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Clients</h2>
            <p className="mt-2 text-sm text-slate-600">Suivez les prochains rendez-vous et les dossiers patients.</p>
          </div>
          <div className="flex gap-2">
            <AddClientButton />
          </div>
        </div>

        <CustomTable
          title="Table clients"
          kind="clients"
          initialData={clients}
          initialTotal={totalClients}
          pageSize={5}
        />
      </section>
    </div>
  );
}
