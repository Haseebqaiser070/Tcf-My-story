import { Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import examModuleStyle from "../../style/examModule";
import ssStyle from "../../style/ssstyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import resultStyle from "../../style/resultStyle";

import Colors from "../../colors/Color";
import writtenComStyle from "../../style/writtenCompStyle";
import AssesStyle from "../../style/AssesStyle";
import InputField from "../../components/Input";

const WrittenCompAss = () => {
  const [Answer, setAnswer] = useState("");
  const Navigator = useNavigation();
  const onAnswerAdd = (value)=>{
    setAnswer(value);
  }
  return (
    <View style={examModuleStyle.mainConatiner}>
      <ScrollView style={{ display: "flex", flexDirection: "column" }}>
        <View style={examModuleStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity style={ssStyle.backButton}>
              <Image source={require("../../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>Results</Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <View style={AssesStyle.keySample}>
              <Text style={AssesStyle.textColor}>Show Sample Key</Text>
            </View>
            <View style={AssesStyle.question}>
              <Text style={[AssesStyle.questionText, AssesStyle.textColor]}>
                Je te laisse, je dois aller à la poste, je veux... ... un colis
                en Espagne
              </Text>
              <View style  = {AssesStyle.editText}>
                <InputField hint={'write your answer here'} multilieflag={true} onVlaueChnaged={onAnswerAdd} fontSizePx={20}></InputField>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <View style={resultStyle.bottomButton}>
          <Text style={resultStyle.textColorWhite}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WrittenCompAss;
