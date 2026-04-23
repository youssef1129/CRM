'use client';

import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomForm } from './CustomForm';

export const AddClientButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter un client
      </Button>
      <Modal
        title="Ajouter un client"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <CustomForm
          kind="clients"
          mode="add"
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
};