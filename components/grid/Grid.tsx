import React from "react";
import {StyleSheet, View} from "react-native";

type IGridProps<T> = {
    columns: number
    items: T[],
    padding: number
    renderItem: (item: T) => React.ReactNode
}

const Grid = <T,>({
    columns,
    items,
    padding,
    renderItem,
}: IGridProps<T>): JSX.Element => {
    return(
        <View style={styles.container}>
            {items.map((item, i) => (
                <View key={i} style={[styles.item, { width: `${100 / columns}%`, padding }]}>
                    {renderItem(item)}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        backgroundColor: "transparent",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Grid;