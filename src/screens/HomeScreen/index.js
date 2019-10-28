/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Container from 'library/Container';
import { getLogin } from 'configs/apis/requestAuthen';
import utils from 'configs/utils';
import HomeNotAuthScreen from './HomeNotAuthScreen';
import HomeLoginScreen from './HomeLoginScreen';
class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = async () => {
    };

    render() {
        console.log('utils.database.token: ', utils.database.token);
        if (utils.database.token) {
            
            return (
                <HomeLoginScreen />
            );
        } else {
            return (
                <HomeNotAuthScreen />
            )
        }

    }
}

const styles = StyleSheet.create({
    example: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20
    },

});

export default HomeScreen