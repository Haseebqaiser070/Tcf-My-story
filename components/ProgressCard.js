import { View, Text, StyleSheet} from "react-native";
import Colors from "../colors/Color";
import { LinearGradient } from "expo-linear-gradient";

const ProgressCard = ()=>{
  return(
    <View style = {cardStyle.mainContainer}>
    
       <View style = {cardStyle.mainBarConatiner}>
       
        <View style = {cardStyle.circleGroupe}>
        <View style= {cardStyle.circle}>
       </View> 
       <View style= {cardStyle.circle}>
       </View>
       <View style= {cardStyle.circle}>
       </View>
        </View>

        <View style = {cardStyle.circleGroupeB}>
        <LinearGradient colors={['#E42A6C','#C393FF']}  start={{x: 0, y: 0.5}}   end={{x: 1, y: 0.5}} style= {cardStyle.circle}>
       </LinearGradient> 
       <LinearGradient colors={['#E42A6C','#C393FF']} start={{x: 0, y: 0.5}}   end={{x: 1, y: 0.5}}  style= {cardStyle.circle}>
       </LinearGradient>
       <View  style= {cardStyle.circleA}>
       </View>
        </View>
        <LinearGradient  colors={['#E42A6C','#C393FF']}  start={{x: 0, y: 0.5}} 
          end={{x: 1, y: 0.5}}   style = {cardStyle.mainBarConatinerB}></LinearGradient>
      </View>

      <View style = {cardStyle.subContainer}>

        <Text style = {cardStyle.levelBadge}>Level 2</Text>
        <Text style = {cardStyle.levelTwo}>Complete this level to get reward</Text>

     </View>
    </View>
  );

}

const cardStyle = StyleSheet.create({
    mainContainer:{
        backgroundColor:Colors.cardBf,
        padding:20,
        borderRadius:10
    },
    mainBarConatiner:{
        height:10,
        borderRadius:20,
        backgroundColor:Colors.extraColor
    },
    mainBarConatinerB:{
      position:"relative",
        height:10,
        borderRadius:20,
        marginTop:-15,
        width:"70%",
        backgroundColor:Colors.purple,
        zIndex:-100
    },
   circle:{
    width:20,
    height:20,
    borderRadius:10,
    marginTop:-5,
    backgroundColor:Colors.purple
   }
 ,
   circleGroupe:{
    flexDirection:'row',
    justifyContent:'space-between',
   },

   circleGroupeB:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:-15,
    zIndex:100
   }
 ,
   circleA:{
    width:20,
    height:20,
    borderRadius:10,
    marginTop:-5,
    backgroundColor:Colors.extraColor
   },

   subContainer:{
    marginTop:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },

  levelBadge:{
    backgroundColor:Colors.badgeColor,
    color:Colors.white,
    padding:10,
    borderRadius:10,
  },

  levelTwo:{
    marginStart:10,
    color:Colors.white,

  }
});

export default ProgressCard