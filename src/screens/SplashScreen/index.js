import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import utils, { height } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { login, logout } from 'middlewares/actions/login/actionLogin';
import apis from 'configs/apis';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scroll = new Animated.Value(0)
  }
  componentDidMount = async () => {
    firebase.messaging().getToken().then(res => {
      utils.database.tokenFCM = res
    })
    let token = await utils.getItem(utils.KEY.TOKEN)
    if (token) {
      utils.database.token = token
      this.getData()
      setTimeout(() => {
        this.props.navigation.navigate(screenName.HomeStack)
      }, 1000)
    } else {
      setTimeout(() => {
        this.props.navigation.navigate(screenName.LoginScreen)
      }, 1000)
    }
  };
  getData = async () => {
    let res = await apis.fetch(apis.PATH.USER, {}, true)
    if (res && res.code == 200) {
      this.props.dispatch(login(res.data, res.count))
    } else {
      this.props.dispatch(logout())
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is SplashScreen</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(SplashScreen);
