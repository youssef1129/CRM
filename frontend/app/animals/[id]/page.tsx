import Link from 'next/link';
import { animalsApi } from '@/config/api';
import { CustomForm } from '@/components/CustomForm';
import { DeleteAnimalButton } from '@/components/DeleteAnimalButton';
import { AnimalImageHeader } from '@/components/AnimalImageHeader';
import { FiArrowLeft, FiInfo, FiHash, FiClock, FiActivity, FiUser } from 'react-icons/fi';
import { FaWeight, FaArrowsAltV, FaDna } from 'react-icons/fa';

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
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8">
        <div className="mt-5 flex-1">
          <AnimalImageHeader name={animal.firstName} />
          <div className="mt-4 flex items-center gap-2">
            <div className="p-2 bg-slate-50 rounded-full">
              <FiUser className="text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              Propriétaire : <Link href={`/${animal.clientId}`} className="text-teal-600 hover:underline">{animal.client?.firstName} {animal.client?.lastName}</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <DeleteAnimalButton animalId={animal.id} />
          <Link href="/animals" className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200">
            <FiArrowLeft /> Liste des animaux
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <FiInfo className="text-teal-600" /> Données du patient
          </h2>
          <div className="space-y-6 text-sm text-slate-600">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FaDna className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Espèce</span>
                <p className="text-slate-700 font-semibold capitalize">{animal.species}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FiClock className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Âge</span>
                <p className="text-slate-700 font-semibold">{animal.age} ans</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FaArrowsAltV className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Taille</span>
                <p className="text-slate-700 font-semibold">{animal.height} cm</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                <FaWeight className="text-teal-600 text-lg" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Poids</span>
                <p className="text-slate-700 font-semibold">{animal.weight} kg</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Modifier le patient</h2>
          <CustomForm
            kind="animals"
            mode="update"
            initialData={animal}
          />
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
          <FiActivity className="text-teal-600" /> Suivi du dossier
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Création</span>
            <p className="text-slate-700 font-semibold">{new Date(animal.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dernière mise à jour</span>
            <p className="text-slate-700 font-semibold">{new Date(animal.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ID Propriétaire</span>
            <div className="flex items-center gap-2">
              <FiHash className="text-teal-600" />
              <p className="text-slate-700 font-semibold">{animal.clientId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
