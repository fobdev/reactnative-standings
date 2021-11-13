import { Leagues } from "../interfaces";
import { Api } from "../providers";

/**
 * GET request da API no ENDPOINT /leagues/ sendo utilizado no getAll
 */
const getAll = () => Api.get<Leagues>("/leagues");

export const LeaguesService = {
    getAll: getAll,
};
