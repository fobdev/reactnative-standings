import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { useLeagues } from "../hooks";
import { StandingsNavProp } from "../interfaces";
import { Roboto_300Light, useFonts } from "@expo-google-fonts/roboto";
import { Center } from "../utils";

export const Home = ({ navigation }: StandingsNavProp<"Home">) => {
    const [loading, setLoading] = useState(true);
    const [fontLoaded] = useFonts({ Roboto_300Light });
    const { leaguesTasks, getAllLeagues } = useLeagues();

    useEffect(() => {
        getAllLeagues().then(() => {
            setLoading(false);
        });
    }, [getAllLeagues]);

    if (loading || !fontLoaded)
        return (
            <Center>
                <ActivityIndicator color="#567d46" size={"large"} />
            </Center>
        );
    else
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
                    {leaguesTasks?.data!.map((element, index) => {
                        /**
                         * Liga removida por conta de um bug no backend relacionada a "chn.1"
                         */
                        if (element.id !== "chn.1")
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
                                    <Image
                                        style={styles.image}
                                        source={{ uri: element.logos.light }}
                                    />
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
        marginVertical: 2,
        backgroundColor: "#fefefe",
        elevation: 1,
    },
    textBase: {
        fontSize: 20,
        fontFamily: "Roboto_300Light",
        flex: 1,
        flexDirection: "column",
        marginLeft: 20,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    image: {
        width: 60,
        height: 60,
        overflow: "hidden",
        resizeMode: "cover",
    },
});
