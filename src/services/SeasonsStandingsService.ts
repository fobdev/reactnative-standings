import { Seasons } from "../interfaces";
import { Api } from "../providers";

/**
 * GET request da API no ENDPOINT /leagues/{id}}/standings sendo utilizado no getAll
 */
const getAll = (id: string) => Api.get<Seasons>(`/leagues/${id}/seasons`);

export const SeasonsStandingsService = {
    getAll,
};
