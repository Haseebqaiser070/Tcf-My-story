import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet ,Image, TouchableOpacity} from "react-native";
import Colors from "../colors/Color";


const ModalComponent = ({ isOpen, onClose, onRedirect, message,  }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style = {styles.Header}>
          <Text style = {[styles.textColor, {fontSize:25}]}>Confirm</Text>
          <TouchableOpacity onPress={onClose}>
          <Image source={require('../img/close.png')}/>
          </TouchableOpacity>

        </View>
        <View style = {styles.messageContainer}>
            <Text style = {styles.textColorModalMessage}>{message}</Text>
        </View>
        <TouchableOpacity style = {styles.btnOk} onPress={onRedirect}>
            <Text style = {styles.textColor}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btnNo} onPress={onClose}>
            <Text style = {styles.textColor}>No</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  textColor:{
    color: Colors.white,
  },
  textColorModalMessage:{
    color: Colors.modalGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(128, 128, 128, 0.8)', // semi-transparent black color
  },
  modalContent: {
    width:350,
    backgroundColor:Colors.backGround,
    display:'flex',
    padding: 20,
    borderRadius: 10,
  },

  Header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },

  messageContainer:{
    marginTop:30,
    marginBottom:20
  },
 btnOk:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primary,
    padding:15,
    marginBottom:10,
    borderRadius:25,

 }
,
 btnNo:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderColor:Colors.modalGray,
    padding:15,
    marginBottom:10,
    borderRadius:25,

 }
});
export default ModalComponent;
