import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import Colors from "../../../../colors/Color";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import InputField from "../../../../components/Input";
import { useRoute, useNavigation } from "@react-navigation/native";
import examModuleStyle from "../../../../style/examModule";
import ssStyle from "../../../../style/ssstyle";

const EditWrittenExpression = () => {
  const [questions, setQuestions] = useState([
    { question: "", correctAnswer: "", tip: "" },
  ]);
  const [setNumber, setSetNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 1;
  const route = useRoute();
  const { setId } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSetDetails = async () => {
      if (setId) {
        const setDocRef = doc(
          db,
          "Quiz",
          "Written Expression",
          "Questions",
          setId,
        );
        const docSnap = await getDoc(setDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setQuestions(data.questions || [{ question: "", correctAnswer: "" }]);
          setSetNumber(parseInt(setId.replace("set", "")));
        } else {
          Alert.alert("Error", "Set not found.");
        }
      } else {
        const setNumberDocRef = doc(
          db,
          "Quiz",
          "Written Expression",
          "Questions",
          "currentSetNumber",
        );
        const docSnap = await getDoc(setNumberDocRef);

        if (docSnap.exists()) {
          setSetNumber(docSnap.data().currentSet);
        } else {
          await setDoc(setNumberDocRef, { currentSet: 1 });
          setSetNumber(1);
        }
      }
    };

    fetchSetDetails();
  }, [setId]);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", correctAnswer: "", tip: "" },
    ]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const saveMCQ = async () => {
    for (const question of questions) {
      if (!question.question || !question.correctAnswer) {
        Alert.alert("Error", "Please provide question and its answer as well.");
        return;
      }
    }

    try {
      const setDocRef = doc(
        db,
        "Quiz",
        "Written Expression",
        "Questions",
        `set${setNumber}`,
      );
      await setDoc(setDocRef, { questions: questions }, { merge: true });

      if (!setId) {
        const setNumberDocRef = doc(
          db,
          "Quiz",
          "Written Expression",
          "Questions",
          "currentSetNumber",
        );
        await setDoc(setNumberDocRef, { currentSet: setNumber + 1 });
      }

      Alert.alert("Success", `Question updated successfully`);
      if (!setId) setSetNumber((prevSetNumber) => prevSetNumber + 1);
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to save Question. Please try again.");
    }
  };

  const getQuestionsForCurrentPage = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return questions.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <View style={examModuleStyle.mainConatiner}>
      <ScrollView>
        <View style={examModuleStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity
              style={ssStyle.backButton}
              onPress={() => navigation.navigate("WrittenExpressionSets")}
            >
              <Image source={require("../../../../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                Edit Written Expression Question
              </Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <ScrollView contentContainerStyle={styles.container}>
              {getQuestionsForCurrentPage().map((question, idx) => {
                const globalIndex = currentPage * questionsPerPage + idx;
                return (
                  <View key={globalIndex} style={styles.questionContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Please add question Here"
                      placeholderTextColor="#ffffff"
                      selectionColor={Colors.primary}
                      value={question.question}
                      onChangeText={(text) =>
                        updateQuestion(globalIndex, "question", text)
                      }
                    />
                    <InputField
                      inputValue={question.correctAnswer}
                      hint={"Please add correct answer Here"}
                      value={question.correctAnswer}
                      onVlaueChnaged={(text) =>
                        updateQuestion(globalIndex, "correctAnswer", text)
                      }
                      fontSizePx={20}
                      multilineFlag={true}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Please add tip here"
                      placeholderTextColor="#ffffff"
                      selectionColor={Colors.primary}
                      value={question.tip}
                      onChangeText={(text) =>
                        updateQuestion(globalIndex, "tip", text)
                      } // Use globalIndex to update the correct item
                    />
                  </View>
                );
              })}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addQuestionBtn}
                  onPress={addQuestion}
                >
                  <Text style={styles.textColor}>{" + Add a Question"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.savebtn} onPress={saveMCQ}>
                  <Text style={styles.saveBtnStyle}>Save MCQS</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  onPress={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  <Text
                    style={[
                      styles.paginationText,
                      {
                        color: currentPage === 0 ? Colors.gray : Colors.primary,
                      },
                    ]}
                  >
                    Previous
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextPage}
                  disabled={
                    (currentPage + 1) * questionsPerPage >= questions.length
                  }
                >
                  <Text
                    style={[
                      styles.paginationText,
                      {
                        color:
                          (currentPage + 1) * questionsPerPage >=
                          questions.length
                            ? Colors.gray
                            : Colors.primary,
                      },
                    ]}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: Colors.cardBf,
    borderRadius: 3,
    padding: 10,
    color: Colors.white,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  addQuestionBtn: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  textColor: {
    color: Colors.white,
  },
  savebtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    fontSize: 18,
    borderRadius: 30,
    alignSelf: "center",
  },
  saveBtnStyle: {
    color: Colors.white,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paginationText: {
    fontSize: 16,
  },
  pageNumber: {
    fontSize: 16,
    alignSelf: "center",
  },
});

export default EditWrittenExpression;
