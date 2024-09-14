import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import examModuleStyle from "../../style/examModule";
import ssStyle from "../../style/ssstyle";
import ProgressBar from "../../components/ProgressBar";
import InputField from "../../components/Input";
import Dialoge from "../../components/Dialoge";
import Colors from "../../colors/Color";
import { useProgressBar } from "../../context/ProgressBarContext";

const WrittenExam = ({ route }) => {
  const Navigator = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsopen] = useState(false);
  const { restartProgress, totalTime, setTotalTime } = useProgressBar();
  const { setId } = route.params;

  useEffect(() => {
    if (route.params && route.params.restart) {
      restartExam();
    } else {
      fetchQuestionsFromFirestore();
    }
    restartProgress();
    setTotalTime(0); // Reset total time when starting or restarting the exam
  }, [route.params, setId]);

  const fetchQuestionsFromFirestore = async () => {
    if (!setId) {
      // console.error("setId is required to fetch questions");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "Quiz", "Written Expression", "Questions", setId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        console.log("No such document!");
        setQuestions([]);
      } else {
        const data = docSnapshot.data();
        if (Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          console.log("Questions field is not an array:", data.questions);
          setQuestions([]);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching document:", error);
      setLoading(false);
    }
  };

  const restartExam = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setLoading(true);
    fetchQuestionsFromFirestore();
  };

  const openTip = () => {
    setIsopen(true);
  };

  const onClose = () => {
    setIsopen(false);
  };

  const handleAnswerChange = (value) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Navigator.navigate("writtenExpResult", {
        userAnswers,
        questions,
        setId,
        totalTime,
      });
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Navigator.navigate("writtenExpResult", {
        userAnswers,
        questions,
        setId,
        totalTime,
      });
    }
  };

  if (loading) {
    return (
      <View
        style={[
          examModuleStyle.mainConatiner,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View
        style={[
          examModuleStyle.mainConatiner,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: Colors.primary }}>No questions available.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <View style={examModuleStyle.mainConatiner}>
        <ScrollView>
          <View style={examModuleStyle.subContainer}>
            <View style={ssStyle.actionBar}>
              <TouchableOpacity
                style={ssStyle.backButton}
                onPress={() => Navigator.goBack()}
              >
                <Image source={require("../../img/back.png")} />
              </TouchableOpacity>
              <View style={ssStyle.heading}>
                <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                  Exam Module
                </Text>
              </View>
            </View>
            <View style={examModuleStyle.contentContainer}>
              <View style={examModuleStyle.progressActionBar}>
                <View style={examModuleStyle.progressWidth}>
                  <ProgressBar
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    onQuestionComplete={handleNextQuestion}
                  />
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={examModuleStyle.verticalDivider} />
                </View>
                <TouchableOpacity
                  style={examModuleStyle.countChip}
                  onPress={openTip}
                >
                  <Text style={{ color: Colors.white }}>Tips</Text>
                </TouchableOpacity>
              </View>
              <View style={examModuleStyle.questionConatiner}>
                <Text style={examModuleStyle.questionText}>
                  {currentQuestion
                    ? currentQuestion.question
                    : "Loading question..."}
                </Text>
              </View>
              <View style={{ marginTop: 50 }}>
                <InputField
                  hint={"Write your answer here"}
                  multilieflag={true}
                  onVlaueChnaged={(value) => handleAnswerChange(value)}
                  fontSizePx={20}
                  value={userAnswers[currentQuestionIndex] || ""}
                  key={currentQuestionIndex} // Adding key forces the InputField to re-render when question changes
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={examModuleStyle.bottomNavigation}>
          <View style={examModuleStyle.btnBottom}>
            <TouchableOpacity
              style={examModuleStyle.btnSkip}
              onPress={handleSkip}
            >
              <Text style={examModuleStyle.btnSkipTextDecor}>Skip</Text>
            </TouchableOpacity>
            <View style={examModuleStyle.ValueChip}>
              <Text style={{ fontWeight: "bold" }}>
                {currentQuestionIndex + 1}/{questions.length}
              </Text>
            </View>
            <TouchableOpacity
              style={examModuleStyle.btnNext}
              onPress={handleNextQuestion}
            >
              <Text style={examModuleStyle.btnTextColor}>
                {currentQuestionIndex < questions.length - 1
                  ? "Next"
                  : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Dialoge
        isOpen={isOpen}
        onClose={onClose}
        title={"Tip"}
        message={currentQuestion?.tip || "Think out of the box to create it"}
      />
    </>
  );
};

export default WrittenExam;
