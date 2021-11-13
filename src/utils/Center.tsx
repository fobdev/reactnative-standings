import React from "react";
import { View } from "react-native";

interface Props {}

export const Center: React.FC<Props> = ({ children }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{children}</View>
    );
};
export default Center;
