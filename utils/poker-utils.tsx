import { cardKeyToCardValue, ICardKeys } from "../constants/model/poker-model";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

export const renderPlayerPoint = (
    card: ICardKeys,
    textStyle?: StyleProp<TextStyle>,
    size = 30,
) =>
    card === ICardKeys.Coffee ? (
        <MaterialCommunityIcons size={size} name="coffee" color="white" />
    ) : (
        <Text style={textStyle}>
            {cardKeyToCardValue(card).text}
        </Text>
    )