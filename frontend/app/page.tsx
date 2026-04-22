import { clientsApi } from "@/config/api";

async function getClients() {
  await clientsApi.clientControllerFindAll({limit: 5, page: 1}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error('Error fetching clients:', error);
  });
}

export default async function Home() {
  await getClients();

  return (
    <div>
      clients
    </div>
  );
}
