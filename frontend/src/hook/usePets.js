import { useQuery } from "@tanstack/react-query";
import { fetchPets } from "../api/pet";

export const usePets = ({ page = 1, filters = {} }) => {
  return useQuery({
    queryKey: ["pets", page, filters],
    queryFn: () => fetchPets({ page, limit: 4, filters }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5
  });
};
