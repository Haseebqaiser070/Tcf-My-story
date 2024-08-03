import Colors from "../colors/Color";
import { PermissionsAndroid, StyleSheet } from "react-native";

const profileStyle = StyleSheet.create({
  mainActoinBar:{
    marginTop:50,
    marginStart:20,
    marginEnd:20,
  },
  Container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
textColor:{
    marginStart:22,
    color:Colors.white,
    fontSize:20,
},
editProfile:{
  color:Colors.white,
  borderWidth:1,
  borderColor:Colors.primary,
  paddingLeft:15,
  paddingRight:15,
  padding:5,
  borderRadius:20,
},

contentContainer:{
  marginLeft:20, 
  marginRight:20,
},
profileContainer:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:40,
  
}, 
profileName:{
  color:Colors.white,
  fontSize:30, 
  marginTop:20,

},
profileEmail:{
  color:Colors.profileEmail,
  fontSize:17, 
  marginTop:10,

},
progressCardConatiner:{
  marginTop:10,
},
   notificationConatiner:{
    backgroundColor:Colors.cardBf,
    padding:20,
    borderRadius:20,
   }, 

   notificationSubContainer:{
    display:'flex',
    flexDirection:'row',
   }
   ,
   notifyTextContainer:{
    marginStart:20
   }
,
   notifyHeding:{
    fontSize:20, 
    color:Colors.white
   }
   ,
   notifySubHeding:{
    fontSize:15, 
    color:Colors.gray
   },

   logoutContainer:{
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
   },
   logoutHeading:{
    fontSize:20,
    marginTop:20,
    marginBottom:20,
    color:Colors.white,
}
});

export default profileStyle;