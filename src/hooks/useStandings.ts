import { useCallback, useState } from "react";
import { Standings } from "../interfaces";
import { StandingsService } from "../services";

export const useStanding = (id: string) => {
    /**
     * standingTasks guardará o conteúdo do ENDPOINT correspondente da API
     * a call de useStanding() deve ser executada dentro de um useEffect() hook
     * por conta de ser uma request assincrona.
     */
    const [standingTasks, setStandingTasks] = useState<Standings>();

    /**
     * useCallback para mudar apenas quando a depenência é mudada
     */
    const getStanding = useCallback(async (id) => {
        const { status, data } = await StandingsService.getAll(id);
        if (status !== 200) throw new Error();

        setStandingTasks(data);
    }, []);

    /**
     * a função para o fetch e o respectivo objeto serão retornados
     * assim possibilitando a utilização dos dados pela constante standingTasks.
     */
    return {
        standingTasks,
        getStanding,
    };
};

export default useStanding;
