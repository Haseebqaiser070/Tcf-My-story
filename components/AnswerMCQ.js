import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../colors/Color';


const RadioButton = ({ selected, isRed, onPress }) => (
  <View onPress={onPress} style={[styles.radioButton, selected && styles.selected, isRed && styles.red]}>
    <View>
    {selected && <View style={[styles.radioButtonInner, isRed ? styles.radioButtonInnerError : styles.radioButtonInner]} >
            {isRed?<Image source={require('../img/cross.png') } style = {{width:20, height:20}}/>:<Image source={require('../img/tick.png')}/>}
        </View>}
    </View>
    
  </View>
);

const TwoViews = () => {
 
  const [selectedViews, setSelectedViews] = useState(['A', 'B']);

  const handleSelectView = (view) => {
    if (!selectedViews.includes(view)) {
      const newSelectedViews = [...selectedViews];
      if (newSelectedViews.length >= 2) {
        newSelectedViews.shift(); // Remove the first element if there are already two selected
      }
      newSelectedViews.push(view);
      setSelectedViews(newSelectedViews);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view} onPress={() => handleSelectView('A')}>
        <View style={styles.label}>
          <Text style={styles.text}>Test</Text>
          <RadioButton selected={selectedViews.includes('A')}  onPress={() => handleSelectView('A')} />
        </View>
      </View>
      <View style={styles.view} onPress={() => handleSelectView('B')}>
        <View style={styles.label}>
          <Text style={styles.text}>hat</Text>
          <RadioButton selected={selectedViews.includes('B')} isRed={selectedViews.includes('B')} onPress={() => handleSelectView('B')} />
        </View>
      </View>
      <View style={styles.view} onPress={() => handleSelectView('C')}>
        <View style={styles.label}>
          <Text style={styles.text}>stylo</Text>
          <RadioButton selected={selectedViews.includes('C')} onPress={() => handleSelectView('C')} />
        </View>
      </View>
      <View style={styles.view} onPress={() => handleSelectView('D')}>
        <View style={styles.label}>
          <Text style={styles.text}>chateux</Text>
          <RadioButton selected={selectedViews.includes('D')} onPress={() => handleSelectView('D')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop:20,
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
  text: {
    flex: 1,
    color: Colors.white
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 40/2,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioButtonInner: {
    width: 22,
    height: 22,
    borderRadius: 30/2,
    backgroundColor: 'green',
    justifyContent:'center',
    alignItems:'center'
  },
  selected: {
    borderColor: 'green',
    borderWidth: 4,
    
  },
  red: {
    borderColor: 'red',
  },

  radioButtonInnerError: {
    width: 22,
    height: 22,
    borderRadius: 30/2,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center'
  },
});

export default TwoViews;
