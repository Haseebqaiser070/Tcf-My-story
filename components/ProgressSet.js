import { StyleSheet, View } from "react-native";
import Colors from "../colors/Color";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const ProgressSet =({widthbg, heightbg, width, height, color})=>{
    if(color == "red"){
        var gradientColor  = ['#E42A6C','#C393FF']
    }else{
        if(color == "yellow"){
            var gradientColor  = ['#FF8669','#FFEBA2']
        }else{
            var gradientColor  = ['#93FFB1', '#2ACEE4'] 
        }
       
    }
    
    
 return(
    <View style = {[proStyle.mainBar, {width:widthbg, height:heightbg}]}>
            <LinearGradient colors= {gradientColor} start={{x: 0, y: 0.5}}   end={{x: 1, y: 0.5}}  style = {[proStyle.upperlayer, {width:width, height:height}]}></LinearGradient>
    </View>
 );
}

const proStyle = StyleSheet.create({
    mainBar:{
        backgroundColor:Colors.backGround,
        borderRadius:3,
       
    },
  
    upperlayer:{
      
        borderRadius:3,
        
    }
      
});

export default ProgressSet 

