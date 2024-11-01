import { disneyApi, QueryParams } from "../api/disney";
import { useQuery } from "@tanstack/react-query";

export const useDisneyCharacters = (params: QueryParams) => {
  const { page = "1", pageSize = "50", query = "", field = "character" } = params;

  const validateParams = () => {
    if (query && !["character", "tv"].includes(field)) {
      throw new Error("Invalid field parameter");
    }
    if (isNaN(parseInt(page))) throw new Error("Invalid page number");
    if (isNaN(parseInt(pageSize))) throw new Error("Invalid page size");
  };

  return useQuery<DisneyAPIResponseDTO>({
    queryKey: ["characters", page, pageSize, query, field],
    queryFn: async () => {
      validateParams();

      // Search by character name
      if (query && field === "character") return disneyApi.searchByName(query);

      // Get paginated results
      const data = await disneyApi.getPaginatedCharacters(page, pageSize);

      // Filter by TV show if needed
      if (field === "tv" && query) return disneyApi.filterByTvShow(data, query);

      // Return the data as-is
      return data;
    },
  });
};
