'use client';

import Link from 'next/link';
import { Card, Tag, Button, Avatar } from 'antd';
import { FiMail, FiPhone, FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi';
import type { Client } from '@/api-client';

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${client.email}`;

  return (
    <Card
      className="rounded-[28px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
      title={
        <div className="flex items-center gap-3 py-1">
          <Avatar 
            src={avatarUrl} 
            size={40} 
            className="border-2 border-teal-100 bg-teal-50"
          />
          <span className="text-slate-800 font-bold">
            {client.civility} {client.firstName} {client.lastName}
          </span>
        </div>
      }
      extra={
        <Link href={`/${client.id}`} className="text-teal-600 hover:text-teal-700 transition-colors">
          <div className="flex items-center gap-1 font-semibold text-sm">
            Détails <FiArrowRight />
          </div>
        </Link>
      }
    >
      <div className="space-y-4 text-sm text-slate-600">
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-teal-50 transition-colors">
            <FiMail className="text-teal-600" />
          </div>
          <span className="font-medium">{client.email}</span>
        </div>
        
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-teal-50 transition-colors">
            <FiPhone className="text-teal-600" />
          </div>
          <span className="font-medium">{client.phone}</span>
        </div>
        
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-teal-50 transition-colors">
            <FiUsers className="text-teal-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">Animaux :</span>
            <Tag color="cyan" className="rounded-full px-3 border-none font-bold">
              {client.animals?.length ?? 0}
            </Tag>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
          <FiCalendar className="text-xs" />
          <span>Depuis le {new Date(client.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          type="primary" 
          block 
          className="bg-teal-600 hover:bg-teal-700 border-none h-10 font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <FiMail /> Contacter le client
        </Button>
      </div>
    </Card>
  );
};
