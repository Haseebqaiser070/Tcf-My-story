import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import examModuleStyle from "../../../style/examModule";
import ssStyle from "../../../style/ssstyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AddListeningMCQCom from "./components/AddListeningComprehensionMCQ";


const ListeningComprehensionAdmin = () => {
    const Navigator = useNavigation();
    return (
        <View style={examModuleStyle.mainConatiner}>
            <ScrollView>
                <View style={examModuleStyle.subContainer}>
                    <View style={ssStyle.actionBar}>
                        <TouchableOpacity style={ssStyle.backButton} onPress={()=>{Navigator.goBack()}}>
                            <Image source={require("../../../img/back.png")} />
                        </TouchableOpacity>
                        <View style={ssStyle.heading}>
                            <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                                Add Listening Comprehension MCQ
                            </Text>
                        </View>
                    </View>
                    <View style={examModuleStyle.contentContainer}>
                        <AddListeningMCQCom  />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const McqStyles = StyleSheet.create({
});
export default ListeningComprehensionAdmin;
