export interface Leagues {
    /**
     * Podem retornar undefined por conta de ser um request assíncrono
     */
    status: boolean | undefined;
    data: LeaguesData[] | undefined;
}

export interface LeaguesData {
    id: string;
    name: string;
    slug: string;
    abbr: string;
    logos: LeaguesLogos;
}

export interface LeaguesLogos {
    light: string;
    dark: string;
}
