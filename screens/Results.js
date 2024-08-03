import {Text, View, TouchableOpacity, Image} from "react-native";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import resultStyle from "../style/resultStyle";
import ModalComponent from "../components/ConfirmModal";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import Colors from "../colors/Color";
import {useProgressBar} from '../context/ProgressBarContext';
import ResultModal from "../components/ResultModal";


const Results = () => {
    const [examType, setExamtype] = useState("");
    const {restartProgress} = useProgressBar();
    const [showModal, setShowModal] = useState(false);
    const route = useRoute();
    const {data} = route?.params
    const Navigator = useNavigation();
    useEffect(() => {
        console.log(data)
        if (data == "LS") {
            setExamtype("Listening")
        } else {
            if (data == "WS") {
                setExamtype("Written")
            }
        }
    })

    const [isOpen, setIsOpen] = useState(false);

    const ConfirMExit = () => {
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
        setShowModal(false)
        restartProgress(); // Reset the progress bar
        if (data === "LS") {
            Navigator.navigate('listen');
        } else if (data === "WS") {
            Navigator.navigate('exammodule');
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
                                <Text style={[ssStyle.textColor, {fontSize: 18}]}>Results</Text>
                            </View>
                        </View>
                        <View style={examModuleStyle.contentContainer}>
                            <View>
                                <View style={resultStyle.resultBox}>
                                    <View style={resultStyle.topContent}>
                                        <View style={resultStyle.textBox}>
                                            <Text style={resultStyle.textColorWhite}>
                                                Congrats, you completed your test with great accuracy.
                                            </Text>
                                        </View>
                                        <View style={resultStyle.imgBox}>
                                            <Image source={require("../img/oval.png")}/>
                                        </View>
                                    </View>
                                    <View style={resultStyle.horizontalDivider}/>
                                    <View style={{marginBottom: 20}}>
                                        <View style={resultStyle.bottomHeading}>
                                            <Text style={resultStyle.tiltHeadingColor}>TYPE</Text>
                                            <Text style={resultStyle.tiltHeadingColor}>EST. TIME</Text>
                                        </View>
                                        <View style={resultStyle.bottomHeading}>
                                            <Text style={resultStyle.textColorWhite}>
                                                {examType} comprehension
                                            </Text>
                                            <Text style={resultStyle.textColorWhite}>14 mins</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={resultStyle.horizontalDividerBlack}/>
                                <View style={resultStyle.boxTest}>
                                    <View style={resultStyle.assRes}>
                                        <View style={resultStyle.assFirstSection}>
                                            <Text style={resultStyle.textColorGray}>Report</Text>
                                            <View style={resultStyle.answerContainer}>
                                                <Text style={resultStyle.chipCorrect}>12/24</Text>
                                                <Text style={resultStyle.textColorWhite}>
                                                    Correct Answer
                                                </Text>
                                            </View>
                                            <View style={resultStyle.answerContainer}>
                                                <Text
                                                    style={[
                                                        resultStyle.chipCorrect,
                                                        {backgroundColor: Colors.redChip},
                                                    ]}
                                                >
                                                    12/24
                                                </Text>
                                                <Text style={resultStyle.textColorWhite}>
                                                    Incorrect Answer
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={resultStyle.assExamBtn} onPress={() => {
                                                Navigator.navigate('written')
                                            }}>
                                                <Text style={resultStyle.textColorWhite}>
                                                    Assess My Exam
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <View>
                                                <Image
                                                    style={{width: 100, height: 100}}
                                                    source={require("../img/circlepro.png")}
                                                ></Image>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <View style={resultStyle.leaveExamBtn} >
                        <Text style={resultStyle.textColorWhite}>Restart Exam</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ConfirMExit}>
                    <View style={resultStyle.bottomButton}>
                        <Text style={resultStyle.textColorWhite}>Leave Exam</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ModalComponent isOpen={isOpen} onClose={onClose} onRedirect={onRedirect}
                            message={"Are you sure to exit the exam "}></ModalComponent>
        </>
    );
};

export default Results;
