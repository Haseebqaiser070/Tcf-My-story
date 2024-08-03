import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import Colors from "../colors/Color";

// RadioButton component definition
const RadioButton = ({ selected, isCorrect }) => (
    <View style={[styles.radioButton, selected && styles.selected, selected && !isCorrect && styles.red]}>
      {selected && (
          <View style={[styles.radioButtonInner, isCorrect ? styles.radioButtonInnerCorrect : styles.radioButtonInnerError]}>
            <Image source={isCorrect ? require('../img/tick.png') : require('../img/cross.png')} style={isCorrect ? styles.tickIcon : styles.crossIcon} />
          </View>
      )}
    </View>
);

// Main AnswerSheet component
const AnswerSheet = () => {
  const Navigator = useNavigation();
  const route = useRoute();
  const { questions, answers } = route.params; // Get questions and answers from route params

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Navigator.navigate('result', { data: "AS" });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
      <View style={examModuleStyle.mainConatiner}>
        <ScrollView>
          <View style={examModuleStyle.subContainer}>
            <View style={ssStyle.actionBar}>
              <TouchableOpacity style={ssStyle.backButton} onPress={() => Navigator.goBack()}>
                <Image source={require("../img/back.png")} />
              </TouchableOpacity>
              <View style={ssStyle.heading}>
                <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                  Exam Module
                </Text>
              </View>
            </View>
            <View style={examModuleStyle.contentContainer}>
              <View style={examModuleStyle.progressActionBar}>
                <View style={examModuleStyle.countChip}>
                  <Text style={{ color: Colors.white }}>{currentQuestionIndex + 1}/{questions.length}</Text>
                </View>
              </View>
              <View style={examModuleStyle.questionConatiner}>
                <Text style={examModuleStyle.questionText}>
                  {currentQuestion.question}
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                {currentQuestion.options.map((option, optionIndex) => {
                  const isSelected = answers[currentQuestionIndex] === optionIndex;
                  const isCorrect = currentQuestion.correctOptionIndex === optionIndex;
                  return (
                      <View key={optionIndex} style={{ marginVertical: 10 }}>
                        <View style={styles.view}>
                          <View style={styles.label}>
                            <Text style={styles.text}>{option}</Text>
                            <RadioButton
                                selected={isSelected || isCorrect}
                                isCorrect={isCorrect}
                            />
                          </View>
                        </View>
                      </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
        {currentQuestionIndex < questions.length - 1 && (
            <View style={examModuleStyle.bottomNavigation}>
              <View style={examModuleStyle.btnBottom}>
                <TouchableOpacity style={examModuleStyle.btnSkip}>
                  <Text style={{ color: Colors.backGround }}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={examModuleStyle.btnNext} onPress={handleNext}>
                  <Text style={examModuleStyle.btnTextColor}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInnerCorrect: {
    backgroundColor: 'green',
  },
  radioButtonInnerError: {
    backgroundColor: 'red',
  },
  selected: {
    borderColor: 'green',
    borderWidth: 4,
  },
  red: {
    borderColor: 'red',
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
  crossIcon: {
    width: 20,
    height: 20,
  },
});

export default AnswerSheet;
