import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { getPlayerName, getRoomId } from "../../redux/selectors/main-selectors";

const Header: React.FC = () => {
    const playerName = useSelector(getPlayerName);
    const roomId = useSelector(getRoomId)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{playerName}</Text>
            <Text style={styles.text}>{roomId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: "100%",
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
      color: "white",
      fontSize: 20,
    },
})

export default Header;