import { Text, View, TouchableOpacity, Image } from "react-native";
import examModuleStyle from "../style/examModule";
import ssStyle from "../style/ssstyle";
import ProgressBar from "../components/ProgressBar";
import MCRadioButton from "../components/McqQuestion";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ExamStyle from "../style/ExamStyle";
import ProgressSet from "../components/ProgressSet";

const OralExamSet = () => {
  const Navigator = useNavigation();
  return (
    <View style={examModuleStyle.mainConatiner}>
      <ScrollView>
        <View style={examModuleStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity style={ssStyle.backButton} onPress={()=>{Navigator.goBack()}}>
              <Image source={require("../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                Listening Comprehension Sets
              </Text>
            </View>
          </View>
          <View style={examModuleStyle.contentContainer}>
            <View style={ExamStyle.CardContainer}>
              <TouchableOpacity style={ExamStyle.card} onPress={()=>{ Navigator.navigate('ListCompExam')}}>
                <Image
                  source={require("../img/ic_exam_set_purple.png")}
                ></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 1
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={70}
                    height={5}
                    color={"red"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={ExamStyle.card} onPress={()=>{Navigator.navigate('listen')}}>
                <Image source={require("../img/ic_exam_set_pink.png")}></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 2
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={70}
                    height={5}
                    color={"red"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={ExamStyle.CardContainer}>
              <TouchableOpacity style={ExamStyle.card}>
                <Image source={require("../img/ic_red_exam_set.png")}></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 3
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={70}
                    height={5}
                    color={"red"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={ExamStyle.card}>
                <Image
                  source={require("../img/ic_yellow_exam_set.png")}
                ></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 4
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={70}
                    height={5}
                    color={"yellow"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={ExamStyle.CardContainer}>
              <TouchableOpacity style={ExamStyle.card}>
                <Image
                  source={require("../img/ic_exam_set_purple.png")}
                ></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 5
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={100}
                    height={5}
                    color={"green"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={ExamStyle.card}>
                <Image source={require("../img/ic_green_exam_set.png")}></Image>
                <View>
                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                    Set 6
                  </Text>
                </View>
                <View style={ExamStyle.cardDetail}>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>{"Listening"}</Text>
                  </View>
                  <View>
                    <Text style={ExamStyle.cardTextDetail}>
                      {"Comprehesnsion"}
                    </Text>
                  </View>
                </View>
                <View style={ExamStyle.proContainer}>
                  <ProgressSet
                    widthbg={100}
                    heightbg={5}
                    width={70}
                    height={5}
                    color={"red"}
                  ></ProgressSet>
                  <View style={ExamStyle.proTextContainer}>
                    <Text style={ExamStyle.cardTextDetail}>2/5</Text>
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

export default OralExamSet;
