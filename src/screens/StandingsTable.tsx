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
                        {["P", "J", "V", "SG", "GP", "GC"].map((element, index) => {
                            return (
                                <DataTable.Title numeric key={index}>
                                    {element}
                                </DataTable.Title>
                            );
                        })}
                    </DataTable.Header>
                    {standingTasks?.data!.standings.map((element, index) => {
                        const findCount = (name: string) => {
                            return element.stats.find((current) => current.name === name);
                        };

                        const winCount = findCount("wins");
                        const pointsCount = findCount("points");
                        const pointsForCount = findCount("pointsFor");
                        const gamesPlayedCount = findCount("gamesPlayed");
                        const pointsAgainstCount = findCount("pointsAgainst");
                        const pointDifferentialCount = findCount("pointDifferential");

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
                                {[
                                    winCount?.displayValue,
                                    gamesPlayedCount?.displayValue,
                                    pointsCount?.displayValue,
                                    pointDifferentialCount?.displayValue,
                                    pointsForCount?.displayValue,
                                    pointsAgainstCount?.displayValue,
                                ].map((element, index) => {
                                    return (
                                        <DataTable.Cell numeric key={index}>
                                            {element}
                                        </DataTable.Cell>
                                    );
                                })}
                            </DataTable.Row>
                        );
                    })}
                </ScrollView>
            </DataTable>
        );
};
export default StandingsTable;
