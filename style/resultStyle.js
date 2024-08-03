import { StyleSheet } from "react-native";
import Colors from "../colors/Color";



const resultStyle  = StyleSheet.create({

    resultBox:{
        backgroundColor:Colors.titlCardbg
    },
    topContent:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    textBox:{
       width:'70%',
       marginStart:10,
       marginEnd:10,
    },
    imgBox:{
       display:'flex',
       flex:1,
       justifyContent:'flex-end',
       alignItems:'flex-end',
       marginEnd:10,
    },
    textColorWhite:{
        color:Colors.white
    },
   
    horizontalDivider:{
        height:1,
        backgroundColor:Colors.white,
        marginTop:20,
        marginBottom:20,
    }
,
    bottomHeading:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginStart:10,
        marginEnd:10,
        marginBottom:10
    } 
    ,
    tiltHeadingColor:{
        color:Colors.titleHeading
    },
    horizontalDividerBlack:{
        height:1,
        backgroundColor:Colors.gray,
        marginTop:30,
        marginBottom:30,
    },
    boxTest:{
        padding:20,
        backgroundColor:Colors.graphBg,
        borderRadius:12,
    },
    assRes:{
        display:'flex',
        flexDirection:'row',
    },
    assFirstSection:{
       width:'70%' 
    },
    textColorGray:{
        color:Colors.gray
    },
    answerContainer:{
         display:'flex',
         flexDirection:"row",
         marginTop:20,
         justifyContent:'flex-start',
         alignItems:'center'
 },
 chipCorrect:{
        backgroundColor:Colors.titlCardbg,
        paddingStart:10,
        paddingEnd:10,
        marginEnd:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:15,
        color:Colors.white
 },
 assExamBtn:{
    display:'flex',
    padding:20,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    borderColor:Colors.primary,
    borderWidth:1,
    marginRight:50,
    marginTop:30
 },

btnGo:{
    flex:1,
    
    backgroundColor:Colors.white
},
bottomButton: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: "center",
  },

  leaveExamBtn:{
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    marginTop: 20,
    borderWidth:2,
    borderColor:Colors.gray,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    alignItems: "center",
  },

  blueBox:{
    borderWidth:2,
    borderColor:Colors.primary,
    padding:15,
    borderRadius:20,
    marginTop:20,
    marginBottom:20,
  }

});

export default resultStyle