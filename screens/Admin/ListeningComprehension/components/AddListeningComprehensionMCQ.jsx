import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import Colors from "../../../../colors/Color";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import AddMCQ from "./AddMCQ";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const AddListeningMCQCom = () => {
  const [questions, setQuestions] = useState([
    {
      audioUrl: "",
      options: ["", "", "", ""],
      correctOptionIndex: -1,
      tip: "",
    },
  ]);
  const [setNumber, setSetNumber] = useState(1);
  const navigation = useNavigation(); // Use navigation hook

  // Fetch current set number from Firestore on component mount
  useEffect(() => {
    const fetchSetNumber = async () => {
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
    };

    fetchSetNumber();
  }, []);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        audioUrl: "",
        options: ["", "", "", ""],
        correctOptionIndex: -1,
        tip: "",
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
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
      updateQuestion(questionIndex, "audioUrl", url);
    } catch (error) {
      console.error("Error uploading audio: ", error);
      Alert.alert("Error", "Failed to upload audio. Please try again.");
    }
  };

  const saveMCQ = async () => {
    // Ensure each question has a default audioUrl if not provided
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
      // Save the current set's questions
      const setDocRef = doc(
        db,
        "Quiz",
        "Listening Comprehension",
        "Mcqs",
        `set${setNumber}`,
      );
      await setDoc(setDocRef, { questions: questions }, { merge: true });
      // Increment the set number
      const newSetNumber = setNumber + 1;
      // Update the set number for the next set
      const setNumberDoc = doc(
        db,
        "Quiz",
        "Listening Comprehension",
        "Mcqs",
        "currentSetNumber",
      );
      await setDoc(setNumberDoc, { currentSet: newSetNumber });

      // Show the success alert with the updated set number
      Alert.alert("Success", `MCQs added successfully in Set ${setNumber}!`);
      // Clear questions and navigate back
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctOptionIndex: -1,
          tip: "",
        },
      ]);
      // Update the state with the new set number
      setSetNumber(newSetNumber);
      // Navigate back to the sets screen and refresh it
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to save MCQs. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickAudio(index)}
          >
            <Text style={styles.uploadButtonText}>
              {question.audioUrl ? "Audio Uploaded" : "Upload Audio"}
            </Text>
          </TouchableOpacity>
          <View style={styles.mcqContainer}>
            <Text style={{ color: Colors.extraColor }}>
              Checkmark the correct answer
            </Text>
            <AddMCQ
              options={question.options}
              setOptions={(oIndex, value) => updateOption(index, oIndex, value)}
              correctOptionIndex={question.correctOptionIndex}
              setCorrectOptionIndex={(value) =>
                updateQuestion(index, "correctOptionIndex", value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Please add tip here"
              placeholderTextColor="#ffffff"
              selectionColor={Colors.primary}
              value={question.tip}
              onChangeText={(text) => updateQuestion(index, "tip", text)}
            />
            <View style={styles.bottomBorder} />
          </View>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addQuestionBtn} onPress={addQuestion}>
          <Text style={styles.textColor}>{"+ Add a Question"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.savebtn} onPress={saveMCQ}>
          <Text style={styles.saveBtnStyle}>Save MCQs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  saveBtnStyle: {
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.cardBf,
    borderRadius: 3,
    padding: 10,
    color: Colors.white,
    marginBottom: 10,
  },
});

export default AddListeningMCQCom;
