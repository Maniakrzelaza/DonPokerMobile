import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { IPlayer } from "../../redux/model/mainSliceModel";
import reduce from "lodash/reduce";
import { CardValues, ICardKeys } from "../../constants/model/poker-model";

type IResultsProps = {
    players: IPlayer[],
}

const Results: React.FC<IResultsProps> = ({
    players,
}) => {
    const allPlayersHasVoted = useMemo(() =>
        players.length > 0 && players.every(p => p.point !== ""), [players]);

    const getAvg = useCallback((players: IPlayer[]) => {
        const sum = reduce(players, (sum, player) => {
            return (CardValues.find(c => c.key === player.point)?.value ?? 0) + sum;
        }, 0)
        const numberOfCoffees = players.filter(p => p.point === ICardKeys.Coffee).length;
        return sum / (players.length - numberOfCoffees);
    }, []);

    const votingInProgress = useMemo(() => {
        return <Text style={styles.text}>Voting in progress</Text>
    }, []);

    const votingResult = useMemo(() => {
        return <Text style={styles.text}>Avg: {getAvg(players)}</Text>
    }, [players, getAvg]);

    return(
        <View style={styles.container}>
            {allPlayersHasVoted ? votingResult : votingInProgress}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 10,
        padding: 10,
        flex: 1,
        backgroundColor: Colors.primaryDark,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 30,
    }
})

export default Results;