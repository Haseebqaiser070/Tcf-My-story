import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import Colors from "../../../../colors/Color";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import AddMCQ from "./AddMCQ";
import examModuleStyle from "../../../../style/examModule";
import ssStyle from "../../../../style/ssstyle";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditWrittenComprehension = () => {
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctOptionIndex: -1 }
    ]);
    const [setNumber, setSetNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 1;  // Number of questions per page
    const Navigator = useNavigation();
    const route = useRoute();
    const { setId } = route.params || {};  // Retrieve the dynamic parameter `d` from navigation params

    useEffect(() => {
        const fetchSetDetails = async () => {
            if (setId) {
                // Fetch the set details based on the dynamic parameter `d`
                const setDocRef = doc(db, 'Quiz', 'Written Comprehension', 'Mcqs', setId);
                const docSnap = await getDoc(setDocRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setQuestions(data.questions || [{ question: '', options: ['', '', '', ''], correctOptionIndex: -1 }]);
                    setSetNumber(parseInt(setId.replace('set', '')));
                } else {
                    Alert.alert('Error', 'Set not found.');
                }
            } else {
                // Fetch the current set number for a new set
                const setNumberDoc = doc(db, 'Quiz', 'Written Comprehension', 'Mcqs', 'currentSetNumber');
                const docSnap = await getDoc(setNumberDoc);

                if (docSnap.exists()) {
                    setSetNumber(docSnap.data().currentSet);
                } else {
                    await setDoc(setNumberDoc, { currentSet: 1 });
                    setSetNumber(1);
                }
            }
        };

        fetchSetDetails();
    }, [setId]);

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
            const setDocRef = doc(db, 'Quiz', 'Written Comprehension', 'Mcqs', `set${setNumber}`);
            await setDoc(setDocRef, { questions: questions }, { merge: true });

            const setNumberDoc = doc(db, 'Quiz', 'Written Comprehension', 'Mcqs', 'currentSetNumber');
            await setDoc(setNumberDoc, { currentSet: setNumber + 1 });

            Alert.alert('Success', `MCQs updated successfully in Set ${setNumber}!`);
            setQuestions([{ question: '', options: ['', '', '', ''], correctOptionIndex: -1 }]);
            setSetNumber(prevSetNumber => prevSetNumber + 1);
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Failed to save MCQs. Please try again.');
        }
    };

    // Helper function to get questions for the current page
    const getQuestionsForCurrentPage = () => {
        const startIndex = currentPage * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;
        return questions.slice(startIndex, endIndex);
    };

    // Handle page navigation
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * questionsPerPage < questions.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };
    useEffect(() => {
        if (questions.length > (currentPage + 1) * questionsPerPage) {
            handleNextPage();
        }
    }, [questions]);

    return (
        <View style={examModuleStyle.mainConatiner}>
            <ScrollView>
                <View style={examModuleStyle.subContainer}>
                    <View style={ssStyle.actionBar}>
                        <TouchableOpacity style={ssStyle.backButton} onPress={() => Navigator.goBack()}>
                            <Image source={require("../../../../img/back.png")} />
                        </TouchableOpacity>
                        <View style={ssStyle.heading}>
                            <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                                Edit Written Comprehension MCQ
                            </Text>
                        </View>
                    </View>
                    <View style={examModuleStyle.contentContainer}>
                        <ScrollView contentContainerStyle={styles.container}>
                            {getQuestionsForCurrentPage().map((question, index) => (
                                <View key={index} style={styles.questionContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Please add question Here"
                                        placeholderTextColor="#ffffff"
                                        selectionColor={Colors.primary}
                                        value={question.question}
                                        onChangeText={text => updateQuestion(index, 'question', text)}
                                    />
                                    <View style={styles.mcqContainer}>
                                        <Text style={{ color: Colors.extraColor }}>
                                            Checkmark the correct answer
                                        </Text>
                                        <AddMCQ
                                            options={question.options}
                                            setOptions={(oIndex, value) => updateOption(index, oIndex, value)}
                                            correctOptionIndex={question.correctOptionIndex}
                                            setCorrectOptionIndex={(value) => updateQuestion(index, 'correctOptionIndex', value)}
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
                            <View style={styles.paginationContainer}>
                                <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 0}>
                                    <Text style={[styles.paginationText, { color: currentPage === 0 ? Colors.gray : Colors.primary }]}>Previous</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleNextPage} disabled={(currentPage + 1) * questionsPerPage >= questions.length}>
                                    <Text style={[styles.paginationText, { color: (currentPage + 1) * questionsPerPage >= questions.length ? Colors.gray : Colors.primary }]}>Next</Text>
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
    mcqContainer: {
        marginTop: 10,
    },
    bottomBorder: {
        height: 3,
        backgroundColor: Colors.gray,
        marginTop: 20,
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
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    paginationText: {
        fontSize: 16,
        color: Colors.primary,
    },
    pageNumber: {
        fontSize: 16,
        color: Colors.primary,
    },
});

export default EditWrittenComprehension;
