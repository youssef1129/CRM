'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, InputNumber } from 'antd';
import { clientsApi, animalsApi } from '@/config/api';
import { AnimalSpeciesEnum, ClientCivilityEnum } from '@/api-client';

interface CustomFormProps {
    kind: 'clients' | 'animals';
    mode: 'add' | 'update';
    initialData?: any;
    onSuccess?: (() => void) | undefined;
}

export const CustomForm = ({ kind, mode, initialData, onSuccess }: CustomFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);

    const fetchClients = async () => {
        try {
            const response = await clientsApi.clientControllerFindAll({ limit: 100 });
            setClients(response.data?.items ?? []);
        } catch (error) {
            console.error('Erreur lors de la récupération des clients', error);
        }
    };

    useEffect(() => {
        if (mode === 'update' && initialData) {
            form.setFieldsValue(initialData);
        }

        // Fetch clients for animal form
        if (kind === 'animals') {
            fetchClients();
        }
    }, [mode, initialData, form, kind]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (kind === 'clients') {
                if (mode === 'add') {
                    await clientsApi.clientControllerCreate({ createClientDto: values });
                    message.success('Client ajouté avec succès');
                } else {
                    await clientsApi.clientControllerUpdate({ id: initialData.id, updateClientDto: values });
                    message.success('Client mis à jour avec succès');
                }
            } else {
                if (mode === 'add') {
                    await animalsApi.animalControllerCreate({ createAnimalDto: values });
                    message.success('Animal ajouté avec succès');
                } else {
                    await animalsApi.animalControllerUpdate({ id: initialData.id, updateAnimalDto: values });
                    message.success('Animal mis à jour avec succès');
                }
            }
            // Call onSuccess if provided, otherwise reload for update mode
            if (onSuccess) {
                onSuccess();
            } else if (mode === 'update') {
                window.location.reload();
            }
        } catch (error) {
            console.error('Erreur lors de la soumission', error);
            message.error('Erreur lors de la soumission du formulaire');
        } finally {
            setLoading(false);
        }
    };

    const clientFields = (
        <>
            <Form.Item label="Civilité" name="civility" rules={[{ required: true, message: 'Civilité requise' }]}>
                <Select options={Object.values(ClientCivilityEnum).map((value) => ({ label: value, value }))} />
            </Form.Item>
            <Form.Item label="Prénom" name="firstName" rules={[{ required: true, message: 'Prénom requis' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Nom" name="lastName" rules={[{ required: true, message: 'Nom requis' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email invalide' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Téléphone" name="phone">
                <Input />
            </Form.Item>
        </>
    );

    const animalFields = (
        <>
            <Form.Item label="Prénom" name="firstName" rules={[{ required: true, message: 'Prénom requis' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Espèce" name="species" rules={[{ required: true, message: 'Espèce requise' }]}>
                <Select options={Object.values(AnimalSpeciesEnum).map((value) => ({ label: value, value }))} />
            </Form.Item>
            <Form.Item label="Âge" name="age" rules={[{ required: true, message: 'Âge requis' }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Poids (kg)" name="weight" rules={[{ required: true, message: 'Poids requis' }]}>
                <InputNumber min={0} step={0.1} />
            </Form.Item>
            <Form.Item label="Taille (cm)" name="height" rules={[{ required: true, message: 'Taille requise' }]}>
                <InputNumber min={0} step={0.1} />
            </Form.Item>
            <Form.Item label="Propriétaire" name="clientId" rules={[{ required: true, message: 'Propriétaire requis' }]}>
                <Select options={clients.map(client => ({ label: `${client.firstName} ${client.lastName}`, value: client.id }))} />
            </Form.Item>
        </>
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="max-w-md"
        >
            {kind === 'clients' ? clientFields : animalFields}
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
                </Button>
            </Form.Item>
        </Form>
    );
};