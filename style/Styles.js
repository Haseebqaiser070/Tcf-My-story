import { StyleSheet } from "react-native";
import Colors, { color } from "../colors/Color";

export const Styles = StyleSheet.create({
    mainContainer:{
        flex:1,
     
        
    },
    background: {
      flex: 1,
      resizeMode: 'center', // or 'contain', 'stretch', 'repeat', 'center'
      width: '100%', // or a specific width
      height: '100%', // or a specific height
      
    },

    imgcontainer:{
        marginTop:-80
    }
    ,
      image: {
        width: '100%', 
        resizeMode: 'contain'
      },

      onboardHeading:{
        marginStart:25,
      },

      textContainer:{
        marginTop:-90
      },

      mainUiContainer:{
        display:"flex",
        flexDirection:"column",
        marginStart:25,
        marginEnd:25,
        marginTop:25,
      },

      registerButton:{
        display:"flex",
        alignContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary,
        marginTop:20,
        borderRadius:30,
        padding:20
      }
    ,
    registerButtonInnerContainer:{
        display:"flex",
        flexDirection:"row",
        alignContent:"center",
        alignItems:"center"
    },
    Text:{
        color:Colors.white,
        marginStart:10,
    },

    loginMainContiner:{
        flex:1,
        flexDirection:'row',
        marginTop:20,
    },

    googleButton:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        borderWidth: 2,
        borderRadius:30,
        padding:20,
        borderColor:Colors.gray,
        marginEnd:5
    },
    loginButton:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        borderWidth: 2,
        borderRadius:30,
        padding:20,
        borderColor:Colors.gray,
        marginStart:5
    },
    terms:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        marginTop:20,
        marginBottom:5,
    },

    centerText: {
        textAlign: 'center',
        color:Colors.textGray,
        marginBottom:10,
      },

})