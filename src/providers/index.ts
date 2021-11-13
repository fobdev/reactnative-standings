import axios from "axios";

/**
 * Inicializa o axios na URL da API, e guarda na variável Api para uso geral.
 */
export const Api = axios.create({ baseURL: "https://api-football-standings.azharimm.site/" });
