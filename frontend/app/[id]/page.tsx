import { clientsApi } from "@/config/api";

async function getClients(id: string) {
  await clientsApi.clientControllerFindOne({ id: Number(id) }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error('Error fetching client:', error);
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await getClients(id);
  return <div>CLIENT: {id}</div>
}