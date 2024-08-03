import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InputField from '../components/Input';
import RegisStyle from '../style/RegisStyle';
import { useNavigation } from '@react-navigation/native';
import Colors from '../colors/Color';
import ModalComponent from '../components/ConfirmModal';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the sendPasswordResetEmail function
import { auth } from '../firebaseConfig';

const ForgotPass = () => {
  const Navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [isEmailNull, setEmailNull] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailCallBack = (value) => {
    setEmail(value);
    setEmailNull(!validateEmail(value));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onConfirm = () => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
          setIsModalOpen(false);

          // Optionally, you can navigate to a confirmation screen or show a message
          console.log('Password reset email sent successfully');
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error);
          // Handle error, for example, show an alert
        });
  };


  const continueTo = () => {
    if (email === '') {
      setEmailNull(true);
    } else {
      setEmailNull(false);
      setIsModalOpen(true); // Open modal to confirm sending email
    }
  };

  return (
      <>
        <ImageBackground source={require('../img/bg_t.png')} style={{ flex: 1 }}>
          <View style={RegisStyle.mainContainer}>
            <ScrollView style={RegisStyle.mainContainer}>
              <TouchableOpacity onPress={() => Navigator.goBack()}>
                <View style={RegisStyle.backButtonContainer}>
                  <Image source={require('../img/back.png')} />
                </View>
              </TouchableOpacity>
              <View style={RegisStyle.mainUIContainer}>
                <Text style={RegisStyle.heading}>Forgot Your</Text>
                <Text style={RegisStyle.heading}>Password?</Text>
                <View style={RegisStyle.inputContainer}>
                  <Text style={RegisStyle.TextColor}>YOUR EMAIL</Text>
                  <View style={RegisStyle.InputContainer}>
                    <InputField
                        hint={'jhonedoe@example.com'}
                        type={false}
                        isnull={isEmailNull}
                        multilieflag={false}
                        onVlaueChnaged={emailCallBack}
                        fontSizePx={16}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={continueTo}>
              <View style={RegisStyle.bottomButton}>
                <Text style={RegisStyle.buttonText}>Send an Email</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ModalComponent
            isOpen={isModalOpen}
            onClose={closeModal}
            onRedirect={onConfirm}
            message={'Are you sure you want to send a password reset email to this email address?'}
        />
      </>
  );
};

export default ForgotPass;
