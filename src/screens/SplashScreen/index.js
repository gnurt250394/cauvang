import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import utils, { height } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import PDFView from 'react-native-view-pdf';
const NAVBAR_HEIGHT = 55;
const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://www.alejandrodelasota.org/wp-content/uploads/2013/03/demoform1.pdf',
  base64: 'https://www.alejandrodelasota.org/wp-content/uploads/2013/03/demoform1.pdf',
};
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scroll = new Animated.Value(0)
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
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
    const resourceType = 'base64';
    const tabY = Animated.add(this.scroll, this.headerY);
    return (
      <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
        <Text>This is SplashScreen</Text>
      </View>
    );
  }
}

export default SplashScreen;
