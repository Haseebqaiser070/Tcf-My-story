import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colors/Color';
const CountryDropDown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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
        <Image source={ require('../img/flag.png')} />
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
              <Image source={require('../img/flag.png')}/>
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
  },
  dropdown: {
    width:85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
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

export default CountryDropDown;
