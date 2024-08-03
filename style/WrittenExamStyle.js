import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const writtenExamStyle = StyleSheet.create({
    countChip:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        paddingStart:20,
        paddingEnd:20,
        marginTop:5,
        marginStart:10,
        marginBottom:5,
        borderWidth:2,
        padding:5,
        borderColor:Colors.chipColor
    },
    textHeading:{
        marginTop:30,
        marginStart:10,
        color:Colors.gray,
    
    },

    answerFieldPan:{
        marginTop:30
    },
    btnBottom:{
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'flex-start',
        flexDirection:'row',
        marginBottom:20,
        
    },
    countChipFill:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        paddingStart:20,
        paddingEnd:20,
       height:30,
        marginEnd:10,
        marginStart:10,
        padding:8,
        marginBottom:5,
        backgroundColor:Colors.chipColor,
    },
});

export default writtenExamStyle