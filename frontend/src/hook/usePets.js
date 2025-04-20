import { useQuery } from "@tanstack/react-query";
import { fetchPets } from "../api/pet";

export const usePets = (page) => {
  return useQuery({
    queryKey: ["pets", page],
    queryFn: () => fetchPets(page),
    keepPreviousData: true,
  });
};
