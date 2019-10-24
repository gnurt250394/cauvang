import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import utils, { height } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import firebase from 'react-native-firebase';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scroll = new Animated.Value(0)
  }
  componentDidMount = async () => {
    firebase.messaging().getToken().then(res => {
      console.log('res: ', res);
      utils.database.tokenFCM = res
    })
    let token = await utils.getItem(utils.KEY.TOKEN)
    if (token) {
      utils.database.token = token
      setTimeout(() => {
        this.props.navigation.navigate(screenName.HomeStack)
      }, 1000)
    } else {
      setTimeout(() => {
        this.props.navigation.navigate(screenName.AuthenStack)
      }, 1000)
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is SplashScreen</Text>
      </View>
    );
  }
}

export default SplashScreen;
