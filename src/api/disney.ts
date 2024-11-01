const DISNEY_API_BASE = "https://api.disneyapi.dev/character";

export interface QueryParams {
  page?: string;
  pageSize?: string;
  query?: string;
  field?: string;
}

export const disneyApi = {
  /**
   * Get character by name
   * @param name The name of the character, e.g. "Mickey Mouse"
   * @returns The character object
   */
  searchByName: async (name: string) => {
    const url = `${DISNEY_API_BASE}?name=${encodeURIComponent(name)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch character by name");
    return response.json();
  },

  /**
   * Get paginated characters
   * @param page The page number
   * @param pageSize The number of items per page
   * @returns The paginated characters
   */
  getPaginatedCharacters: async (page: string, pageSize: string) => {
    const url = `${DISNEY_API_BASE}?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch characters");
    return response.json();
  },

  /**
   * Filter characters by TV show, client-side
   * @param data the Disney API response
   * @param query the TV show query, e.g. "Tangled"
   * @returns the filtered data.
   */
  filterByTvShow: (data: DisneyAPIResponseDTO, query: string) => ({
    ...data,
    data: data.data.filter((character: DisneyCharacter) =>
      character.tvShows.some((show: string) => show.toLowerCase().includes(query.toLowerCase()))
    ),
  }),
};
