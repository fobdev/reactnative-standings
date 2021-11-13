import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { StandingsNavProp } from "../interfaces/stacks/StandingsStack";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useStanding } from "../hooks";

export const StandingsTable = ({ navigation, route }: StandingsNavProp<"Standings">) => {
    const [loading, setLoading] = useState(true);
    const { standingTasks, getStanding } = useStanding(route.params?.id!);

    useEffect(() => {
        navigation.setOptions({ title: route.params?.name });
        getStanding(route.params?.id).then(() => setLoading(false));
    }, [getStanding]);

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{`Carregando ${route.params?.name}...`}</Text>
            </View>
        );
    else
        return (
            <DataTable>
                <ScrollView>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 5 }}>Time</DataTable.Title>
                        <DataTable.Title numeric>P</DataTable.Title>
                        <DataTable.Title numeric>J</DataTable.Title>
                        <DataTable.Title numeric>V</DataTable.Title>
                        <DataTable.Title numeric>SG</DataTable.Title>
                        <DataTable.Title numeric>GP</DataTable.Title>
                        <DataTable.Title numeric>GC</DataTable.Title>
                    </DataTable.Header>
                    {standingTasks?.data!.standings.map((element, index) => {
                        const winCount = element.stats.find((current) => current.name === "wins");
                        const pointsCount = element.stats.find(
                            (current) => current.name === "points"
                        );
                        const gamesPlayedCount = element.stats.find(
                            (current) => current.name === "gamesPlayed"
                        );
                        const pointsForCount = element.stats.find(
                            (current) => current.name === "pointsFor"
                        );
                        const pointsAgainstCount = element.stats.find(
                            (current) => current.name === "pointsAgainst"
                        );
                        const pointDifferentialCount = element.stats.find(
                            (current) => current.name === "pointDifferential"
                        );

                        return (
                            <DataTable.Row
                                key={index}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                }}
                            >
                                <DataTable.Cell style={{ flex: 5 }}>
                                    <Image
                                        source={
                                            element.team!.logos
                                                ? {
                                                      uri: element.team.logos[0].href,
                                                      width: 20,
                                                      height: 20,
                                                  }
                                                : require("../../assets/noimage.png")
                                        }
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                    <Text>{element.team.name}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>{winCount?.displayValue}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {gamesPlayedCount?.displayValue}
                                </DataTable.Cell>
                                <DataTable.Cell numeric>{pointsCount?.displayValue}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {pointDifferentialCount?.displayValue}
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {pointsForCount?.displayValue}
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {pointsAgainstCount?.displayValue}
                                </DataTable.Cell>
                            </DataTable.Row>
                        );
                    })}
                </ScrollView>
            </DataTable>
        );
};
export default StandingsTable;
