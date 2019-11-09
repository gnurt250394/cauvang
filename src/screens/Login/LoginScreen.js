import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import FlashMessage from 'library/FlashMessage';
import { showMessage } from 'react-native-flash-message';
import HeaderDefault from 'components/HeaderDefault';
import ButtonBase from 'components/ButtonBase';
import InputAuthen from 'components/LoginComponent/InputAuthen';
import R from 'res/R';
import Container from 'library/Container';
import { requestLogin } from 'configs/apis/requestAuthen';
import status from 'configs/constants';
import utils, { width, height } from 'configs/utils';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'library/Loading/LoadingComponent';
import { login } from 'middlewares/actions/login/actionLogin';
import firebase from 'react-native-firebase';
import apis from 'configs/apis';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      item: this.props.navigation.getParam('item', {})
    };
    this.nextScreen = this.props.navigation.getParam('nextScreen')
  }
  onLogin = async () => {
    let email = this.inputEmail.getValue()
    let password = this.inputPass.getValue()
    let res = await apis.post(apis.PATH.LOGIN, { username: email, password: password })
    console.log('res: ', res);
    if (res && res.token) {
      utils.setItem(utils.KEY.TOKEN, res.token)
      utils.database.token = res.token
      utils.alertSuccess('Đăng nhập thành công')
      if (this.nextScreen) {
        NavigationServices.navigate(this.nextScreen, {
          item: this.state.item
        })
      } else {
        NavigationServices.navigate(screenName.HomeScreen)
      }
    } else {
      utils.alertDanger(res.message)
    }
  }
  componentDidMount = () => {
    firebase.messaging().getToken()
      .then((token) => {
        console.log('Device FCM Token: ', token);
        utils.database.tokenFCM = token;
        firebase.messaging().subscribeToTopic("SHIBA_test");
      });
  };


  onForgotPass = () => {
    console.log(1111)
    NavigationServices.navigate(screenName.InputPhoneScreen, {
      type: utils.database.forgotPass
    })
  }
  render() {
    return (
      <Container >
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Image source={R.images.icons.ic_sos3} style={styles.imageSos} />
            <InputAuthen
              label="Số điện thoại"
              placeholder="Vd: 0987654321"
              ref={ref => this.inputEmail = ref}
              maxLength={10} />
            <InputAuthen
              label="Mật khẩu"
              placeholder="********"
              ref={ref => this.inputPass = ref}
              secureTextEntry={true} />
            <Text onPress={this.onForgotPass} style={styles.txtForgotPass}>Quên mật khẩu?</Text>
            <ButtonBase
              onPress={this.onLogin}
              styleButton={styles.buttonLogin}
              value="ĐĂNG NHẬP " />
            {/* <ButtonBase
            onPress={this.onRegister}
            styleButton={{
              backgroundColor: R.colors.blue,
            }}
            styleText={{ color: R.colors.white }}
            value="ĐĂNG KÝ " /> */}

          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default connect()(LoginScreen);


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: R.colors.transparent,
    paddingTop: '30%',
  },
  imageSos: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },
  container: {
    paddingTop: 10,
    width: width - 40,
    backgroundColor: R.colors.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  txtForgotPass: {
    textDecorationLine: 'underline',
    textAlign: 'right',
    paddingRight: 15,
    fontFamily: R.fonts.LightItalic,
    paddingVertical: 10,
    color: R.colors.textColor
  },
  buttonLogin: {
    backgroundColor: R.colors.secondColor,
    marginTop: 20,
  },
})