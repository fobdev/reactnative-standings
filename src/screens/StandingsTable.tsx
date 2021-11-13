import React, { useEffect, useState } from "react";
import { Text, Image, View } from "react-native";
import { StandingsNavProp } from "../interfaces/stacks/StandingsStack";
import { ActivityIndicator, DataTable } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useStanding } from "../hooks";
import { Center } from "../utils";
import { StandingsResponse } from "../interfaces";
import { Roboto_100Thin, Roboto_300Light, useFonts } from "@expo-google-fonts/roboto";

export const StandingsTable = ({ navigation, route }: StandingsNavProp<"Standings">) => {
    const [loading, setLoading] = useState(true);
    const { standingTasks, getStanding } = useStanding(route.params?.id!);
    const [fontLoaded] = useFonts({ Roboto_300Light, Roboto_100Thin });

    const findCount = (element: StandingsResponse, name: string) => {
        return element.stats.find((current) => current.name === name);
    };

    useEffect(() => {
        navigation.setOptions({ title: route.params?.name });
        getStanding(route.params?.id).then(() => setLoading(false));
    }, [getStanding]);

    if (loading)
        return (
            <Center>
                <ActivityIndicator color="#567d46" size={"large"} />
            </Center>
        );
    else
        return (
            <DataTable>
                <ScrollView overScrollMode="never">
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
                        let bgcolorChange = index % 2 === 0 ? "#efe" : "#fff";

                        const winCount = findCount(element, "wins");
                        const pointsCount = findCount(element, "points");
                        const pointsForCount = findCount(element, "pointsFor");
                        const gamesPlayedCount = findCount(element, "gamesPlayed");
                        const pointsAgainstCount = findCount(element, "pointsAgainst");
                        const pointDifferentialCount = findCount(element, "pointDifferential");

                        return (
                            <TouchableOpacity key={index}>
                                <View>
                                    <DataTable.Row
                                        style={{
                                            alignContent: "center",
                                            backgroundColor: bgcolorChange,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 5,
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View>
                                                <Image
                                                    source={
                                                        element.team!.logos
                                                            ? {
                                                                  uri: element.team.logos[0].href,
                                                                  width: 30,
                                                                  height: 30,
                                                              }
                                                            : require("../../assets/noimage.png")
                                                    }
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ fontFamily: "Roboto_300Light" }}>
                                                    {element.team.displayName.length < 20
                                                        ? element.team.displayName
                                                        : element.team.shortDisplayName}
                                                </Text>
                                            </View>
                                        </View>
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
                                                    <Text style={{ fontFamily: "Roboto_100Thin" }}>
                                                        {element}
                                                    </Text>
                                                </DataTable.Cell>
                                            );
                                        })}
                                    </DataTable.Row>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </DataTable>
        );
};
export default StandingsTable;
