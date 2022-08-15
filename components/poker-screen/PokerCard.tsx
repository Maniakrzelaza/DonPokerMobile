import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { CardValue, ICardKeys } from "../../constants/model/poker-model";
import {changePoint} from "../../redux/slices/mainSlice";
import {upDateYourselfInRoom} from "../../redux/firebase";
import navigationService from "../../redux/navigation-service";
import Colors from "../../constants/Colors";
import {renderPlayerPoint} from "../../utils/poker-utils";

export enum PokerCardMode {
    InModal = 0,
    InPoker = 1,
}

type IPokerCardProps = {
    card: CardValue
    mode?: PokerCardMode
    style?: StyleProp<ViewStyle>
}

const PokerCard: React.FC<IPokerCardProps> = ({
    card,
    mode = PokerCardMode.InPoker,
    style,
}) => {
    const dispatch = useDispatch();

    const onClick = useCallback(async () => {
        if (mode === PokerCardMode.InPoker) {
            navigationService.navigate("Modal")
        } else {
            await dispatch(changePoint( { data: card.key.toString() } ))
            await upDateYourselfInRoom()
            navigationService.navigate("Poker")
        }
    }, [mode, card.key]);

    return(
        <TouchableOpacity onPress={onClick} style={[styles.container, style]}>
            {renderPlayerPoint(card.key as ICardKeys, styles.text)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 2 / 3,
        backgroundColor: Colors.primaryDark,
        width: 100,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    text: {
        fontSize: 30,
        color: "white",
    },
});

export default PokerCard;