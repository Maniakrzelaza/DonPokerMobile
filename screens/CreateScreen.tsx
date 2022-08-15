import { StyleSheet } from 'react-native';

import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import WithBackgroundContainer from "../hocs/WithBackgroundContainer";
import React, { useCallback } from "react";

import useOutlineButton from "../hooks/forms/useOutlineButton";
import useInput from "../hooks/forms/useInput";
import { createRoom } from "../redux/firebase";

type ICreateScreenProps = RootTabScreenProps<'Create'>;

const CreateScreen: React.FC<ICreateScreenProps> = ({ navigation }) => {
    const { value: name, NumberInputComponent } = useInput({
        placeholder: "Enter name",
        keyboardType: "default"
    })

    const onCreateRoomPress = useCallback(() => {
        createRoom(name);
    }, [name]);

    const { button } = useOutlineButton({ text: "Create Room", onPressCallback: onCreateRoomPress })

    return (
        <>
            <Text style={styles.title}>Create room</Text>
            {NumberInputComponent}
            {button}
        </>
    );
}

export default WithBackgroundContainer(CreateScreen);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
    },
});


