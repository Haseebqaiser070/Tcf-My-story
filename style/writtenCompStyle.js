import { StyleSheet } from "react-native";
import { defineAnimation } from "react-native-reanimated";
import Colors from "../colors/Color";
const writtenComStyle =StyleSheet.create({
    answerContainer:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:'center'
},
chipCorrect:{
    backgroundColor:Colors.chipColor,
    paddingStart:10,
    paddingEnd:10,
    marginEnd:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:15,
    },

    questionFormate:{
        marginTop:10,
},
questionFormateText:{
    color:Colors.white,
    fontSize:20,
},
boxTest:{
    padding:20,
    backgroundColor:Colors.graphBg,
    borderRadius:12,
    marginBottom:10,
    marginTop:10,
},
});

export default writtenComStyle