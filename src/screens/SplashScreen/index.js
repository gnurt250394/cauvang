import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import utils, { height } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scroll = new Animated.Value(0)
  }
  componentDidMount = async () => {
      let token = await utils.getItem(utils.KEY.TOKEN)
      if (token) {
          setTimeout(() => {
              NavigationServices.navigate(screenName.HomeStack)
          }, 3000)
      } else {
          setTimeout(() => {
              NavigationServices.navigate(screenName.AuthenStack)
          }, 3000)
      }
  };

  render() {
    return (
      <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
        <Text>This is SplashScreen</Text>
      </View>
    );
  }
}

export default SplashScreen;
