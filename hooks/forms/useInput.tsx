import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Colors from "../../constants/Colors";

type INumberInputProps = {
    placeholder: string,
    keyboardType: KeyboardTypeOptions
}

const useInput = ({ placeholder, keyboardType }: INumberInputProps) => {
    const [value, setValue] = useState("");

    const onValueChange = useCallback((input: any) => {
        setValue(input);
    }, [setValue]);

    const NumberInputComponent = useMemo(() => (
        <TextInput
            onChangeText={onValueChange}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={styles.input}
            placeholderTextColor="white"
        />
    ), [onValueChange, value, placeholder]);

    return {
        value,
        onValueChange,
        NumberInputComponent,
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: "100%",
        maxWidth: 300,
        color: "white",
        backgroundColor: Colors.primaryDark,
        borderColor: "white",
    },
});

export default useInput;