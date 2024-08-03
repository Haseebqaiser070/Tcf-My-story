import { View, Text, Image } from "react-native";
import ssStyle from "../style/ssstyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import RadioButtons from "../components/Level";
import { useNavigation } from "@react-navigation/native";
import sTwoStyle from "../style/sTwoStyle";
import Colors from "../colors/Color";
const StudyspaceTwo = () => {
  const Navigator = useNavigation();

  const loadNext = () => {
    Navigator.navigate("studyspacetwo");
  };
  return (
    <View style={ssStyle.mainContainer}>
      <ScrollView>
        <View style={ssStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity style={ssStyle.backButton}>
              <Image source={require("../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                New Studyspace
              </Text>
            </View>
          </View>
          <View style={ssStyle.cot}>
            <View style={ssStyle.circleContainer}>
              <View style={ssStyle.circularBox}>
                <Image
                  style={{ marginStart: 20 }}
                  source={require("../img/plant.png")}
                />
              </View>
            </View>
            <View style={ssStyle.userName}>
              <Text style={[ssStyle.textColor, ssStyle.textDat]}>
                Aryan's Studyspace
              </Text>
            </View>
            <View style={ssStyle.basicInfoContainer}>
              <View>
                <Text style={[ssStyle.textFont]}>
                  WHERE DO YOU WANY TO START
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <TouchableOpacity style={sTwoStyle.mainNav}>
                    <Text style={[ssStyle.textColor, { fontSize: 14 }]}>
                      Oral Comprehension
                    </Text>
                    <Image
                      style={sTwoStyle.imageSize}
                      source={require("../img/l_one.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={sTwoStyle.mainNav}>
                    <Text style={[ssStyle.textColor, { fontSize: 14 }]}>
                      Written Comprehension
                    </Text>
                    <Image
                      style={sTwoStyle.imageSize}
                      source={require("../img/l_two.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={sTwoStyle.mainNav}>
                    <Text style={[ssStyle.textColor, { fontSize: 14 }]}>
                      Written Expression
                    </Text>
                    <Image
                      style={sTwoStyle.imageSize}
                      source={require("../img/l_three.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      sTwoStyle.mainNav,
                      { backgroundColor: Colors.gray },
                    ]}
                  >
                    <Text style={[ssStyle.textColor, { fontSize: 14 }]}>
                      Oral Expression{" "}
                      <Image source={require("../img/lock.png")}></Image>
                    </Text>
                    <Image source={require("../img/l_four.png")} />
                  </TouchableOpacity>
                </View>
                <View style={ssStyle.btnContainer}>
                  <TouchableOpacity>
                    <View style={ssStyle.bottomButton}>
                      <Text style={ssStyle.textColor}>Continue</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StudyspaceTwo;
