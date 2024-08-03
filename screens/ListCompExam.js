import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import examModuleStyle from '../style/examModule';
import ssStyle from '../style/ssstyle';
import ProgressBar from '../components/ProgressBar';
import MCRadioButton from '../components/McqQuestion';
import Dialoge from '../components/Dialoge';
import Colors from '../colors/Color';
import { useProgressBar } from "../context/ProgressBarContext";
import AudioPlayer from "../components/AudioPlayer";

const ListCompExam = ({ route }) => {
    const Navigator = useNavigation();
    const [isOpen, setIsopen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const { restartProgress } = useProgressBar();

    useEffect(() => {
        if (route.params && route.params.restart) {
            restartExam();
        } else {
            fetchQuestionsFromFirestore();
        }
        restartProgress();
    }, [route.params]);

    const fetchQuestionsFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'questions', 'ListeningComprehension', 'MCQs'));
            const fetchedQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(fetchedQuestions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setLoading(false);
        }
    };

    const restartExam = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setLoading(true);
        fetchQuestionsFromFirestore();
    };

    const openTip = () => {
        setIsopen(true);
    };

    const onClose = () => {
        setIsopen(false);
    };

    const handleOptionSelect = (option) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: option,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            Navigator.navigate('ListCompResults', { data: 'WS', answers, questions });
        }
    };

    const handleSkip = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            Navigator.navigate('ListCompResults', { data: 'WS', answers, questions });
        }
    };

    if (loading) {
        return (
            <View style={[examModuleStyle.mainConatiner, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (questions.length === 0) {
        return (
            <View style={[examModuleStyle.mainConatiner, { justifyContent: 'center', alignItems: 'center' }]}>
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
                            <TouchableOpacity style={ssStyle.backButton} onPress={() => { Navigator.goBack() }}>
                                <Image source={require("../img/back.png")} />
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
                                    <ProgressBar></ProgressBar>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={examModuleStyle.verticalDivider} />
                                </View>
                                <TouchableOpacity style={examModuleStyle.countChip} onPress={openTip}>
                                    <Text style={{ color: Colors.white }}>Tips</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={examModuleStyle.questionConatiner}>
                                <AudioPlayer></AudioPlayer>
                            </View>
                            <View style={{ marginTop: 50 }}>
                                {currentQuestion ? (
                                    <MCRadioButton
                                        options={currentQuestion.options}
                                        onSelect={handleOptionSelect}
                                        selectedOption={answers[currentQuestionIndex]}
                                    />
                                ) : (
                                    <Text>Loading options...</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={examModuleStyle.bottomNavigation}>
                    <View style={examModuleStyle.btnBottom}>
                        <TouchableOpacity style={examModuleStyle.btnSkip} onPress={handleSkip}>
                            <Text style={examModuleStyle.btnSkipTextDecor}>Skip</Text>
                        </TouchableOpacity>
                        <View style={examModuleStyle.ValueChip}>
                            <Text style={{ fontWeight: 'bold' }}>{currentQuestionIndex + 1}/{questions.length}</Text>
                        </View>
                        <TouchableOpacity style={examModuleStyle.btnNext} onPress={handleNext}>
                            <Text style={examModuleStyle.btnTextColor}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Dialoge isOpen={isOpen} onClose={onClose} title={"Tip"} message={"Think out of the box to create it"}></Dialoge>
        </>
    );
};

export default ListCompExam;
