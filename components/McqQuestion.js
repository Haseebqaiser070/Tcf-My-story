import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../colors/Color';

const MCRadioButton = ({ options, onSelect, selectedOption }) => {
  return (
      <View style={styles.container}>
        {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => onSelect(index)}>
              <Text style={styles.optionText}>{option}</Text>
              <View style={[styles.radioButton, selectedOption === index && styles.selected]}>
                {selectedOption === index && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionContainer: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    color: Colors.white,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 40 / 2,
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
    backgroundColor: 'white',
  },
  selected: {
    borderColor: 'green',
    borderWidth: 4,
  },
});

export default MCRadioButton;
