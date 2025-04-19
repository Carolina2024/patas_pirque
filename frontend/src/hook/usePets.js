import { useQuery } from "@tanstack/react-query";
import { fetchPets } from '../api/pet';

export const usePets = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });
};
