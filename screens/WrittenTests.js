import { Text, View, TouchableOpacity, Image } from "react-native";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import resultStyle from "../style/resultStyle";

import Colors from "../colors/Color";
import writtenComStyle from "../style/writtenCompStyle";
import writtenExp from "../style/writtenExpStyle";

const WrittenExpTest = () => {
  const Navigator = useNavigation();
  return (
    <View style={examModuleStyle.mainConatiner}>
      <ScrollView style={{ display: "flex", flexDirection: "column" }}>
        <View style={examModuleStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity style={ssStyle.backButton} onPress={()=>{Navigator.goBack()}}>
              <Image source={require("../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>Written Expression Test</Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <View>
              <TouchableOpacity style={writtenComStyle.boxTest}  onPress={()=>{Navigator.navigate('writtenExam')}}>
                <View style = {writtenExp.innerContainer}>
                  <Image source={require('../img/ic_exam_set_purple.png')}></Image>
                  <View style = {writtenExp.innerTextContainer}>
                    <Text style = {writtenExp.headingText}>Tache 1 (Presentation)</Text>
                    <Text style = {writtenExp.textDetail}>let's train</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={writtenComStyle.boxTest} >
                <View style = {writtenExp.innerContainer}>
                  <Image source={require('../img/ic_exam_set_pink.png')}></Image>
                  <View style = {writtenExp.innerTextContainer}>
                    <Text style = {writtenExp.headingText}>Tache 1 (Presentation)</Text>
                    <Text style = {writtenExp.textDetail}>let's train</Text>
                  </View>
                </View>
              </TouchableOpacity>

              
              <TouchableOpacity style={writtenComStyle.boxTest} >
                <View style = {writtenExp.innerContainer}>
                  <Image source={require('../img/ic_yellow_exam_set.png')}></Image>
                  <View style = {writtenExp.innerTextContainer}>
                    <Text style = {writtenExp.headingText}>Tache 1 (Presentation)</Text>
                    <Text style = {writtenExp.textDetail}>let's train</Text>
                  </View>
                </View>
              </TouchableOpacity>

             

              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WrittenExpTest;
