import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import examModuleStyle from "../../style/examModule";
import ssStyle from "../../style/ssstyle";
import resultStyle from "../../style/resultStyle";
import ModalComponent from "../../components/ConfirmModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../colors/Color";
import ResultModal from "../../components/ResultModal";
import { useProgressBar } from "../../context/ProgressBarContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useUser } from "../../context/UserContext";

const updateUserPoints = async (userDocId, points) => {
  try {
    const userDocRef = doc(db, "users", userDocId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentPoints = userData.points || 0;

      await updateDoc(userDocRef, { points: currentPoints + points });
    } else {
      await setDoc(userDocRef, { points: points });
    }
  } catch (error) {
    console.error("Error updating user points:", error);
  }
};

const WrittenExpResult = () => {
  const { user } = useUser();
  const { setId, totalTime } = useRoute().params;
  const { userAnswers, questions } = useRoute().params || {
    userAnswers: [],
    questions: [],
  };
  const Navigator = useNavigation();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setStopTimer } = useProgressBar();

  useEffect(() => {
    setStopTimer(true);

    const calculatePoints = async () => {
      if (questions && user) {
        let correct = 0;
        questions?.forEach((question, index) => {
          if (userAnswers[index] !== undefined) {
            if (
              question.correctAnswer.trim().toLowerCase() ===
              userAnswers[index].trim().toLowerCase()
            ) {
              correct++;
            }
          }
        });
        setCorrectAnswers(correct);
        setIncorrectAnswers(questions?.length - correct);

        const gainedPoints = correct * 15;

        await updateUserPoints(user.id, gainedPoints);
      }
    };

    calculatePoints();
  }, [userAnswers, questions, setStopTimer]);

  const confirmExit = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onRedirect = () => {
    setIsOpen(false);
    Navigator.navigate("dashboard");
  };

  const restartExam = () => {
    setShowModal(false);
    Navigator.navigate("writtenExam", { restart: true, setId });
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      return `${timeInSeconds} seconds`;
    } else {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes} minute(s) and ${seconds} seconds`;
    }
  };

  return (
    <>
      {showModal && (
        <ResultModal restartExam={restartExam} setShowModal={setShowModal} />
      )}
      <View style={examModuleStyle.mainConatiner}>
        <ScrollView style={{ display: "flex", flexDirection: "column" }}>
          <View style={examModuleStyle.subContainer}>
            <View style={ssStyle.actionBar}>
              <View style={ssStyle.heading}>
                <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                  Written Exp Result
                </Text>
              </View>
            </View>
            <View style={examModuleStyle.contentContainer}>
              <View>
                <View style={resultStyle.resultBox}>
                  <View style={resultStyle.topContent}>
                    <View style={resultStyle.textBox}>
                      <Text style={resultStyle.textColorWhite}>
                        You have completed your exam! Here are the correct
                        answers you could have written.
                      </Text>
                    </View>
                  </View>
                  <View style={resultStyle.horizontalDivider} />
                  <View style={{ marginBottom: 20 }}>
                    <View style={resultStyle.bottomHeading}>
                      <Text style={resultStyle.tiltHeadingColor}>TYPE</Text>
                      <Text style={resultStyle.tiltHeadingColor}>
                        EST. TIME
                      </Text>
                    </View>
                    <View style={resultStyle.bottomHeading}>
                      <Text style={resultStyle.textColorWhite}>
                        Written Expression
                      </Text>
                      <Text style={resultStyle.textColorWhite}>
                        {formatTime(totalTime)}
                      </Text>
                    </View>
                  </View>
                </View>
                {questions?.map((question, index) => (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: Colors.white,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      >
                        Question {index + 1}: {question.question}
                      </Text>
                    </View>
                    <View style={resultStyle.blueBox}>
                      <Text style={{ color: Colors.textColorRegister }}>
                        ANSWER YOU HAVE WRITTEN
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.white,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      >
                        {userAnswers[index]}
                      </Text>
                    </View>
                    <View style={resultStyle.blueBox}>
                      <Text style={{ color: Colors.textColorRegister }}>
                        ANSWER YOU COULD HAVE WRITTEN
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.white,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      >
                        {question.correctAnswer}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={resultStyle.horizontalDividerBlack} />
                <View style={resultStyle.boxTest}>
                  <View style={resultStyle.assRes}>
                    <View style={resultStyle.assFirstSection}>
                      <Text style={resultStyle.textColorGray}>Report</Text>
                      <View style={resultStyle.answerContainer}>
                        <Text style={resultStyle.chipCorrect}>
                          {correctAnswers}/{questions?.length}
                        </Text>
                        <Text style={resultStyle.textColorWhite}>
                          Correct Answers
                        </Text>
                      </View>
                      <View style={resultStyle.answerContainer}>
                        <Text
                          style={[
                            resultStyle.chipCorrect,
                            { backgroundColor: Colors.redChip },
                          ]}
                        >
                          {incorrectAnswers}/{questions?.length}
                        </Text>
                        <Text style={resultStyle.textColorWhite}>
                          Incorrect Answers
                        </Text>
                      </View>
                      {/*<TouchableOpacity*/}
                      {/*  style={resultStyle.assExamBtn}*/}
                      {/*  onPress={() => {*/}
                      {/*    Navigator.navigate("answer", {*/}
                      {/*      questions,*/}
                      {/*      userAnswers,*/}
                      {/*    });*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  <Text style={resultStyle.textColorWhite}>*/}
                      {/*    Assess My Exam*/}
                      {/*  </Text>*/}
                      {/*</TouchableOpacity>*/}
                    </View>
                    <View>
                      <View>
                        <Image
                          style={{ width: 100, height: 100 }}
                          source={require("../../img/circlepro.png")}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={resultStyle.leaveExamBtn}>
            <Text style={resultStyle.textColorWhite}>Restart Exam</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmExit}>
          <View style={resultStyle.bottomButton}>
            <Text style={resultStyle.textColorWhite}>Leave Exam</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onRedirect={onRedirect}
        message={"Are you sure you want to leave the exam?"}
      />
    </>
  );
};

export default WrittenExpResult;
