import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const sTwoStyle = StyleSheet.create({
    mainNav:{
        display:'flex',
        borderWidth:2,
        borderColor:Colors.primary,
        padding:15,
        borderRadius:20,
        flexDirection:'row',
        alignItems: 'center',
        marginBottom:10,
        justifyContent: 'space-between',
    
    },
    imageSize:{
        width:50,
        height:50,
        resizeMode:'contain',
    }

});

export default sTwoStyle;