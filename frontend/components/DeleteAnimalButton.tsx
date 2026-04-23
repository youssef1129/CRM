'use client';

import { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { animalsApi } from '@/config/api';

interface DeleteAnimalButtonProps {
  animalId: number;
}

export const DeleteAnimalButton = ({ animalId }: DeleteAnimalButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await animalsApi.animalControllerRemove({ id: animalId });
      message.success('Animal supprimé avec succès');
      router.push('/animals');
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      message.error('Erreur lors de la suppression de l\'animal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title="Supprimer cet animal"
      description="Êtes-vous sûr de vouloir supprimer cet animal ? Cette action est irréversible."
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