'use client';

import { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { clientsApi } from '@/config/api';

interface DeleteClientButtonProps {
  clientId: number;
}

export const DeleteClientButton = ({ clientId }: DeleteClientButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await clientsApi.clientControllerRemove({ id: clientId });
      message.success('Client supprimé avec succès');
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      message.error('Erreur lors de la suppression du client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Supprimer ce client"
      description="Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible."
      onConfirm={handleDelete}
      okText="Supprimer"
      cancelText="Annuler"
      okButtonProps={{ danger: true, loading }}
    >
      <Button type="primary" danger icon={<DeleteOutlined />} loading={loading}>
        Supprimer
      </Button>
    </Popconfirm>
  );
};