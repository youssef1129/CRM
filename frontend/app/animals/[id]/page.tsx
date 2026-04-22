import { animalsApi } from "@/config/api";

async function getAnimal(id: string) {
  await animalsApi.animalControllerFindOne({ id: Number(id) }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error('Error fetching animal:', error);
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await getAnimal(id);
  
  return <div>Animal: {id}</div>
}
