import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Home, StandingsTable } from "./screens";
import { StandingsStack } from "./interfaces";

interface RoutesProps {}

const Stack = createStackNavigator<StandingsStack>();

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { Navigator, Screen } = Stack;
    return (
        <NavigationContainer>
            <Navigator initialRouteName="Home">
                <Screen
                    options={{
                        title: "Classificações de Ligas 2021",
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: "#567d46" },
                        headerShadowVisible: false,
                    }}
                    name="Home"
                    component={Home}
                />
                <Screen
                    options={{
                        title: "Carregando...",
                        headerStyle: { backgroundColor: "#567d46" },
                        headerTintColor: "white",
                        headerShadowVisible: false,
                    }}
                    name="Standings"
                    component={StandingsTable}
                />
            </Navigator>
        </NavigationContainer>
    );
};
