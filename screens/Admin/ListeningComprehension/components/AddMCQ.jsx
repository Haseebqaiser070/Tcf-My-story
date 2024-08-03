import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../../../colors/Color';

const RadioButton = ({ selected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.radioButton, selected && styles.selected]}>
        {selected && <View style={styles.radioButtonInner}><Text style={{ color: Colors.white }}>✔</Text></View>}
    </TouchableOpacity>
);

const AddMCQ = ({ options, setOptions, correctOptionIndex, setCorrectOptionIndex }) => {
    const handleOptionChange = (index, text) => {
        setOptions(index, text);
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <View style={styles.view} key={index}>
                    <View style={styles.label}>
                        <TextInput
                            style={styles.input}
                            placeholder="Please write option here"
                            placeholderTextColor="#ffffff"
                            selectionColor={Colors.primary}
                            value={option}
                            onChangeText={(text) => handleOptionChange(index, text)}
                        />
                        <RadioButton
                            selected={correctOptionIndex === index}
                            onPress={() => setCorrectOptionIndex(index)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    view: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 10,
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: Colors.white,
    },
    radioButton: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        borderWidth: 2,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    radioButtonInner: {
        width: 22,
        height: 22,
        borderRadius: 30 / 2,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        borderColor: 'green',
        borderWidth: 4,
    },
});

export default AddMCQ;
