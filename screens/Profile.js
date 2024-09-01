import { View, Text, Image } from 'react-native';
import ssStyle from '../style/ssstyle';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import profileStyle from '../style/profileStyle';
import ProgressCard from '../components/ProgressCard';
import Colors from '../colors/Color';
import Panel from '../components/Panel';
import ModalComponent from '../components/ConfirmModal';
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { useUser } from '../context/UserContext';

const levelThresholds = [
    { level: 1, points: 100 },
    { level: 2, points: 219 },
    { level: 3, points: 362 },
    { level: 4, points: 535 },
    { level: 5, points: 745 },
    { level: 6, points: 1002 },
    { level: 7, points: 1319 },
    { level: 8, points: 1714 },
    { level: 9, points: 2210 },
    { level: 10, points: 2838 },
    { level: 11, points: 3640 },
    { level: 12, points: 4684 },
    { level: 13, points: 5030 },
    { level: 14, points: 6800 },
    { level: 15, points: 9153 },
    { level: 16, points: 12303 },
    { level: 17, points: 16594 },
    { level: 18, points: 22491 },
    { level: 19, points: 30693 },
    { level: 20, points: 42245 },
];

const getUserLevel = (points) => {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (points >= levelThresholds[i].points) {
            return levelThresholds[i].level;
        }
    }
    return 1;
};

const Profile = () => {
    const { user } = useUser();
    const Navigator = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const [userPoints, setUserPoints] = useState(0);
    const [userLevel, setUserLevel] = useState(1);

    useEffect(() => {
        const fetchUserPoints = async () => {
            const points = user?.points;
            setUserPoints(points);
            setUserLevel(getUserLevel(points));
        };

        fetchUserPoints();
    }, [user]);

    const onClose = () => {
        setIsOpen(false);
    };

    const onRedirect = () => {
        setIsOpen(false);
        Navigator.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    };

    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                console.log('User signed out successfully');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <>
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
                                }}>
                                <Image source={require('../img/back.png')} />
                            </TouchableOpacity>
                            <Text style={profileStyle.textColor}>Profile</Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Navigator.navigate('editProfile');
                                    }}>
                                    <Text style={profileStyle.editProfile}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={profileStyle.contentContainer}>
                        <View style={profileStyle.profileContainer}>
                            <Image
                                source={require('../img/profile_pic.png')}
                            />
                            <Text style={profileStyle.profileName}>{auth.currentUser?.displayName}</Text>
                            <Text style={profileStyle.profileEmail}>{auth?.currentUser?.email}</Text>
                        </View>
                        <View style={profileStyle.progressCardConatiner}>
                            <Text style={{ marginBottom: 15, color: Colors.gray }}>Your Progress</Text>
                            <ProgressCard userLevel={userLevel} userPoints={userPoints} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Panel userLevel={userLevel} />
                        </View>
                        <View style={profileStyle.notificationConatiner}>
                            <View style={profileStyle.notificationSubContainer}>
                                <Image source={require('../img/notification.png')} />
                                <View style={profileStyle.notifyTextContainer}>
                                    <Text style={profileStyle.notifyHeding}>Do not disturb</Text>
                                    <Text style={profileStyle.notifySubHeding}> off</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={profileStyle.logoutContainer} onPress={() => setIsOpen(true)}>
                            <Text style={profileStyle.logoutHeading}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                onRedirect={onRedirect}
                message={'Are you sure to logout '}
            />
        </>
    );
};

export default Profile;
