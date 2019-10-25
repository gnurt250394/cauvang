
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from 'react-native';

import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';
import R from 'res/R';
import apis from 'configs/apis';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import utils from 'configs/utils';
import firebase from 'react-native-firebase';
import { showLoading, hideLoading } from 'library/Loading/LoadingComponent';
import CustomOtp from './CustomOtp';


const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = '#744BAC';

class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  _onChangeText = (val) => {

    if (!this.state.enterCode) return;
    if (val.length === MAX_LENGTH_CODE)
      this.confirmCode();
  }

  _tryAgain = () => {
    NavigationServices.pop()
  }

  _getSubmitAction = () => {
    this.state.enterCode ? this.confirmCode() : this._getCode();
  }

  _changeCountry = (country) => {

    this.setState({ country });
    this.form.refs.textInput.focus();
  }

  _renderFooter = () => {

      return (
        <View>
          <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
            Enter the wrong number or need a new code?
      </Text>
        </View>
      );

   

  }


  render() {
    let headerText = `What's your verification code?`;
    let buttonText = 'Verify confirmation code';
    let textStyle = this.state.enterCode ? {
      height: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier'
    } : {};

    return (
      <View style={styles.container}>

        <Text style={styles.header}>{headerText}</Text>


        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <CustomOtp
            style={{ width: '80%', height: 200 }}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {
              console.log(`Code is ${code}, you are good to go!`)
            })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        {this._renderFooter()}




      </View>
    );
  }
}

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.white
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: brandColor
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey',
    textAlign: 'center'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
export default OtpScreen;
