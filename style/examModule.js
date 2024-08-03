import { StyleSheet } from "react-native";
import Colors from "../colors/Color";

const examModuleStyle = StyleSheet.create({
    mainConatiner: {
        flex: 1,
        backgroundColor: Colors.backGround,
    },

    subContainer: {
        marginTop: 50,
    },
    contentContainer: {
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },
    progressActionBar: {
        display: 'flex',
        flexDirection: 'row',
    },

    progressWidth: {
        width: '80%',
    },

    verticalDivider: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 1,
        backgroundColor: Colors.white,
    },

    countChip: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingStart: 20,
        paddingEnd: 20,
        marginTop: 5,
        marginStart: 10,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: Colors.chipColor,
    },

    questionText: {
        color: Colors.white,
        fontSize: 20,
    },

    questionConatiner: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 40,
    },
    bottomNavigation: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },

    btnBottom: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 20,
    },

    btnSkip: {
        marginStart: 40,
    },

    btnSkipTextDecor: {
        fontSize: 18,
        color: Colors.textGray,
    },

    btnNext: {
        padding: 5,
        paddingEnd: 20,
        paddingStart: 20,
        backgroundColor: Colors.primary,
        marginRight: 40,
        borderRadius: 30,
        textAlign:"center"
    },
    ValueChip: {

        padding: 5,
        paddingEnd: 20,
        paddingStart: 20,
        textAlign:"center",
        backgroundColor: Colors.chipColor,
        borderRadius: 30,
    },
    btnTextColor: {
        color: Colors.white,
        fontSize: 15,
    },
    noSetText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backGround, // Ensure no opacity
    },
    activityIndicator: {
        color: 'blue', // Set the color of the ActivityIndicator
    },
    addNewSetBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 50,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        marginTop: 20,
        marginBottom:15,


    },
    addNewSetText: {
        color: Colors.white,
        fontSize: 18,
    },
});

export default examModuleStyle;
