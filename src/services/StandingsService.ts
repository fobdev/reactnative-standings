import { Standings } from "../interfaces";
import { Api } from "../providers";

/**
 * GET request da API no ENDPOINT /leagues/{id}}/standings sendo utilizado no getAll
 */
const getAll = (id: string) => Api.get<Standings>(`/leagues/${id}/standings`);

export const StandingsService = {
    getAll,
};
