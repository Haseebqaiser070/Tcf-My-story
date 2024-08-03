import {Text, View, Image, TouchableOpacity, Platform} from "react-native";
import dashboardStyle from "../style/dashboardStyle";
import {ScrollView} from "react-native-gesture-handler";
import Dropdown from "../components/Dropdown";
import CountryDropDown from "../components/CountryDropdown";
import ProgressGraph from "../components/Graph";
import Colors from "../colors/Color";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../firebaseConfig"
import {useContext} from "react";
import {AdminContext} from "../context/AdminContext";

const Dashboard = () => {
    const {isAdmin} = useContext(AdminContext)
    const Navigator = useNavigation();
    const lang = ["English", "French", "Italian", "Hindi"];
    const count = [
        "../img/flag.png",
        "../img/flag.png",
        "../img/flag.png",
        "../img/flag.png",
    ];
    const Onselect = (value) => {
        //console.log(value);
    };

    const navigateTo = () => {
        Navigator.navigate('oralSet')
    }
    return (
        <View style={dashboardStyle.mainConatier}>
            <ScrollView>
                <View style={dashboardStyle.subContainer}>
                    <View style={dashboardStyle.navContainer}>
                        <Text style={[dashboardStyle.textColor, dashboardStyle.navHeading]}>
                            {" "}
                            Dashboard
                        </Text>
                        <View style={dashboardStyle.navLeftContainer}>
                            <View style={dashboardStyle.navLeftOptionContainer}>
                                <CountryDropDown
                                    options={count}
                                    onSelect={Onselect}
                                ></CountryDropDown>
                                <TouchableOpacity style={dashboardStyle.profileContainer} onPress={() => {
                                    Navigator.navigate('profile')
                                }}>
                                    <Image source={require("../img/profile.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={dashboardStyle.userName}>
                        <Text
                            style={[dashboardStyle.textColor, dashboardStyle.userNameText]}
                        >
                            {"Hello,"}
                        </Text>

                        <Text
                            style={[dashboardStyle.textColor, dashboardStyle.userNameText]}
                        >
                            {auth?.currentUser?.displayName + " "}
                            <Image
                                source={require("../img/hello.png")}
                                resizeMode="contain"
                            />
                        </Text>
                    </View>
                    <View style={dashboardStyle.getStarted}>
                        <Text style={[dashboardStyle.textColorGray]}>
                            LET'S GET STARTED
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={dashboardStyle.mainNav} onPress={navigateTo}>
                            <Text style={[dashboardStyle.textColor, {fontSize: 18}]}>
                                Listening Comprehension
                            </Text>
                            <Image source={require("../img/l_one.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={dashboardStyle.mainNav} onPress={() => {
                            Navigator.navigate('WrittenCom')
                        }}>
                            <Text style={[dashboardStyle.textColor, {fontSize: 18}]}>
                                Written Comprehension
                            </Text>
                            <Image source={require("../img/l_two.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={dashboardStyle.mainNav} onPress={() => {
                            Navigator.navigate('examset')
                        }}>
                            <Text style={[dashboardStyle.textColor, {fontSize: 18}]}>
                                Written Expression
                            </Text>
                            <Image source={require("../img/l_three.png")}/>
                        </TouchableOpacity>
                        {isAdmin && <TouchableOpacity style={dashboardStyle.mainNav} onPress={() => {
                            Navigator.navigate('AddQuiz')
                        }}>
                            <Text style={[dashboardStyle.textColor, {fontSize: 18}]}>
                                Admin Panel
                            </Text>
                            <Image source={require("../img/l_three.png")}/>
                        </TouchableOpacity>
                        }

                        <TouchableOpacity style={[{
                            paddingBottom: 30,
                            paddingTop: 30,
                            backgroundColor: Colors.gray
                        }, dashboardStyle.mainNav,]}>
                            <Text style={[dashboardStyle.textColor, {fontSize: 18}]}>
                                Oral Expression {" "}
                                <Image source={require('../img/lock.png')}></Image>
                            </Text>
                            <Image width={200} height={200} source={require("../img/card_three.png")}/>
                        </TouchableOpacity>

                        <View
                            style={[dashboardStyle.divider, dashboardStyle.dividerMargin]}
                        />
                        <View>
                            <ProgressGraph></ProgressGraph>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Dashboard;
