import { Text, View, TouchableOpacity, Image,  } from "react-native";
import Dialoge from "../components/Dialoge";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import ProgressBar from "../components/ProgressBar";
import MCRadioButton from "../components/McqQuestion";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Colors from "../colors/Color";
import AudioPlayer from "../components/AudioPlayer";
import { useState } from "react";
const LsiteningModule = () => {
    const Navigator  = useNavigation();
    const [isOpen, setIsopen] = useState(false)
    const openTip = () =>{
      setIsopen(true)
      //change
    }
    const onClose = () =>{
      setIsopen(false)
    }
  return (
    <>
    <View style={examModuleStyle.mainConatiner}>
        <ScrollView>
      <View style={examModuleStyle.subContainer}>
        <View style={ssStyle.actionBar}>
          <TouchableOpacity style={ssStyle.backButton} onPress={()=>{Navigator.goBack()}}>
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
              <Text style = {{color:Colors.white}}>Tips</Text>
            </TouchableOpacity>

          </View>
          <View style={examModuleStyle.questionConatiner}>
            <AudioPlayer></AudioPlayer>
          </View>
          <View style={{ marginTop: 30 }}>
            <MCRadioButton></MCRadioButton>
          </View>
        </View>
      </View>
      </ScrollView>
      <View style = {examModuleStyle.bottomNavigation}>
        <View style = {examModuleStyle.btnBottom}>
        <TouchableOpacity style = {examModuleStyle.btnSkip}>
        <Text style = {examModuleStyle.btnSkipTextDecor}>Skip</Text>
        </TouchableOpacity>

        <View style = {examModuleStyle.ValueChip} > 
        <Text style = {{fontWeight:'bold'}}>1/20</Text>
        </View>

        <TouchableOpacity style = {examModuleStyle.btnNext} onPress={()=>{ Navigator.navigate('result',{data:"LS"})}}> 
        <Text style = {examModuleStyle.btnTextColor}>Next</Text>
        </TouchableOpacity>
        </View>
        
      </View>
      
    </View>

    <Dialoge isOpen={isOpen} onClose={onClose} title = {"Tip"} message={"think out the box to create it"}></Dialoge>
    </>
  );
};

export default LsiteningModule;
