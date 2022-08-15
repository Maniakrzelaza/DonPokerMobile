import { StyleSheet, Text } from 'react-native';
import { RootTabScreenProps } from "../types";
import WithBackgroundContainer from "../hocs/WithBackgroundContainer";
import useInput from "../hooks/forms/useInput";
import React, { useCallback } from "react";
import useOutlineButton from "../hooks/forms/useOutlineButton";
import { addYourselfToRoom } from "../redux/firebase";
import { useDispatch } from 'react-redux';
import { addRoomId, changeName } from "../redux/slices/mainSlice";

const JoinScreen = ({ navigation }: RootTabScreenProps<'Join'>) => {
    const { value: name, NumberInputComponent } = useInput({
        placeholder: "Enter name",
        keyboardType: "default",
    })
    const {
        value: roomCodeValue,
        NumberInputComponent: roomCodeComponent,
    } = useInput({ placeholder: "Enter room code", keyboardType: "numeric" })

    const dispatch = useDispatch();

    const onCreateRoomPress = useCallback(() => {
        addYourselfToRoom(name, roomCodeValue)
            .then(async () => {
                await dispatch(addRoomId(roomCodeValue));
                await dispatch(changeName(name));
            })
    }, [name, roomCodeValue]);

    const { button } = useOutlineButton({ text: "Join Room", onPressCallback: onCreateRoomPress })
    return (
        <>
            <Text style={styles.title}>Join Room</Text>
            {NumberInputComponent}
            {roomCodeComponent}
            {button}
        </>
    );
}

// @ts-ignore
export default WithBackgroundContainer(JoinScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

