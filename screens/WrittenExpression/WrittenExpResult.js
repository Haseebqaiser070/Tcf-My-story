import React, {useEffect, useState} from "react";
import {Text, View, TouchableOpacity, ScrollView} from "react-native";
import examModuleStyle from "../../style/examModule";
import ssStyle from "../../style/ssstyle";
import resultStyle from "../../style/resultStyle";
import ModalComponent from "../../components/ConfirmModal";
import Colors from "../../colors/Color";
import {useProgressBar} from '../../context/ProgressBarContext';
import ResultModal from "../../components/ResultModal";
import {useRoute, useNavigation} from "@react-navigation/native";

const WrittenExpResult = ({route}) => {
    const Navigator = useNavigation();
    const {restartProgress} = useProgressBar();
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { setStopTimer } = useProgressBar();
    const {setId, totalTime} = useRoute().params;
    const {userAnswers, questions,} = route?.params || {userAnswers: [], questions: []};

    const confirmExit = () => {
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const onRedirect = () => {
        setIsOpen(false);
        Navigator.navigate('dashboard');
    }

    const restartExam = () => {
        restartProgress(); // Reset the progress bar
        Navigator.navigate('writtenExam', {restart: true, setId});
    };

    useEffect(() => {
        setStopTimer(true);
    }, [userAnswers, questions]);

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
            {showModal && <ResultModal restartExam={restartExam} setShowModal={setShowModal}/>}
            <View style={examModuleStyle.mainConatiner}>
                <ScrollView style={{display: "flex", flexDirection: "column"}}>
                    <View style={examModuleStyle.subContainer}>
                        <View style={ssStyle.actionBar}>
                            <View style={ssStyle.heading}>
                                <Text style={[ssStyle.textColor, {fontSize: 18}]}>Written Exp Result</Text>
                            </View>
                        </View>
                        <View style={examModuleStyle.contentContainer}>
                            <View>
                                <View style={resultStyle.resultBox}>
                                    <View style={resultStyle.topContent}>
                                        <View style={resultStyle.textBox}>
                                            <Text style={resultStyle.textColorWhite}>
                                                You have completed your exam! Here are the correct answers you could
                                                have written.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={resultStyle.horizontalDivider}/>
                                    <View style={{marginBottom: 20}}>
                                        <View style={resultStyle.bottomHeading}>
                                            <Text style={resultStyle.tiltHeadingColor}>TYPE</Text>
                                            <Text style={resultStyle.tiltHeadingColor}>EST. TIME</Text>
                                        </View>
                                        <View style={resultStyle.bottomHeading}>
                                            <Text style={resultStyle.textColorWhite}>Written Expression</Text>
                                            <Text style={resultStyle.textColorWhite}>{formatTime(totalTime)}</Text>
                                        </View>
                                    </View>
                                </View>
                                {questions.map((question, index) => (
                                    <View key={index} style={{marginBottom: 20}}>
                                        <View>
                                            <Text style={{
                                                fontSize: 20,
                                                color: Colors.white,
                                                marginTop: 10,
                                                marginBottom: 10
                                            }}>
                                                Question {index + 1}: {question.question}
                                            </Text>
                                        </View>
                                        <View style={resultStyle.blueBox}>
                                            <Text style={{color: Colors.textColorRegister}}>ANSWER YOU HAVE
                                                WRITTEN</Text>
                                            <Text style={{
                                                fontSize: 15,
                                                color: Colors.white,
                                                marginTop: 10,
                                                marginBottom: 10
                                            }}>
                                                {userAnswers[index]}
                                            </Text>
                                        </View>
                                        <View style={resultStyle.blueBox}>
                                            <Text style={{color: Colors.textColorRegister}}>ANSWER YOU COULD HAVE
                                                WRITTEN</Text>
                                            <Text style={{
                                                fontSize: 15,
                                                color: Colors.white,
                                                marginTop: 10,
                                                marginBottom: 10
                                            }}>
                                                {question.correctAnswer}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
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
                </ScrollView>
            </View>
            <ModalComponent isOpen={isOpen} onClose={onClose} onRedirect={onRedirect}
                            message={"Are you sure you want to leave the exam?"}/>
        </>
    );
};

export default WrittenExpResult;
