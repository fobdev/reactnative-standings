import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    View,
} from "react-native";
import { useLeagues, useStanding } from "../hooks";
import { LeaguesData, StandingsNavProp } from "../interfaces";
import { Roboto_300Light, useFonts } from "@expo-google-fonts/roboto";

export const Home = ({ navigation, route }: StandingsNavProp<"Home">) => {
    const [fontLoaded] = useFonts({ Roboto_300Light });
    const { leaguesTasks, getAllLeagues } = useLeagues();

    useEffect(() => {
        getAllLeagues();
    }, [getAllLeagues]);

    if (!fontLoaded)
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        );
    else
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {leaguesTasks?.data!.map((element, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.customButton}
                                key={index}
                                onPress={() => {
                                    navigation.navigate("Standings", {
                                        id: element.id,
                                        abbr: element.abbr,
                                        logos: element.logos,
                                        name: element.name,
                                        slug: element.slug,
                                    });
                                }}
                            >
                                <Image style={styles.image} source={{ uri: element.logos.light }} />
                                <Text style={styles.textBase}>
                                    <Text>{element.name + "\n"}</Text>
                                    <Text style={styles.subtitle}>{element.abbr}</Text>
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        );
};
export default Home;

const styles = StyleSheet.create({
    customButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        marginTop: 5,
    },
    textBase: {
        fontSize: 30,
        fontFamily: "Roboto_300Light",
        flex: 1,
        flexDirection: "column",
        marginLeft: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    image: {
        resizeMode: "center",
        width: 100,
        height: 100,
    },
});
