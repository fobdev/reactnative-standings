import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
