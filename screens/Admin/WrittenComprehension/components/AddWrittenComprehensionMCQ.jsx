import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Colors from "../../../../colors/Color";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import AddMCQ from "./AddMCQ";
import { useNavigation } from "@react-navigation/native";

const AddWrittenMCQCom = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: -1,
      tip: "",
    },
  ]);
  const [setNumber, setSetNumber] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSetNumber = async () => {
      const setNumberDoc = doc(
        db,
        "Quiz",
        "Written Comprehension",
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
        question: "",
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

  const saveMCQ = async () => {
    for (const question of questions) {
      if (
        !question.question ||
        question.options.some((option) => !option) ||
        question.correctOptionIndex === -1
      ) {
        Alert.alert(
          "Error",
          "Please fill in all fields and select a correct option for each question.",
        );
        return;
      }
    }

    try {
      // Save the current set's questions
      const setDocRef = doc(
        db,
        "Quiz",
        "Written Comprehension",
        "Mcqs",
        `set${setNumber}`,
      );
      await setDoc(setDocRef, { questions: questions }, { merge: true });

      // Update the set number for the next set
      const newSetNumber = setNumber + 1;
      const setNumberDoc = doc(
        db,
        "Quiz",
        "Written Comprehension",
        "Mcqs",
        "currentSetNumber",
      );
      await setDoc(setNumberDoc, { currentSet: newSetNumber });

      // Update the state with the new set number
      setSetNumber(newSetNumber);

      // Show the success alert with the updated set number
      Alert.alert("Success", `MCQs updated successfully in Set ${setNumber}!`);

      // Clear questions and navigate back
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctOptionIndex: -1,
          tip: "",
        },
      ]);
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
          <TextInput
            style={styles.input}
            placeholder="Please add question Here"
            placeholderTextColor="#ffffff"
            selectionColor={Colors.primary}
            value={question.question}
            onChangeText={(text) => updateQuestion(index, "question", text)}
          />
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
          <Text style={styles.saveBtnStyle}>Save MCQS</Text>
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
  input: {
    backgroundColor: Colors.cardBf,
    borderRadius: 3,
    padding: 10,
    color: Colors.white,
    marginBottom: 10,
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
});

export default AddWrittenMCQCom;
