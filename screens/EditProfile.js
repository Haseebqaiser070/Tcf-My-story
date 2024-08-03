import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import profileStyle from '../style/profileStyle';
import EditStyle from '../style/EditProfile';
import ssStyle from '../style/ssstyle';
import Colors from "../colors/Color";
import { db, auth, storage } from '../firebaseConfig'; // Import Firestore database, Auth, and Storage
import { query, where, getDocs, updateDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { onAuthStateChanged, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import Auth functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage functions

const EditProfile = () => {
  const Navigator = useNavigation();
  const formikRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUserEmail(user.email);

        // Fetch user data from Firestore
        const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setInitialValues({
            name: userData.name || '',
            email: userData.email || '',
            password: '',
            profilePicture: userData.profilePicture || null,
          });
        }
        setLoading(false); // Stop loading after fetching user data
      } else {
        // User is signed out
        Navigator.navigate('Login'); // Redirect to login screen if not authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [Navigator]);

  const openGallery = async (setFieldValue) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.cancelled) {
      setFieldValue('profilePicture', result.uri);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string(), // Make password optional
  });

  const saveProfile = async (values) => {
    try {
      if (!userEmail) {
        console.error('Email is required to update profile.');
        return;
      }

      // Upload the profile picture to Firebase Storage and get the download URL
      let profilePictureUrl = values.profilePicture;
      if (values.profilePicture && !values.profilePicture.startsWith('https://')) {
        const response = await fetch(values.profilePicture);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePictures/${userEmail}`);
        await uploadBytes(storageRef, blob);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Re-authenticate the user if password is provided
      const user = auth.currentUser;
      if (values.password) {
        const credential = EmailAuthProvider.credential(userEmail, values.password);
        await reauthenticateWithCredential(user, credential);
      }

      // Update the user's email in Firebase Auth if it's changed
      if (values.email !== userEmail) {
        await updateEmail(user, values.email);
      }

      // Update the Firestore document
      const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (userDoc) => {
          const userDocRef = userDoc.ref;
          const updatedData = {
            name: values.name,
            email: values.email,
            ...(profilePictureUrl && { profilePicture: profilePictureUrl }) // Only include profilePicture if it's defined
          };
          await updateDoc(userDocRef, updatedData);
        });
        Navigator.navigate('profile');
      } else {
        console.error('No user document found for email:', userEmail);
      }
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

  if (loading) {
    return (
        <View style={[ssStyle.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
  }

  return (
      <View style={ssStyle.mainContainer}>
        <ScrollView>
          <View style={profileStyle.mainActoinBar}>
            <View style={profileStyle.Container}>
              <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={() => {
                    Navigator.goBack();
                  }}
              >
                <Image source={require('../img/back.png')} />
              </TouchableOpacity>
              <Text style={profileStyle.textColor}>Edit Profile</Text>
              <View>
                <TouchableOpacity onPress={() => formikRef.current.handleSubmit()}>
                  <Text style={EditStyle.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => saveProfile(values)}
              innerRef={formikRef}
              enableReinitialize={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={profileStyle.contentContainer}>
                  <TouchableOpacity
                      style={profileStyle.profileContainer}
                      onPress={() => openGallery(setFieldValue)}
                  >
                    {values.profilePicture ? (
                        <Image
                            source={{ uri: values.profilePicture }}
                            style={{
                              marginVertical: 8,
                              height: 170,
                              width: 170,
                              alignSelf: 'center',
                              borderRadius: 200,
                              borderColor: 'rgba(159, 157, 158, 1)',
                              borderWidth: 1,
                            }}
                        />
                    ) : (
                        <Image source={require('../img/avatar.png')} />
                    )}
                  </TouchableOpacity>
                  <View style={EditStyle.editPane}>
                    <Text style={EditStyle.textHeading}>YOUR NAME</Text>
                    <TextInput
                        style={[
                          EditStyle.inputField,
                          { color: Colors.white }, // Set text color to white
                          touched.name && errors.name && { borderColor: 'red' },
                        ]}
                        placeholder="John Doe"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholderTextColor={Colors.white}
                    />
                    {touched.name && errors.name && (
                        <Text style={EditStyle.errorText}>{errors.name}</Text>
                    )}

                    <Text style={EditStyle.textHeading}>YOUR EMAIL</Text>
                    <TextInput
                        style={[
                          EditStyle.inputField,
                          { color: Colors.white }, // Set text color to white
                          touched.email && errors.email && { borderColor: 'red' },
                        ]}
                        placeholder="john@gmail.com"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholderTextColor={Colors.white}
                    />
                    {touched.email && errors.email && (
                        <Text style={EditStyle.errorText}>{errors.email}</Text>
                    )}

                    <Text style={EditStyle.textHeading}>YOUR PASSWORD</Text>
                    <View style={[EditStyle.inputField, { flexDirection: 'row', alignItems: 'center' }]}>
                      <TextInput
                          style={{ flex: 1, color: 'white' }} // Set text color to white
                          placeholder="******"
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          secureTextEntry={!showPassword}
                          placeholderTextColor={Colors.white}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                        <Text style={EditStyle.errorText}>{errors.password}</Text>
                    )}
                  </View>
                </View>
            )}
          </Formik>
        </ScrollView>
      </View>
  );
};

export default EditProfile;
