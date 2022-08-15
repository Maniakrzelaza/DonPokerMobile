import { RootTabScreenProps } from "../types";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import WithBackgroundContainer from "../hocs/WithBackgroundContainer";
import { useSelector } from "react-redux";
import {getPlayerName, getPlayers } from "../redux/selectors/main-selectors";
import PokerCard from "../components/poker-screen/PokerCard";
import { cardKeyToCardValue } from "../constants/model/poker-model";
import { useMemo } from "react";
import PlayerList from "../components/poker-screen/PlayerList";
import Results from "../components/poker-screen/Results";
import Header from "../components/poker-screen/Header";
import {resetVotes} from "../redux/firebase";

const PokerScreen = ({ navigation }: RootTabScreenProps<'Poker'>) => {
    const players = useSelector(getPlayers)
    const playerName = useSelector(getPlayerName)

    const playerCard = useMemo(() => {
       return cardKeyToCardValue((players ?? []).find(p => p.playerName === playerName)?.point)
    }, [players, playerName]);

    return <>
        <Header />
        <View style={styles.card}>
            <PokerCard card={playerCard} />
        </View>
        <View style={styles.playerList}>
            <PlayerList players={players} />
        </View>
        <View style={styles.results}>
            <Results players={players} />
        </View>
        <TouchableOpacity onPress={resetVotes}>
            <Text style={styles.resetVotesText}>Reset Votes</Text>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    card: {
        paddingTop: 10,
        width: "100%",
        height: "auto",
        alignItems: "center",
    },
    playerList: {
        flex: 3,
        width: "100%",
    },
    results: {
        flex: 2,
        width: "100%",
    },
    resetVotesText: {
        color: "white",
        fontSize: 20,
    },
})

export default WithBackgroundContainer(PokerScreen);