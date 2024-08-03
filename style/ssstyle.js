import { StyleSheet } from "react-native";
import Colors from "../colors/Color";


const ssStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Colors.backGround,
    
    },
    subContainer:{
        marginTop:50,
        marginBottom:50,
    },
textColor:{
color: Colors.white,
},
actionBar:{
    display:"flex",
    flexDirection: 'row',
    marginStart:20,
},
backButton:{
    display:'flex',
     padding:20,
     justifyContent:'center',
    alignItems: 'center',
},
heading:{
    display:'flex',
    flex:1,
    marginStart:-50,
    justifyContent:'center',
    alignItems: 'center',
}, 

cot:{
    height:"100%",
    borderBottomWidth:0,
    borderTopLeftRadius: 30, // Adjust this value as needed
    borderTopRightRadius: 30, // Adjust this value as needed
    borderWidth: 2,
    marginTop:40,
    padding:10,
    borderColor: Colors.gray,
},
circularBox:{
    width: 130,
    height: 130,
    marginTop:25,
    borderRadius: 150 / 2, 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: Colors.purple
},
circleContainer:{
    justifyContent:'center',
    alignItems:'center',   
},

userName:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
},
textDat:{
    fontSize:22,

}
, 
basicInfoContainer:{
    marginTop:30,
    marginStart:20,
}
, 
textFont:{
    fontSize:16,
    color:Colors.textGray
},
bInfoName:{
    marginTop:8, 
    fontSize:18,
    color:Colors.primary,
},
bottomButton: {
    
    borderRadius: 30,
     marginTop: 20,
     marginLeft: 20,
    backgroundColor: Colors.primary,
    padding: 20, 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end', 
   
   
  },

  btnContainer:{
    alignItems: 'flex-end',
    paddingRight: 5,
  }
})


export default ssStyle