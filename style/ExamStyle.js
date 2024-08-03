import Colors from "../colors/Color";
import { StyleSheet } from "react-native";

const ExamStyle = StyleSheet.create({
    CardContainer: {
        flexDirection: 'row', // Horizontal arrangement
        justifyContent: 'space-between', // Space between cards
        alignItems: 'center',
        marginBottom: 20, // Space between rows
    },
    card: {
        margin: 5,
        backgroundColor: Colors.cardBf,
        borderRadius: 20,
        padding: 20,
        flex: 1, // Allow the card to take up available space
        maxWidth: '45%', // Adjust this to fit two cards per row
    },
    cardHeading: {
        fontSize: 18,
        marginTop: 15,
    },
    cardDetail: {
        marginTop: 15,
        marginBottom: 10,
    },
    proContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proTextContainer: {
        marginStart: 20,
    },
    cardTextDetail: {
        color: Colors.gray,
    },
});

export default ExamStyle;
