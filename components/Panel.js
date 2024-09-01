import React from 'react';
import { View, StyleSheet, Image } from "react-native";
import Colors from "../colors/Color";

const Panel = ({ userLevel }) => {
    const getImageStyle = (levelRange) => {
        if (userLevel >= levelRange[0] && userLevel <= levelRange[1]) {
            return { backgroundColor: 'yellow' }; // Change color as needed
        }
        return {};
    };

    return (
        <View>
            <View style={paneStyle.rowPane}>
                <View style={[paneStyle.circle, getImageStyle([1, 3])]}>
                    <Image source={require('../img/ic_pane_one.png')} />
                </View>
                <View style={[paneStyle.circle, getImageStyle([4, 7])]}>
                    <Image source={require('../img/ic_pan_two.png')} />
                </View>
                <View style={[paneStyle.circle, getImageStyle([8, 11])]}>
                    <Image source={require('../img/ic_flag_pane.png')} />
                </View>
            </View>

            <View style={paneStyle.rowPane}>
                <View style={[paneStyle.circle, getImageStyle([12, 15])]}>
                    <Image source={require('../img/mana.png')} />
                </View>
                <View style={[paneStyle.circle, getImageStyle([16, 18])]}>
                    <Image source={require('../img/shield.png')} />
                </View>
                <View style={[paneStyle.circle, getImageStyle([19, 20])]}>
                    <Image source={require('../img/ship.png')} />
                </View>
            </View>
        </View>
    );
};

const paneStyle = StyleSheet.create({
    rowPane: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.cardBf,
    },
});

export default Panel;
