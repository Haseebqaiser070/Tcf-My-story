import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../colors/Color";


const Panel = ()=>{
 return(
    <View>
        <View style = {paneStyle.rowPane}>
             <View style = {paneStyle.circle}>
                <Image source={require('../img/ic_pane_one.png')}></Image>
            </View>
            <View style = {paneStyle.circle}>
                <Image source={require('../img/ic_pan_two.png')}></Image>
            </View>
            <View style = {paneStyle.circle}>
                <Image source={require('../img/ic_flag_pane.png')}></Image>
            </View>
        </View>

        <View style = {paneStyle.rowPane}>
             <View style = {paneStyle.circle}>
                <Image source={require('../img/mana.png')}></Image>
            </View>
            <View style = {paneStyle.circle}>
                <Image source={require('../img/shield.png')}></Image>
            </View>
            <View style = {paneStyle.circle}>
                <Image source={require('../img/ship.png')}></Image>
            </View>
        </View>

    </View>
 );
}

const paneStyle = StyleSheet.create({
    rowPane:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20,
        justifyContent:'space-between'
    }
  ,
    circle:{
        width:70,
        height:70,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.cardBf
    }
});

export default Panel