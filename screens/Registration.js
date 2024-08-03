import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/Input';
import RegisStyle from '../style/RegisStyle';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebaseConfig'; // Import Firestore database
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const Register = () => {
  const Navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isEmailNull, setEmailNull] = useState(false);
  const [isNameNull, setNameNull] = useState(false);
  const [isPassNull, setPassNull] = useState(false);
  const [isConfirmNull, setConfirmNull] = useState(false);
  const [passConfirmed, setPassCon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailCallBack = (value) => {
    if (validateEmail(value)) {
      setEmail(value);
      setEmailNull(false);
    } else {
      setEmail(value);
      setEmailNull(true);
    }
  };

  const nameCallBack = (value) => {
    if (value !== '') {
      setName(value);
      setNameNull(false);
    } else {
      setNameNull(true);
    }
  };

  const passCallback = (value) => {
    setPass(value);
    if (value === confirmPass) {
      setPassCon(true);
      setPassNull(false);
      setConfirmNull(false);
    } else {
      setPassCon(false);
    }
  };

  const confirmCallback = (value) => {
    setConfirmPass(value);
    if (value === password) {
      setPassCon(true);
      setPassNull(false);
      setConfirmNull(false);
    } else {
      setPassCon(false);
    }
  };

  const continueTo = () => {
    // Validate email
    if (email === '' || !validateEmail(email)) {
      setEmailNull(true);
      setError('Please enter a valid email');
      return; // Exit function if email is invalid
    } else {
      setEmailNull(false);
    }

    // Validate name
    if (name === '') {
      setNameNull(true);
      setError('Please enter your name');
      return; // Exit function if name is invalid
    } else {
      setNameNull(false);
    }

    // Validate password
    if (password === '') {
      setPassNull(true);
      setError('Please enter a password');
      return; // Exit function if password is invalid
    } else {
      setPassNull(false);
    }

    // Validate confirmation password
    if (confirmPass === '') {
      setConfirmNull(true);
      setError('Please confirm your password');
      return; // Exit function if confirmation password is invalid
    } else {
      setConfirmNull(false);
    }

    // Check if password matches confirmation password
    if (password !== confirmPass) {
      setPassCon(false);
      setError('Passwords do not match');
      return; // Exit function if passwords don't match
    } else {
      setPassCon(true);
    }

    setIsLoading(true);

    // If all validations pass, proceed with user registration
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: name })
              .then(() => {
                // Add user data to Firestore collection
                const usersCollectionRef = collection(db, 'users');
                addDoc(usersCollectionRef, {
                  name: name,
                  email: email,
                  level: ''
                })
                    .then(() => {
                      setIsLoading(false);
                      Navigator.navigate('studyspace', {
                        name: name,
                        email: email,
                        level: ''
                      });
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      console.error('Error adding document:', error);
                      setError(error.message);
                    });
              })
              .catch((error) => {
                setIsLoading(false);
                console.error('Error updating profile:', error);
                setError(error.message);
              });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Signup error:', error.code, error.message);
          setError(error.message);
        });
  };

  return (
      <View style={RegisStyle.mainContainer}>
        <ImageBackground source={require('../img/bg_t.png')} style={{ flex: 1 }}>
          <ScrollView style={RegisStyle.mainContainer}>
            <TouchableOpacity onPress={() => { Navigator.goBack(); }}>
              <View style={RegisStyle.backButtonContainer}>
                <Image source={require('../img/back.png')} />
              </View>
            </TouchableOpacity>
            <View style={RegisStyle.mainUIContainer}>
              <Text style={RegisStyle.heading}>Register</Text>
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
                <View style={RegisStyle.InputContainer}>
                  <Text style={RegisStyle.TextColor}>YOUR NAME</Text>
                  <View style={RegisStyle.InputContainer}>
                    <InputField
                        hint={'Jhone Doe'}
                        type={false}
                        isnull={isNameNull}
                        multilieflag={false}
                        onVlaueChnaged={nameCallBack}
                        fontSizePx={20}
                    />
                  </View>
                </View>
                <View style={RegisStyle.InputContainer}>
                  <Text style={RegisStyle.TextColor}>SET PASSWORD</Text>
                  <View style={RegisStyle.InputContainer}>
                    <InputField
                        hint={'*****'}
                        type={true}
                        isnull={isPassNull}
                        multilieflag={false}
                        onVlaueChnaged={passCallback}
                        fontSizePx={16}
                    />
                  </View>
                </View>
                <View style={RegisStyle.InputContainer}>
                  <Text style={RegisStyle.TextColor}>CONFIRM PASSWORD</Text>
                  <View style={RegisStyle.InputContainer}>
                    <InputField
                        hint={'*****'}
                        type={true}
                        isnull={isConfirmNull}
                        multilieflag={false}
                        onVlaueChnaged={confirmCallback}
                        fontSizePx={16}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {error ? (
              <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 999, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>{error}</Text>
              </View>
          ) : null}
          <View style={{ display: 'flex', flexDirection:'row',  justifyContent: 'center', alignItems: 'center',  }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Do you have account?</Text>
            <TouchableOpacity style={{marginHorizontal: 6, }} onPress={() => { Navigator.navigate('login'); }}>
              <Text style={{ color: 'white', fontSize: 15, textDecorationLine: "underline"}}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={continueTo} disabled={isLoading}>
            <View style={RegisStyle.bottomButton}>
              {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
              ) : (
                  <Text style={RegisStyle.buttonText}>Continue</Text>
              )}
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
  );
};

export default Register;
