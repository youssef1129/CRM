'use client';

import Link from 'next/link';
import { Card, Tag, Button } from 'antd';
import { MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';
import type { Client } from '@/api-client';

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <Card
      className="rounded-[28px] border border-slate-200 shadow-sm"
      title={`${client.civility} ${client.firstName} ${client.lastName}`}
      extra={
        <Link href={`/${client.id}`} className="text-teal-600">
          Détails
        </Link>
      }
    >
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MailOutlined className="text-teal-600" />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneOutlined className="text-teal-600" />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <TeamOutlined className="text-teal-600" />
          <Tag color="cyan">{client.animals?.length ?? 0} animal{client.animals?.length === 1 ? '' : 'x'}</Tag>
        </div>
        <div>
          <p className="text-xs text-slate-500">Inscription le {new Date(client.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
      <div className="mt-4">
        <Button type="primary" size="small">
          Contacter
        </Button>
      </div>
    </Card>
  );
};
