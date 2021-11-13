import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LeaguesData } from "..";

export type StandingsStack = {
    Home: LeaguesData | undefined;
    Standings: LeaguesData | undefined;
};

export type StandingsNavProp<T extends keyof StandingsStack> = {
    navigation: StackNavigationProp<StandingsStack, T>;
    route: RouteProp<StandingsStack, T>;
};
