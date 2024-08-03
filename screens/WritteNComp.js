import { Text, View, TouchableOpacity, Image } from "react-native";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import resultStyle from "../style/resultStyle";

import Colors from "../colors/Color";
import writtenComStyle from "../style/writtenCompStyle";

const WrittenComp = () => {
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
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>Results</Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <View>
              <TouchableOpacity style={writtenComStyle.boxTest} onPress={()=>{Navigator.navigate('answer')}}>
                <View style={resultStyle.assRes}>
                  <View style={writtenComStyle.answerContainer}>
                    <Text style={writtenComStyle.chipCorrect}>12/24</Text>
                  </View>
                </View>
                <View style = {writtenComStyle.questionFormate}>
                  <Text style = {writtenComStyle.questionFormateText}>Helo Qurio What is that loing what is tets ... sty</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={writtenComStyle.boxTest}>
                <View style={resultStyle.assRes}>
                  <View style={writtenComStyle.answerContainer}>
                    <Text style={writtenComStyle.chipCorrect}>12/24</Text>
                  </View>
                </View>
                <View style = {writtenComStyle.questionFormate}>
                  <Text style = {writtenComStyle.questionFormateText}>Helo Qurio What is that loing what is tets ... sty</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={writtenComStyle.boxTest}>
                <View style={resultStyle.assRes}>
                  <View style={writtenComStyle.answerContainer}>
                    <Text style={writtenComStyle.chipCorrect}>12/24</Text>
                  </View>
                </View>
                <View style = {writtenComStyle.questionFormate}>
                  <Text style = {writtenComStyle.questionFormateText}>Helo Qurio What is that loing what is tets ... sty</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={writtenComStyle.boxTest}>
                <View style={resultStyle.assRes}>
                  <View style={writtenComStyle.answerContainer}>
                    <Text style={writtenComStyle.chipCorrect}>12/24</Text>
                  </View>
                </View>
                <View style = {writtenComStyle.questionFormate}>
                  <Text style = {writtenComStyle.questionFormateText}>Helo Qurio What is that loing what is tets ... sty</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={writtenComStyle.boxTest}>
                <View style={resultStyle.assRes}>
                  <View style={writtenComStyle.answerContainer}>
                    <Text style={writtenComStyle.chipCorrect}>12/24</Text>
                  </View>
                </View>
                <View style = {writtenComStyle.questionFormate}>
                  <Text style = {writtenComStyle.questionFormateText}>Helo Qurio What is that loing what is tets ... sty</Text>
                </View>
              </TouchableOpacity>

              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WrittenComp;
