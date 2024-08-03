import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native";
import Colors from "../../../../colors/Color";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import InputField from "../../../../components/Input";  // Import your InputField component

const AddWrittenExpressionCom = () => {
    const [questions, setQuestions] = useState([
        { question: '', correctAnswer: '' }
    ]);
    const [setNumber, setSetNumber] = useState(1);

    useEffect(() => {
        const fetchSetNumber = async () => {
            const setNumberDocRef = doc(db, 'Quiz', 'Written Expression', 'Questions', 'currentSetNumber');
            const docSnap = await getDoc(setNumberDocRef);

            if (docSnap.exists()) {
                setSetNumber(docSnap.data().currentSet);
            } else {
                await setDoc(setNumberDocRef, { currentSet: 1 });
                setSetNumber(1);
            }
        };

        fetchSetNumber();
    }, []);

    const addQuestion = () => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
            { question: '', correctAnswer: '' }
        ]);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const saveMCQ = async () => {
        for (const question of questions) {
            if (!question.question || !question.correctAnswer) {
                Alert.alert('Error', 'Please provide question and its answer as well.');
                return;
            }
        }

        try {
            const setDocRef = doc(db, 'Quiz', 'Written Expression', 'Questions', `set${setNumber}`);
            await setDoc(setDocRef, { questions: questions }, { merge: true });

            // Update the set number in Firestore
            const setNumberDocRef = doc(db, 'Quiz', 'Written Expression', 'Questions', 'currentSetNumber');
            await setDoc(setNumberDocRef, { currentSet: setNumber + 1 });

            Alert.alert('Success', `Question saved successfully in Set ${setNumber}!`);
            setQuestions([{ question: '', correctAnswer: '' }]);
            setSetNumber(prevSetNumber => prevSetNumber + 1);
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Failed to save Question. Please try again.');
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
                        onChangeText={text => updateQuestion(index, 'question', text)}
                    />
                    <InputField
                        hint={'Please add correct answer Here'}
                        value={question.correctAnswer}
                        onVlaueChnaged={text => updateQuestion(index, 'correctAnswer', text)}
                        fontSizePx={20}
                        multilineFlag={true}
                    />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    addQuestionBtn: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
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
        alignSelf: 'center',
    },
    saveBtnStyle: {
        color: Colors.white,
    }
});

export default AddWrittenExpressionCom;
