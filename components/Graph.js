import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../colors/Color";

const ProgressGraph = () =>{
 return(
    <View style = {style.mainContainer}>
        <Text style = {[style.textColor, {padding:25}]}>TESTS COMPLETED IN PAST 7 DAYS</Text>
        <View>
            <Image style={{ width:350, height: 100 }}  source={require('../img/graph.png')}></Image>
        </View>
        <View style = {style.bottomStat}>
            <Text style = {[style.textColorOral, {paddingBottom:5}]}>108 Oral Comprehension</Text>
            <Text style = {style.textColorCompre}>6 Written Comprehension</Text>
        </View>
    </View>
 );
}

const style = StyleSheet.create({
    mainContainer:{
        
        backgroundColor:Colors.graphBg,
        borderRadius:20,
    }
,
textColor:{
    color:Colors.textGray
},
textColorOral:{
    color:Colors.graphOralColor
},
textColorCompre:{
    color:Colors.graphComPreColor
},
bottomStat:{
    padding:20,
}
})
export default ProgressGraph