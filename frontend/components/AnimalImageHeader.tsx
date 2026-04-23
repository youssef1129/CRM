'use client';

import { useState, useEffect } from 'react';
import { FaPaw } from 'react-icons/fa';

export const AnimalImageHeader = ({ name }: { name: string }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => setImageUrl(data.message))
      .catch((err) => console.error('Error fetching dog image:', err));
  }, []);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-[40px] bg-slate-100 shadow-inner">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover transition-opacity duration-700"
          onLoad={(e) => (e.currentTarget.style.opacity = '1')}
          style={{ opacity: 0 }}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <FaPaw className="text-6xl text-slate-200 animate-pulse" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-6 left-8">
        <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-[0.2em] text-[10px]">
          <FaPaw /> Patient Profile
        </div>
        <h1 className="text-4xl font-extrabold text-white mt-1">{name}</h1>
      </div>
    </div>
  );
};
