import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import ssStyle from '../style/ssstyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import TwoViews from '../components/Level'; // Import the TwoViews component
import { db } from '../firebaseConfig'; // Import Firestore database
import { query, where, getDocs, updateDoc, collection } from 'firebase/firestore'; // Import Firestore functions

const Studyspace = () => {
  const Navigator = useNavigation();
  const route = useRoute();
  const { name, email } = route.params;
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user document when component mounts
    loadUserDocument();
  }, []);

  const loadUserDocument = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setSelectedLevel(userData.level || ''); // Set selected level from user document
        });
      } else {
        console.error('No user document found for email:', email);
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  };

  const loadNext = async () => {
    if (!selectedLevel) {
      return;
    }

    setIsLoading(true);

    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          updateDoc(userDocRef, { level: selectedLevel })
              .then(() => {
                setIsLoading(false);
                Navigator.navigate('dashboard');
              })
              .catch((error) => {
                setIsLoading(false);
                console.error('Error updating user document:', error);
              });
        });
      } else {
        console.error('No user document found for email:', email);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching user document:', error);
    }
  };

  return (
      <View style={ssStyle.mainContainer}>
        <View style={ssStyle.subContainer}>
          <View style={ssStyle.actionBar}>
            <TouchableOpacity style={ssStyle.backButton} onPress={() => { Navigator.goBack() }}>
              <Image source={require("../img/back.png")} />
            </TouchableOpacity>
            <View style={ssStyle.heading}>
              <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                New Studyspace
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={ssStyle.cot}>
              <View style={ssStyle.circleContainer}>
                <View style={ssStyle.circularBox}>
                  <Image
                      style={{ marginStart: 20 }}
                      source={require("../img/plant.png")}
                  />
                </View>
              </View>
              <View style={ssStyle.userName}>
                <Text style={[ssStyle.textColor, ssStyle.textDat]}>
                  {`${name}'s Studyspace`}
                </Text>
              </View>
              <View style={ssStyle.basicInfoContainer}>
                <View>
                  <Text style={[ssStyle.textFont]}>NAME</Text>
                  <Text style={[ssStyle.bInfoName]}>{name}</Text>
                </View>

                <View style={{ marginTop: 30 }}>
                  <Text style={[ssStyle.textFont]}>EMAIL</Text>
                  <Text style={[ssStyle.bInfoName]}>{email}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={ssStyle.textFont}>CHOOSE YOUR LEVEL</Text>
                  <View>
                    <TwoViews onSelectLevel={setSelectedLevel} initialLevel={selectedLevel} />
                  </View>
                  <View style={ssStyle.btnContainer}>
                    <TouchableOpacity onPress={loadNext} disabled={isLoading}>
                      <View style={ssStyle.bottomButton}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={ssStyle.textColor}>Continue</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
  );
};

export default Studyspace;
