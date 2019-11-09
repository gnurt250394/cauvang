import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, Image } from 'react-native';
import utils, { height, width } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { login, logout } from 'middlewares/actions/login/actionLogin';
import apis from 'configs/apis';
import R from 'res/R';
import jwtDecode from 'jwt-decode';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.anim = new Animated.Value(0)
  }
  componentDidMount = async () => {
    utils.getItem(utils.KEY.KEY_HAS_UPDATE_NEW_VERSION).then(key => {
      utils.setItem(utils.KEY.KEY_HAS_UPDATE_NEW_VERSION, 0)
      if (key == 1) {
        utils.alertSuccess('Ứng dụng của bạn đã được cập nhật')
      }
    })
    firebase.messaging().getToken().then(res => {
      utils.database.tokenFCM = res
    })
    let token = await utils.getItem(utils.KEY.TOKEN)
    console.log('token: ', token);
    if (token) {
      var decoded = jwtDecode(token);
      utils.database.token = token
      utils.database.user = decoded

      setTimeout(() => {
        this.props.navigation.navigate(screenName.HomeScreen)
      }, 1000)

    } else {
      setTimeout(() => {
        this.props.navigation.navigate(screenName.AuthenStack)
      }, 1000)
    }
    this.animation()
  };
  getData = async () => {

  }
  animation = () => {
    Animated.spring(this.anim, {
      toValue: 1,
      delay: 300,
    })
  }
  render() {
    return (
      <View style={styles.container}>

        <Image source={R.images.icons.giphy} style={{
          height: width / 2,
          width: width / 2,
        }} />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(SplashScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})