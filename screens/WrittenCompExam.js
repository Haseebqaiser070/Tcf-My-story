import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import examModuleStyle from "../style/examModule";
import InputField from "../components/Input";
import ssStyle from "../style/ssstyle";
import ProgressBar from "../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import writtenExamStyle from "../style/WrittenExamStyle";
import Dialoge from "../components/Dialoge";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig"; // Import your Firestore instance

const WrittenExam = () => {
  const Navigator = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestionsFromFirestore();
  }, []);

  const fetchQuestionsFromFirestore = async () => {
    try {
      const paragraphsCollection = collection(db, "questions", "WrittenExpression", "Paragraphs");
      const querySnapshot = await getDocs(paragraphsCollection);
      const fetchedQuestions = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData && docData.question) {
          fetchedQuestions.push(docData.question);
        }
      });
      setQuestions(fetchedQuestions);
      setUserAnswers(Array(fetchedQuestions.length).fill(""));
    } catch (error) {
      console.error("Error fetching questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const openTip = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Navigator.navigate('writtenExpResult', { userAnswers, questions });
    }
  };

  if (loading) {
    return (
        <View style={examModuleStyle.mainConatiner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

  return (
      <>
        <View style={examModuleStyle.mainConatiner}>
          <ScrollView>
            <View style={examModuleStyle.subContainer}>
              <View style={ssStyle.actionBar}>
                <TouchableOpacity style={ssStyle.backButton} onPress={() => Navigator.goBack()}>
                  <Image source={require("../img/back.png")} />
                </TouchableOpacity>
                <View style={ssStyle.heading}>
                  <Text style={[ssStyle.textColor, { fontSize: 18 }]}>Exam Module</Text>
                </View>
              </View>
              <View style={examModuleStyle.contentContainer}>
                <View style={examModuleStyle.progressActionBar}>
                  <View style={examModuleStyle.progressWidth}>
                    <ProgressBar />
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={examModuleStyle.verticalDivider} />
                  </View>
                  <TouchableOpacity style={writtenExamStyle.countChip} onPress={openTip}>
                    <Text style={examModuleStyle.btnTextColor}>Tips</Text>
                  </TouchableOpacity>
                </View>
                {questions.length > 0 && (
                    <View style={examModuleStyle.questionConatiner}>
                      <Text style={examModuleStyle.questionText}>{questions[currentQuestionIndex]}</Text>
                    </View>
                )}
                <View>
                  <Text style={writtenExamStyle.textHeading}>WRITE YOUR ANSWER HERE</Text>
                </View>
                <View style={writtenExamStyle.answerFieldPan}>
                  <InputField
                      hint={"Write your answer here"}
                      multilieflag={true}
                      onVlaueChnaged={(value) => handleAnswerChange(currentQuestionIndex, value)}
                      fontSizePx={20}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={examModuleStyle.bottomNavigation}>
            <View style={writtenExamStyle.btnBottom}>
              <View style={writtenExamStyle.countChipFill}>
                <Text style={{ fontWeight: 'bold' }}>{currentQuestionIndex + 1}/{questions.length}</Text>
              </View>
              <TouchableOpacity style={examModuleStyle.btnNext} onPress={handleNextQuestion}>
                <Text style={examModuleStyle.btnTextColor}>{currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Dialoge isOpen={isOpen} onClose={onClose} title={"Tip"} message={"Think outside the box to create it"} />
      </>
  );
};

export default WrittenExam;
