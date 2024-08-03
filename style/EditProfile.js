import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const EditStyle  = StyleSheet.create({

    doneButton:{
 color:Colors.white,
  borderWidth:1,
  overflow: 'hidden',
  backgroundColor:Colors.primary,
  paddingLeft:15,
  paddingRight:15,
  padding:5,
  borderRadius:20,
    }, 
editPane:{
 marginTop:30,
},
    textHeading:{
      color:Colors.gray,
      marginTop:30,
      marginBottom:15,
    }
});

export default EditStyle