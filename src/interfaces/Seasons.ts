export interface Seasons {
    /**
     * Podem retornar undefined por conta de ser um request assíncrono
     */
    status: boolean | undefined;
    data: SeasonsData | undefined;
}

export interface SeasonsData {
    name: string;
    desc: string;
    abbreviation: string;
    seasons: SeasonsDataPerYear[];
}

export interface SeasonsDataPerYear {
    year: string;
    startDate: string;
    endDate: string;
    displayName: string;
    types: SeasonsDataPerYearType[];
}

export interface SeasonsDataPerYearType {
    id: string;
    name: string;
    abbreviation: string;
    startDate: string;
    endDate: string;
    hasStandings: boolean;
}
