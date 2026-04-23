'use client';

import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomForm } from './CustomForm';

export const AddAnimalButton = () => {
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
        Ajouter un animal
      </Button>
      <Modal
        title="Ajouter un animal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <CustomForm
          kind="animals"
          mode="add"
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
};