import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, {useCallback, useMemo} from "react";
import { IPlayer } from "../../redux/model/mainSliceModel";
import Colors from "../../constants/Colors";
import { renderPlayerPoint } from "../../utils/poker-utils";
import { ICardKeys } from "../../constants/model/poker-model";
import { FontAwesome } from "@expo/vector-icons";

type IPlayerListProps = {
    players: IPlayer[],
}

const PlayerList: React.FC<IPlayerListProps> = ({
     players,
}) => {
    const showChoices = useMemo(() => players.every(p => p.point !== ""), [players]);

    const getIcon = useCallback((player: IPlayer) => {
        if (showChoices) {
            return renderPlayerPoint(player.point as ICardKeys, styles.text, 20)
        } else if (player.point !== "") {
            return (
                <FontAwesome name="check" size={20} color="white" />
            );
        } else if (player.point === "") {
            return (
                <Text style={styles.text}>
                    ?
                </Text>
            );
        }
    }, [showChoices]);

    return (
        <ScrollView style={styles.container}>
            {players.map((player, i) => (
                <View style={styles.row} key={i}>
                    <Text style={styles.text}>{player.playerName}</Text>
                    {getIcon(player)}
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        flex: 1,
        backgroundColor: Colors.primaryDark,
    },
    row: {
      height: 30,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
        color: "white",
        fontSize: 20,
    }
})

export default PlayerList;