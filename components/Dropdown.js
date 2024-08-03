import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colors/Color';
const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelect(option)
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text style={styles.selectedOption}>
          {selectedOption || options[0]}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.option}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex:100
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  selectedOption: {
    flex: 1,
    color:"#fff"
  },
  optionsContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 0,
    right: 0,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  option: {
    padding: 10,
  },
});

export default Dropdown;
