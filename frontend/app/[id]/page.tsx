import Link from 'next/link';
import { clientsApi } from '@/config/api';
import { CustomForm } from '@/components/CustomForm';
import { DeleteClientButton } from '@/components/DeleteClientButton';
import { AnimalCard } from '@/components/AnimalCard';
import { FiMail, FiPhone, FiCalendar, FiArrowLeft, FiInfo, FiLayers } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

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
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8">
        <div className='mt-5 flex items-center gap-4'>
          <div className="p-4 bg-teal-50 rounded-3xl">
            <FaUserCircle className="text-teal-600 text-5xl" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <FiInfo /> Fiche Client
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">{client.civility} {client.firstName} {client.lastName}</h1>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <DeleteClientButton clientId={client.id} />
          <Link href="/" className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200">
            <FiArrowLeft /> Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <FiInfo className="text-teal-600" /> Informations
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FiMail className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                <p className="text-slate-700 font-semibold">{client.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FiPhone className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</span>
                <p className="text-slate-700 font-semibold">{client.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FiLayers className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patients</span>
                <p className="text-slate-700 font-semibold">{client.animals?.length ?? 0} animal{client.animals?.length === 1 ? '' : 'x'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FiCalendar className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date d'inscription</span>
                <p className="text-slate-700 font-semibold">{new Date(client.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Édition du profil</h2>
          <CustomForm
            kind="clients"
            mode="update"
            initialData={client}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <FiLayers className="text-teal-600" /> Animaux associés
        </h2>
        {client.animals?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {client.animals.map((animal) => (
              <AnimalCard key={animal.id} animal={{...animal, client}} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500 font-medium italic">Aucun animal associé pour ce propriétaire.</p>
          </div>
        )}
      </div>
    </div>
  );
}