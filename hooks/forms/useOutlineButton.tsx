import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useMemo } from "react";
import Colors from "../../constants/Colors";

type IOutlineButton = {
    onPressCallback: () => void,
    text: string,
}

const useOutlineButton = ({ onPressCallback, text }: IOutlineButton) => {
    const button = useMemo(() => (
        <TouchableOpacity
            onPress={onPressCallback}
            style={styles.container}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    ), [onPressCallback]);

    return {
        button,
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        margin: 12,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "white",
        padding: 10,
        width: "100%",
        maxWidth: 300,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: Colors.primaryDark,
    },
    text: {
        color: "white",
    },
});


export default useOutlineButton;