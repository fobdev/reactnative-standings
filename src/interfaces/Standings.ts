export interface Standings {
    /**
     * Podem retornar undefined por conta de ser um request assíncrono
     */
    status: boolean | undefined;
    data: StandingsData | undefined;
}

export interface StandingsData {
    name: string;
    abbreviation: string;
    seasonDisplay: string;
    seasons: number;
    standings: StandingsResponse[];
}

export interface StandingsResponse {
    team: StandingsTeam;
    note: StandingsTeamNote;
    stats: StandingsTeamStats[];
}

export interface StandingsTeam {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    isActive: boolean;
    logos: StandingsTeamLogos[];
}

export interface StandingsTeamNote {
    color: string;
    description: string;
    rank: number;
}

export interface StandingsTeamStats {
    type: string;
    name: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    value: number;
    displayValue: string;
}

export interface StandingsTeamLogos {
    href: string;
    width: number;
    height: number;
    alt: string;
    rel: string[];
    lastUpdate: string;
}
