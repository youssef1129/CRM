'use client';

import { useMemo, useState, useEffect } from 'react';
import { Table, Dropdown, Button, Space, Tag, Modal, Form, Input, Select, Pagination } from 'antd';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { clientsApi, animalsApi } from '@/config/api';

interface CustomTableProps<T extends object> {
    title?: string;
    kind?: 'clients' | 'animals';
    initialData: T[];
    initialTotal: number;
    pageSize?: number;
}

export const CustomTable = <T extends object>({ title, kind = 'clients', initialData, initialTotal, pageSize = 5 }: CustomTableProps<T>) => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [pageSizeState, setPageSizeState] = useState(pageSize);
    const [data, setData] = useState<T[]>(initialData);
    const [total, setTotal] = useState(initialTotal);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<T | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setQuery(searchTerm.trim());
            setPage(1);
        }, 400);

        return () => window.clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (kind === 'clients') {
                    const response = await clientsApi.clientControllerFindAll({ limit: pageSizeState, page, search: query });
                    if (!active) return;
                    setData(response.data?.items as T[] ?? []);
                    setTotal(response.data?.pagination?.totalItems ?? 0);
                } else {
                    const response = await animalsApi.animalControllerFindAll({ limit: pageSizeState, page, search: query });
                    if (!active) return;
                    setData(response.data?.items as T[] ?? []);
                    setTotal(response.data?.pagination?.totalItems ?? 0);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchData();
        return () => {
            active = false;
        };
    }, [kind, page, pageSizeState, query]);

    const visibleData = useMemo(() => data, [data]);
    const pageData = useMemo(() => visibleData, [visibleData]);

    const renderedColumns = useMemo<ColumnsType<T>>(() => {
        const recordAsAny = (record: T) => record as Record<string, unknown>;

        if (kind === 'animals') {
            return [
                {
                    title: 'Patient',
                    dataIndex: 'firstName',
                    key: 'firstName',
                    render: (_: unknown, record: T) => {
                        const item = recordAsAny(record);
                        const owner = item['client'] as Record<string, unknown> | undefined;
                        return (
                            <div>
                                <p className="font-semibold text-slate-900">{String(item['firstName'] ?? '')}</p>
                                <p className="text-sm text-slate-500">Propriétaire : {String(owner?.['firstName'] ?? '')} {String(owner?.['lastName'] ?? '')}</p>
                            </div>
                        );
                    },
                },
                {
                    title: 'Espèce',
                    dataIndex: 'species',
                    key: 'species',
                    render: (species: unknown) => <span className="capitalize">{String(species ?? '')}</span>,
                },
                {
                    title: 'Âge',
                    dataIndex: 'age',
                    key: 'age',
                    render: (age: unknown) => `${String(age ?? '')} ans`,
                },
                {
                    title: 'Poids',
                    dataIndex: 'weight',
                    key: 'weight',
                    render: (weight: unknown) => `${String(weight ?? '')} kg`,
                },
                {
                    title: 'Enregistré',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (date: unknown) => new Date(String(date ?? '')).toLocaleDateString('fr-FR'),
                },
            ] as ColumnsType<T>;
        }

        return [
            {
                title: 'Nom',
                dataIndex: 'firstName',
                key: 'name',
                render: (_: unknown, record: T) => {
                    const item = recordAsAny(record);
                    return (
                        <div>
                            <p className="font-semibold text-slate-900">{String(item['civility'] ?? '')} {String(item['firstName'] ?? '')} {String(item['lastName'] ?? '')}</p>
                            <p className="text-sm text-slate-500">{String(item['email'] ?? '')}</p>
                        </div>
                    );
                },
            },
            {
                title: 'Téléphone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Animaux',
                dataIndex: 'animals',
                key: 'animals',
                render: (animals: unknown) => {
                    const items = Array.isArray(animals) ? animals : [];
                    return <span>{items.length} patient{items.length === 1 ? '' : 's'}</span>;
                },
            },
            {
                title: 'Inscription',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: unknown) => new Date(String(date ?? '')).toLocaleDateString('fr-FR'),
            },
        ] as ColumnsType<T>;
    }, [kind]);

    const showRecordModal = (record: T) => {
        const item = record as Record<string, unknown>;
        setSelectedRecord(record);
        form.setFieldsValue({
            nom: String(item['firstName'] ?? ''),
            email: String(item['email'] ?? ''),
            type: String(item['species'] ?? 'client'),
        });
        setIsModalOpen(true);
    };

    const handleMenuClick = (key: string, record: T) => {
        if (key === 'view') {
            showRecordModal(record);
        }
    };

    const actionsColumn: ColumnType<T> = {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, record: T) => (
            <Dropdown
                menu={{
                    items: [
                        { key: 'view', label: 'Voir le détail' },
                        { key: 'edit', label: 'Modifier' },
                    ],
                    onClick: ({ key }) => handleMenuClick(key as string, record),
                }}
                trigger={['click']}
            >
                <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
        ),
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500">{visibleData.length} éléments disponibles.</p>
                </div>
                <Space className="w-full sm:w-auto">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        style={{ minWidth: 220 }}
                    />
                    <Select value={pageSizeState} options={[{ label: '5 par page', value: 5 }, { label: '10 par page', value: 10 }, { label: '20 par page', value: 20 }]} onChange={(value) => { setPageSizeState(Number(value)); setPage(1); }} />
                </Space>
            </div>

            <Table
                loading={loading}
                columns={[...renderedColumns, actionsColumn]}
                dataSource={pageData}
                pagination={false}
                rowKey={(record) => String((record as Record<string, unknown>)['id'] ?? '')}
                size="middle"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-x-2">
                    <Tag color="cyan">Total : {total}</Tag>
                    <Tag color="green">Affichés : {pageData.length}</Tag>
                </div>
                <Pagination
                    current={page}
                    pageSize={pageSizeState}
                    total={total}
                    onChange={(page) => setPage(page)}
                    showSizeChanger={false}
                />
            </div>

            <Modal
                open={isModalOpen}
                title={
                    selectedRecord && (selectedRecord as Record<string, unknown>)['firstName']
                        ? String((selectedRecord as Record<string, unknown>)['firstName'])
                        : 'Aperçu rapide'
                }
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={() => {
                        setIsModalOpen(false);
                    }}
                >
                    <Form.Item label="Nom" name="nom">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select options={[{ label: 'Client', value: 'client' }, { label: 'Animal', value: 'animal' }]} />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setIsModalOpen(false)}>Fermer</Button>
                        <Button type="primary" htmlType="submit">
                            Enregistrer
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};
