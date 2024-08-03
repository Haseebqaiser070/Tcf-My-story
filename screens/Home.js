import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import { Styles } from "../style/Styles";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { styles } from "react-native-3d-card/src/styles";
import { useWindowDimensions } from "react-native";
const Home = () => {
  const Navigator = useNavigation();
  const lang = ["English", "French", "Italian", "Hindi"];
  const [selectedLanguage, setSelectedLanguage] = useState();
  const mWidth = useWindowDimensions().width
  const mHeight = useWindowDimensions().height
  const onSelect = (value) => {
    setSelectedLanguage(value);
  };
  //

  const loadRegister = () => {
    Navigator.navigate("register");
  };

  const loadDashboadr = () => {
    Navigator.navigate("login");
  };

  return (
    <>
    <ImageBackground source={require('../img/bg.png')} style = {Styles.background}>
    <ScrollView style={Styles.mainContainer}>
    
      <View style={Styles.imgcontainer}>
        <Image
          source={require("../img/background_img.png")}
          style={Styles.image}
        ></Image>
      </View>
      <View style={Styles.textContainer}>
        
        <Image source={require('../img/logo.png')} style={Styles.onboardHeading}>
        
        </Image>
      </View>
      <View style={Styles.mainUiContainer}>
       
        <Dropdown options={lang} onSelect={onSelect}></Dropdown>
        
        <TouchableOpacity onPress={loadRegister}>
          <View style={Styles.registerButton}>
            <View style={Styles.registerButtonInnerContainer}>
              <Image source={require("../img/ic_email.png")} />
              <Text style={Styles.Text}>Create an account</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={Styles.loginMainContiner}>
          <TouchableOpacity style={Styles.googleButton}>
            <Image source={require("../img/ic_google.png")} />
          </TouchableOpacity>
          <TouchableOpacity style = {Styles.loginButton} onPress={()=>{Navigator.navigate('login')}}>
          <View>
            <Text style={Styles.Text}>Login</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.terms}>
          <Text style={Styles.centerText}>
            By continuing you agree TCFIRN’s Terms of Services & Privacy Policy{" "}
          </Text>
        </View>
      </View>
     
    </ScrollView>
    </ImageBackground>
    </>
  );
};

export default Home;
