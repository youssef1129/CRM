'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, InputNumber } from 'antd';
import { clientsApi, animalsApi } from '@/config/api';
import { AnimalSpeciesEnum, ClientCivilityEnum } from '@/api-client';
import { FiUser, FiMail, FiPhone, FiHash, FiSave, FiPlusCircle } from 'react-icons/fi';
import { FaWeight, FaArrowsAltV, FaPaw } from 'react-icons/fa';

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
        <div className="space-y-4">
            <Form.Item label="Civilité" name="civility" rules={[{ required: true, message: 'Civilité requise' }]}>
                <Select
                    placeholder="Choisir une civilité"
                    options={Object.values(ClientCivilityEnum).map((value) => ({ label: value, value }))}
                    className="h-10 rounded-xl"
                />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Prénom" name="firstName" rules={[{ required: true, message: 'Prénom requis' }]}>
                    <Input prefix={<FiUser className="text-slate-400" />} placeholder="Jean" className="h-10 rounded-xl" />
                </Form.Item>
                <Form.Item label="Nom" name="lastName" rules={[{ required: true, message: 'Nom requis' }]}>
                    <Input prefix={<FiUser className="text-slate-400" />} placeholder="Dupont" className="h-10 rounded-xl" />
                </Form.Item>
            </div>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email invalide' }]}>
                <Input prefix={<FiMail className="text-slate-400" />} placeholder="jean.dupont@email.com" className="h-10 rounded-xl" />
            </Form.Item>
            <Form.Item label="Téléphone" name="phone">
                <Input prefix={<FiPhone className="text-slate-400" />} placeholder="06 12 34 56 78" className="h-10 rounded-xl" />
            </Form.Item>
        </div>
    );

    const animalFields = (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Nom du patient" name="firstName" rules={[{ required: true, message: 'Prénom requis' }]}>
                    <Input prefix={<FaPaw className="text-slate-400" />} placeholder="Médor" className="h-10 rounded-xl" />
                </Form.Item>
                <Form.Item label="Espèce" name="species" rules={[{ required: true, message: 'Espèce requise' }]}>
                    <Select
                        placeholder="Espèce"
                        options={Object.values(AnimalSpeciesEnum).map((value) => ({ label: value, value }))}
                        className="h-10 rounded-xl"
                    />
                </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Form.Item label="Âge (ans)" name="age" rules={[{ required: true, message: 'Âge requis' }]}>
                    <InputNumber min={0} className="w-full h-10 rounded-xl flex items-center" prefix={<FiHash className="text-slate-400" />} />
                </Form.Item>
                <Form.Item label="Poids (kg)" name="weight" rules={[{ required: true, message: 'Poids requis' }]}>
                    <InputNumber min={0} step={0.1} className="w-full h-10 rounded-xl flex items-center" prefix={<FaWeight className="text-slate-400" />} />
                </Form.Item>
                <Form.Item label="Taille (cm)" name="height" rules={[{ required: true, message: 'Taille requise' }]}>
                    <InputNumber min={0} step={0.1} className="w-full h-10 rounded-xl flex items-center" prefix={<FaArrowsAltV className="text-slate-400" />} />
                </Form.Item>
            </div>
            <Form.Item label="Propriétaire" name="clientId" rules={[{ required: true, message: 'Propriétaire requis' }]}>
                <Select
                    placeholder="Sélectionner le propriétaire"
                    prefix={<FiUser className="text-slate-400 mr-2" />}
                    options={clients.map(client => ({ label: `${client.firstName} ${client.lastName}`, value: client.id }))}
                    className="h-10 rounded-xl"
                    showSearch
                    optionFilterProp="label"
                />
            </Form.Item>
        </div>
    );

    return (
        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="w-full"
                requiredMark={false}
            >
                {kind === 'clients' ? clientFields : animalFields}
                <Form.Item className="mt-8 mb-0">
                    <Button
                        icon={mode === 'add' ? <FiPlusCircle /> : <FiSave />}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        className="h-12 bg-teal-600 hover:bg-teal-700 border-none rounded-2xl font-bold text-base flex items-center justify-center gap-2"
                    >
                        {mode === 'add' ? 'Ajouter' : 'Enregistrer les modifications'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};