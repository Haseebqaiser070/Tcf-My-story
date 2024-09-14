import { Image, Text, TouchableOpacity, View } from "react-native";
import dashboardStyle from "../../style/dashboardStyle";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import ssStyle from "../../style/ssstyle";

const Admin = () => {
  const Navigator = useNavigation();

  const navigateTo = () => {
    Navigator.navigate("ListeningComprehensionSets");
  };
  return (
    <View style={dashboardStyle.mainConatier}>
      <ScrollView>
        <View style={dashboardStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity
                style={ssStyle.backButton}
                onPress={() => {
                  Navigator.goBack();
                }}
            >
              <Image source={require("../../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
               Admin
              </Text>
            </View>
          </View>

          <View style={dashboardStyle.userName}></View>
          <View style={dashboardStyle.getStarted}>
            <Text style={[dashboardStyle.textColorGray]}>
              LET'S GET STARTED
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={dashboardStyle.mainNav}
              onPress={navigateTo}
            >
              <Text style={[dashboardStyle.textColor, { fontSize: 18 }]}>
                Listening Comprehension
              </Text>
              <Image source={require("../../img/l_one.png")} />
            </TouchableOpacity>

            <TouchableOpacity
              style={dashboardStyle.mainNav}
              onPress={() => {
                Navigator.navigate("WrittenComprehensionSets");
              }}
            >
              <Text style={[dashboardStyle.textColor, { fontSize: 18 }]}>
                Written Comprehension
              </Text>
              <Image source={require("../../img/l_two.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              style={dashboardStyle.mainNav}
              onPress={() => {
                Navigator.navigate("WrittenExpressionSets");
              }}
            >
              <Text style={[dashboardStyle.textColor, { fontSize: 18 }]}>
                Written Expression
              </Text>
              <Image source={require("../../img/l_three.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Admin;
