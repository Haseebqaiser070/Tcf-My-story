import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const dashboardStyle = StyleSheet.create({
    mainConatier:{
        flex:1,
        backgroundColor:Colors.backGround,
       
    },

    subContainer:{
        display:'flex',
        flexDirection:'column',
        marginTop:50,
        margin:20,
        
    },
    textColor:{
      color:Colors.white
    },

    textColorGray:{
        color:Colors.textGray
      },
    navContainer:{
        display:"flex",
        flexDirection:'row',
        justifyContent: 'center', // Center vertically
        alignItems: 'center',
    },

    navHeading:{
        fontSize:20,
        
    },

    navLeftContainer:{
        display:'flex',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    }, 
    navLeftOptionContainer:{
        display:'flex',
        flexDirection:'row'
    },

    profileContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginStart:10,
    },

   userName:{
   marginStart:4,
    marginTop:20,
   },
  userNameText:{
   fontSize:35,
   },

  getStarted:{
    marginTop:35,
    marginBottom:20,

  },
mainNav:{
    display:'flex',
    borderWidth:2,
    borderColor:Colors.primary,
    padding:20,
    borderRadius:20,
    flexDirection:'row',
    alignItems: 'center',
    marginBottom:10,
    justifyContent: 'space-between',

},
divider:{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
},
dividerMargin:{
    marginTop:15,
    marginBottom:25,
}
});

export default dashboardStyle