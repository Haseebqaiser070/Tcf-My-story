import { StyleSheet } from "react-native";
import Colors from "../colors/Color";


const AssesStyle = StyleSheet.create({
    keySample:{
        padding:10,
        borderColor:Colors.chipColor,
        borderWidth:2,
        borderRadius:20,
        width:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    textColor:{
        color:Colors.white
    },
    question:{
        marginTop:50,
    }, 

    questionText:{
        fontSize:20,
    },

    editText:{
        marginTop:30
    }
});

export default AssesStyle;