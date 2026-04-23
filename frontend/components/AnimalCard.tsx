'use client';

import Link from 'next/link';
import { Card, Tag } from 'antd';
import { FaPaw } from 'react-icons/fa';
import type { Animal } from '@/api-client';

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard = ({ animal }: AnimalCardProps) => {
  return (
    <Card className="rounded-[28px] border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <FaPaw className="text-teal-600" />
            <span>{animal.firstName}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{animal.species} • {animal.age} ans</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag color="green">{animal.weight} kg</Tag>
            <Tag color="blue">{animal.height} cm</Tag>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Propriétaire</p>
          <p className="text-sm text-slate-700">{animal.client?.firstName} {animal.client?.lastName}</p>
        </div>
        <Link href={`/animals/${animal.id}`} className="text-teal-600 font-semibold">
          Voir la fiche
        </Link>
      </div>
    </Card>
  );
};
