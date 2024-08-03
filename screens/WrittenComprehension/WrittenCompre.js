import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import examModuleStyle from "../../style/examModule";
import ssStyle from "../../style/ssstyle";
import ExamStyle from "../../style/ExamStyle";
import ProgressSet from "../../components/ProgressSet";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Import images statically
import image1 from '../../img/ic_exam_set_purple.png';
import image2 from '../../img/ic_exam_set_pink.png';
import image3 from '../../img/ic_red_exam_set.png';
import image4 from '../../img/ic_yellow_exam_set.png';
import image5 from '../../img/ic_green_exam_set.png';

const images = [image1, image2, image3, image4, image5];

const WrittenCompre = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigator = useNavigation();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Quiz', 'Written Comprehension', 'Mcqs'));
        const setsArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.id.startsWith('set')) {
            setsArray.push({ id: doc.id, ...doc.data() });
          }
        });
        setSets(setsArray);
      } catch (error) {
        console.error("Error fetching sets: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  const navigateToSet = (setId) => {
    Navigator.navigate('WrittenCompExam', { setId });
  };

  if (loading) {
    return (
        <View style={examModuleStyle.centeredContainer}>
          <ActivityIndicator size="large" color={examModuleStyle.activityIndicator.color} />
        </View>
    );
  }

  // Helper function to split the sets into rows
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(sets, 2); // Adjust the chunk size if needed

  return (
      <View style={examModuleStyle.mainConatiner}>
        <ScrollView>
          <View style={examModuleStyle.subContainer}>
            <View style={ssStyle.actionBar}>
              <TouchableOpacity style={ssStyle.backButton} onPress={() => { Navigator.goBack() }}>
                <Image source={require("../../img/back.png")} />
              </TouchableOpacity>
              <View style={ssStyle.heading}>
                <Text style={[ssStyle.textColor, { fontSize: 18 }]}>
                  Written Comprehension Sets
                </Text>
              </View>
            </View>
            <View style={examModuleStyle.contentContainer}>
              {sets.length > 0 ? (
                  <View>
                    {rows.map((row, rowIndex) => (
                        <View style={ExamStyle.CardContainer} key={rowIndex}>
                          {row.map((set, index) => (
                              <TouchableOpacity
                                  key={set.id}
                                  style={ExamStyle.card}
                                  onPress={() => navigateToSet(set.id)}
                              >
                                <Image source={images[(rowIndex * 2 + index) % images.length]} />
                                <View>
                                  <Text style={[ssStyle.textColor, ExamStyle.cardHeading]}>
                                    {`Set ${rowIndex * 2 + index + 1}`}
                                  </Text>
                                </View>
                                <View style={ExamStyle.cardDetail}>
                                  <View>
                                    <Text style={ExamStyle.cardTextDetail}>{"Written"}</Text>
                                  </View>
                                  <View>
                                    <Text style={ExamStyle.cardTextDetail}>
                                      {"Comprehension"}
                                    </Text>
                                  </View>
                                </View>
                                <View style={ExamStyle.proContainer}>
                                  <ProgressSet
                                      widthbg={100}
                                      heightbg={5}
                                      width={70}
                                      height={5}
                                      color={"red"}
                                  />
                                  <View style={ExamStyle.proTextContainer}>
                                    <Text style={ExamStyle.cardTextDetail}>{set.questions ? `${set.questions.length}/${set.questions.length}` : '0/0'}</Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                          ))}
                        </View>
                    ))}
                  </View>
              ) : (
                  <View style={examModuleStyle.centeredContainer}>
                    <Text style={examModuleStyle.noSetText}>No sets available</Text>
                  </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
  );
};

export default WrittenCompre;
