import { useCallback, useState } from "react";
import { Leagues } from "../interfaces";
import { LeaguesService } from "../services";

export const useLeagues = () => {
    /**
     * leagueTasks guardará o conteúdo do ENDPOINT correspondente da API
     * a call de useLeagues() deve ser executada dentro de um useEffect() hook
     * por conta de ser uma request assincrona.
     */
    const [leaguesTasks, setLeagueTasks] = useState<Leagues>();

    /**
     * useCallback para mudar apenas quando a depenência é mudada
     */
    const getAllLeagues = useCallback(async () => {
        const { status, data } = await LeaguesService.getAll();
        if (status !== 200) throw new Error();
        setLeagueTasks(data);
    }, []);

    /**
     * a função para o fetch e o respectivo objeto serão retornados
     * assim possibilitando a utilização dos dados pela constante leaguesTasks.
     */
    return {
        leaguesTasks,
        getAllLeagues,
    };
};

export default useLeagues;
