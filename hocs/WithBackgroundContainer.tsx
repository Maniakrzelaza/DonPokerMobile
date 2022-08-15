import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const WithBackgroundContainer = (Comp: React.ComponentType<any>) => (props: any) => {
    return (
        <LinearGradient
            colors={[Colors.primaryPurple, Colors.primaryPink]}
            style={styles.container}
        >
            <Comp { ...props } />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default WithBackgroundContainer;