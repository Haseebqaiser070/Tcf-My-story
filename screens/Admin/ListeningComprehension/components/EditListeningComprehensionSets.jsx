import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Colors from "../../../../colors/Color";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import AddMCQ from "./AddMCQ";
import examModuleStyle from "../../../../style/examModule";
import ssStyle from "../../../../style/ssstyle";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditListeningComprehension = () => {
  const [questions, setQuestions] = useState([
    {
      audioUrl: "",
      options: ["", "", "", ""],
      correctOptionIndex: -1,
      tip: "",
    },
  ]);
  const [setNumber, setSetNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 1; // Number of questions per page
  const Navigator = useNavigation();
  const route = useRoute();
  const { setId } = route.params || {}; // Retrieve the dynamic parameter `setId` from navigation params
  const navigation = useNavigation();

  // Fetch set details from Firestore based on dynamic parameter
  useEffect(() => {
    const fetchSetDetails = async () => {
      try {
        if (setId) {
          const setDocRef = doc(
            db,
            "Quiz",
            "Listening Comprehension",
            "Mcqs",
            setId,
          );
          const docSnap = await getDoc(setDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Fetched set details:", data);
            setQuestions(
              data.questions || [
                {
                  audioUrl: "",
                  options: ["", "", "", ""],
                  correctOptionIndex: -1,
                },
              ],
            );
            setSetNumber(parseInt(setId.replace("set", "")));
          } else {
            Alert.alert("Error", "Set not found.");
          }
        } else {
          const setNumberDoc = doc(
            db,
            "Quiz",
            "Listening Comprehension",
            "Mcqs",
            "currentSetNumber",
          );
          const docSnap = await getDoc(setNumberDoc);

          if (docSnap.exists()) {
            setSetNumber(docSnap.data().currentSet);
          } else {
            await setDoc(setNumberDoc, { currentSet: 1 });
            setSetNumber(1);
          }
        }
      } catch (error) {
        console.error("Error fetching set details:", error);
        Alert.alert("Error", "Failed to fetch set details.");
      }
    };

    fetchSetDetails();
  }, [setId]);

  const addQuestion = () => {
    console.log("Adding a new question");
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { audioUrl: "", options: ["", "", "", ""], correctOptionIndex: -1 },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    console.log(`Updating question ${index}: setting ${field} to ${value}`);
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    console.log(`Updating question ${qIndex} option ${oIndex} to ${value}`);
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const pickAudio = async (questionIndex) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/*"],
      });

      if (result.type === "success") {
        const { uri } = result;
        console.log(`Picked audio for question ${questionIndex}: ${uri}`);
        uploadAudio(uri, questionIndex);
      }
    } catch (error) {
      console.error("Error picking audio: ", error);
      Alert.alert("Error", "Failed to pick audio. Please try again.");
    }
  };

  const uploadAudio = async (uri, questionIndex) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `audios/${fileName}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log(`Uploaded audio URL for question ${questionIndex}: ${url}`);
      updateQuestion(questionIndex, "audioUrl", url);
    } catch (error) {
      console.error("Error uploading audio: ", error);
      Alert.alert("Error", "Failed to upload audio. Please try again.");
    }
  };

  const saveMCQ = async () => {
    for (const question of questions) {
      if (!question.audioUrl) {
        question.audioUrl = "../audios/audio.mp3";
      }
      if (
        question.options.some((option) => !option) ||
        question.correctOptionIndex === -1
      ) {
        Alert.alert(
          "Error",
          "Please fill in all options for each question and mark the correct answer.",
        );
        return;
      }
    }

    try {
      const setDocRef = doc(
        db,
        "Quiz",
        "Listening Comprehension",
        "Mcqs",
        `set${setNumber}`,
      );
      await setDoc(setDocRef, { questions: questions }, { merge: true });

      const setNumberDoc = doc(
        db,
        "Quiz",
        "Listening Comprehension",
        "Mcqs",
        "currentSetNumber",
      );
      await setDoc(setNumberDoc, { currentSet: setNumber + 1 });

      Alert.alert("Success", `MCQs updated successfully`);
      // Keep the state intact after saving
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to save MCQs. Please try again.");
    }
  };

  // Helper function to get questions for the current page
  const getQuestionsForCurrentPage = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    console.log(
      `Questions for page ${currentPage}:`,
      questions.slice(startIndex, endIndex),
    );
    return questions.slice(startIndex, endIndex);
  };

  // Handle page navigation
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (questions.length > (currentPage + 1) * questionsPerPage) {
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
              onPress={() => Navigator.goBack()}
            >
              <Image source={require("../../../../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                Edit Listening Comprehension MCQ
              </Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <ScrollView contentContainerStyle={styles.container}>
              {getQuestionsForCurrentPage().map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => pickAudio(index)}
                  >
                    <Text style={styles.uploadButtonText}>
                      {question.audioUrl ? "Change Audio" : "Upload Audio"}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.mcqContainer}>
                    <Text style={{ color: Colors.extraColor }}>
                      Checkmark the correct answer
                    </Text>
                    <AddMCQ
                      options={question.options}
                      setOptions={(oIndex, value) =>
                        updateOption(
                          currentPage * questionsPerPage + index,
                          oIndex,
                          value,
                        )
                      }
                      correctOptionIndex={question.correctOptionIndex}
                      setCorrectOptionIndex={(value) =>
                        updateQuestion(
                          currentPage * questionsPerPage + index,
                          "correctOptionIndex",
                          value,
                        )
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Please add tip here"
                      placeholderTextColor="#ffffff"
                      selectionColor={Colors.primary}
                      value={question.tip}
                      onChangeText={(text) =>
                        updateQuestion(
                          currentPage * questionsPerPage + index,
                          "tip",
                          text,
                        )
                      }
                    />
                    <View style={styles.bottomBorder} />
                  </View>
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addQuestionBtn}
                  onPress={addQuestion}
                >
                  <Text style={styles.textColor}>{"+ Add a Question"}</Text>
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
  uploadButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  uploadButtonText: {
    color: Colors.white,
  },
  mcqContainer: {
    marginTop: 10,
  },
  bottomBorder: {
    height: 3,
    backgroundColor: Colors.gray,
    marginTop: 20,
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
  input: {
    backgroundColor: Colors.cardBf,
    borderRadius: 3,
    padding: 10,
    color: Colors.white,
    marginBottom: 10,
  },
});

export default EditListeningComprehension;
