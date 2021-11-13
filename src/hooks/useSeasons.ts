import { useCallback, useState } from "react";
import { Seasons } from "../interfaces";
import { SeasonsStandingsService } from "../services";

export const useSeason = (id: string) => {
    /**
     * seasonTasks guardará o conteúdo do ENDPOINT correspondente da API
     * a call de useSeason() deve ser executada dentro de um useEffect() hook
     * por conta de ser uma request assincrona.
     */
    const [seasonTasks, setSeasonTasks] = useState<Seasons>();

    /**
     * useCallback para mudar apenas quando a depenência é mudada
     */
    const getSeason = useCallback(async (id) => {
        const { status, data } = await SeasonsStandingsService.getAll(id);
        if (status !== 200) throw new Error();

        setSeasonTasks(data);
    }, []);

    /**
     * a função para o fetch e o respectivo objeto serão retornados
     * assim possibilitando a utilização dos dados pela constante seasonTasks.
     */
    return {
        seasonTasks,
        getSeason,
    };
};

export default useSeason;
