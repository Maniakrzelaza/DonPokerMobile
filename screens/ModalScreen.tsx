import { StyleSheet, View, ScrollView } from 'react-native';
import WithBackgroundContainer from "../hocs/WithBackgroundContainer";
import PokerCard, { PokerCardMode } from "../components/poker-screen/PokerCard";
import { CardValue, CardValues } from "../constants/model/poker-model";
import { useCallback } from "react";
import Grid from "../components/grid/Grid";
import Colors from "../constants/Colors";

const ModalScreen = () => {
    const renderCard = useCallback((card: CardValue) => (
        <PokerCard
            card={card}
            mode={PokerCardMode.InModal}
            style={styles.card}
        />
    ), []);

  return (
      <View style={styles.container}>
          <ScrollView style={styles.scroll}>
              <Grid
                  items={CardValues}
                  renderItem={renderCard}
                  columns={3}
                  padding={5}
              />
          </ScrollView>
      </View>
  );
}

export default WithBackgroundContainer(ModalScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
    backgroundColor: Colors.primaryDark,
  },
  card: {
      width: "100%",
  },
  scroll: {
      maxWidth: "100%",
      paddingRight: 5,
  },
});
