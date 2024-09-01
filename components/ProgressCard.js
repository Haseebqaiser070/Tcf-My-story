import { View, Text, StyleSheet } from "react-native";
import Colors from "../colors/Color";
import { LinearGradient } from "expo-linear-gradient";

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

const ProgressCard = ({ userLevel, userPoints }) => {
    const currentLevelThreshold = levelThresholds?.find(threshold => threshold.level === userLevel);
    const nextLevelThreshold = levelThresholds?.find(threshold => threshold.level === userLevel + 1);
    const pointsNeeded = nextLevelThreshold ? nextLevelThreshold.points - userPoints : 0;
    const progress = nextLevelThreshold ? ((userPoints - currentLevelThreshold.points) / (nextLevelThreshold.points - currentLevelThreshold.points)) * 100 : 100;

    return (
        <View style={cardStyle.mainContainer}>
            <View style={cardStyle.progressContainer}>
                <Text style={cardStyle.levelText}>{`Level ${userLevel}`}</Text>
                <View style={cardStyle.progressBarBackground}>
                    <LinearGradient
                        colors={['#E42A6C', '#C393FF']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[cardStyle.progressBarFill, { width: `${progress}%` }]}
                    />
                    <Text style={cardStyle.progressText}>{`${pointsNeeded} points to Level ${userLevel + 1}`}</Text>
                </View>
                <Text style={cardStyle.levelText}>{`Level ${userLevel + 1}`}</Text>
            </View>

            <View style={cardStyle.subContainer}>
                <Text style={cardStyle.levelBadge}>Level {userLevel}</Text>
                <Text style={cardStyle.levelTwo}>Complete this level to get reward</Text>
            </View>
        </View>
    );
};

const cardStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.cardBf,
        padding: 20,
        borderRadius: 10,
    },
    subContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelBadge: {
        backgroundColor: Colors.badgeColor,
        color: Colors.white,
        padding: 10,
        borderRadius: 10,
    },
    levelTwo: {
        marginStart: 10,
        color: Colors.white,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBarBackground: {
        flex: 1,
        height: 10,
        backgroundColor: Colors.extraColor,
        borderRadius: 5,
        marginHorizontal: 10,
        position: 'relative',
        justifyContent: 'center',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    progressText: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        color: Colors.white,
        fontSize: 12,
    },
    levelText: {
        color: Colors.white,
        fontSize: 12,
    },
});

export default ProgressCard;
