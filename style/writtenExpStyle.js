import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const writtenExp = StyleSheet.create({
    innerContainer:{
        display:'flex',
        flexDirection:'row'
    },

    innerTextContainer:{
        marginLeft:30,

    },

    headingText:{
        fontSize:18,
        color:Colors.white
    },
    textDetail:{
        color:Colors.gray,
        marginTop:15,
        marginBottom:20,
    }
});

export default writtenExp;
