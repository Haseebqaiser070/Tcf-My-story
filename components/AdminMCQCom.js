import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Colors from "../colors/Color";
import AdminMCQ from "../components/AdminMCQ";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MCQCom = () => {
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctOptionIndex: -1 }
    ]);

    const addQuestion = () => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
            { question: '', options: ['', '', '', ''], correctOptionIndex: -1 }
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
            if (!question.question || question.options.some(option => !option) || question.correctOptionIndex === -1) {
                Alert.alert('Error', 'Please fill in all fields and select a correct option for each question.');
                return;
            }
        }

        try {
            for (const question of questions) {
                await addDoc(collection(db, 'questions', 'WrittenComprehension', 'MCQs'), question);
            }
            Alert.alert('Success', 'MCQs saved successfully!');
            setQuestions([{ question: '', options: ['', '', '', ''], correctOptionIndex: -1 }]);
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Failed to save MCQs. Please try again.');
        }
    };

    return (
        <ScrollView>
            {questions.map((question, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Please add question Here"
                        placeholderTextColor="#ffffff"
                        selectionColor={Colors.primary}
                        value={question.question}
                        onChangeText={text => updateQuestion(index, 'question', text)}
                    />
                    <View style={styles.mcqContainer}>
                        <View>
                            <Text style={{ color: Colors.extraColor }}>
                                Checkmark the correct answer
                            </Text>
                        </View>
                        <AdminMCQ
                            options={question.options}
                            setOptions={(oIndex, value) => updateOption(index, oIndex, value)}
                            correctOptionIndex={question.correctOptionIndex}
                            setCorrectOptionIndex={(value) => updateQuestion(index, 'correctOptionIndex', value)}
                        />
                        <TouchableOpacity style={styles.addQuestionBtn} onPress={addQuestion}>
                            <Text style={styles.textColor}>{"+ Add a Question"}</Text>
                        </TouchableOpacity>
                        <View style={styles.bottomBorder} />
                    </View>
                </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.savebtn} onPress={saveMCQ}>
                    <Text style={styles.saveBtnStyle}>Save MCQ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.cardBf,
        borderRadius: 3,
        padding: 5,
        color: Colors.white,
    },
    mcqContainer: {
        marginTop: 20,
    },
    addQuestionBtn: {
        width: 150,
        marginTop: 10,
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
    bottomBorder: {
        height: 3,
        backgroundColor: Colors.gray,
        marginTop: 20,
    },
    savebtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
    },
    saveBtnStyle: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        padding: 15,
        fontSize: 18,
        borderRadius: 30,
    }
});

export default MCQCom;
