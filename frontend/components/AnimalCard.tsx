'use client';

import Link from 'next/link';
import { Card, Tag } from 'antd';
import { FaPaw, FaWeight, FaArrowsAltV, FaUser } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import type { Animal } from '@/api-client';

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard = ({ animal }: AnimalCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => setImageUrl(data.message))
      .catch((err) => console.error('Error fetching dog image:', err));
  }, []);

  return (
    <Card 
      className="rounded-[28px] border border-slate-200 shadow-sm overflow-hidden"
      cover={
        <div className="h-48 w-full overflow-hidden bg-slate-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={animal.firstName} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaPaw className="text-4xl text-slate-300 animate-pulse" />
            </div>
          )}
        </div>
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <FaPaw className="text-teal-600" />
            <span>{animal.firstName}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500 uppercase tracking-wide">
            {animal.species}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
              <IoInformationCircleOutline className="text-teal-600" />
              <span>{animal.age} ans</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
              <FaWeight className="text-teal-600 text-xs" />
              <span>{animal.weight} kg</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
              <FaArrowsAltV className="text-teal-600 text-xs" />
              <span>{animal.height} cm</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-50 rounded-full">
            <FaUser className="text-teal-600 text-xs" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Propriétaire</p>
            <p className="text-sm font-semibold text-slate-700">{animal.client?.firstName} {animal.client?.lastName}</p>
          </div>
        </div>
        <Link 
          href={`/animals/${animal.id}`} 
          className="text-teal-600 font-bold text-sm hover:text-teal-700 transition-colors"
        >
          Voir la fiche
        </Link>
      </div>
    </Card>
  );
};
