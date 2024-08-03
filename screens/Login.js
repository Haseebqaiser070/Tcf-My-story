import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/Input';
import RegisStyle from '../style/RegisStyle';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const Navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailNull, setIsEmailNull] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(false);
  const [prevScreen, setPrevScreen] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = Navigator.addListener('state', (e) => {
      if (e.data.state.index > 0) {
        setPrevScreen(e.data.state.routes[e.data.state.index - 1].name);
      }
    });

    return unsubscribe;
  }, [Navigator]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailCallBack = (value) => {
    if (validateEmail(value)) {
      setEmail(value);
      setIsEmailNull(false);
    } else {
      setEmail(value);
      setIsEmailNull(true);
    }
  };

  const passwordCallback = (value) => {
    setPassword(value);
  };

  const continueTo = () => {
    if (email === '') {
      setIsEmailNull(true);
      setError('Please enter a valid email');
    } else {
      setIsEmailNull(false);
    }

    if (password === '') {
      setIsPasswordNull(true);
      setError('Please enter your password');
    } else {
      setIsPasswordNull(false);
    }

    if (email !== '' && password !== '') {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            setIsLoading(false);
            Navigator.navigate('dashboard');
          })
          .catch((error) => {
            setIsLoading(false);
            const errorMessage = error.message;
            setError(errorMessage);
            Alert.alert('Login Failed', errorMessage);
          });
    }
  };

  const handleGoBack = () => {
    if (prevScreen !== 'Login') {
      Navigator.goBack();
    } else {
      Navigator.navigate('dashboard');
    }
  };

  return (
      <View style={RegisStyle.mainContainer}>
        <ImageBackground source={require('../img/bg_t.png')} style={{ flex: 1 }}>
          <ScrollView style={RegisStyle.mainContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <View style={RegisStyle.backButtonContainer}>
                <Image source={require('../img/back.png')} />
              </View>
            </TouchableOpacity>
            <View style={RegisStyle.mainUIContainer}>
              <Text style={RegisStyle.heading}>Login</Text>
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
                  <Text style={RegisStyle.TextColor}>SET PASSWORD</Text>
                  <View style={RegisStyle.InputContainer}>
                    <InputField
                        hint={'*****'}
                        type={true}
                        isnull={isPasswordNull}
                        multilieflag={false}
                        onVlaueChnaged={passwordCallback}
                        fontSizePx={16}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ display: 'flex', flexDirection:'row',  justifyContent: 'center', alignItems: 'center',  }}>
            <TouchableOpacity onPress={() => { Navigator.navigate('forgot'); }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Forgot Your Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 10, }} onPress={() => { Navigator.navigate('register'); }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Create an Account</Text>
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
          {error ? (
              <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 999, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: '#fff' }}>{error}</Text>
              </View>
          ) : null}
        </ImageBackground>
      </View>
  );
};

export default Login;
