import { animalsApi } from "@/config/api";

async function getAnimals() {
    await animalsApi.animalControllerFindAll({ limit: 5, page: 1, search: '' }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error('Error fetching animals:', error);
    });
}

export default async function AnimalsPage() {
    await getAnimals();
    return <div>
        animals
    </div>
}