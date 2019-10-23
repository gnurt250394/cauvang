import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import { getlistMessage } from 'configs/apis/getListMessage';

class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item') || {},
      data: [],
      page: 1
    };
  }
  componentDidMount =  () => {
    this.getData()
  };
  getData = async() => {
    const { item, page } = this.state
    let res = await getlistMessage(item.id, page)
  }
  videoCall = () => {
    NavigationServices.navigate(screenName.VideoCallScreen)
  }
  _renderItem = ({ item, index }) => {
    return (
      <View>

      </View>
    )
  }
  keyExtractor = (item, index) => `${item.id || index}`
  render() {
    const { item, data } = this.state
    return (
      <Container
        title={item.name}
        iconRight={R.images.icons.ic_facetime}
        onPressRight={this.videoCall}
      >
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
        />
      </Container>
    );
  }
}

export default MessageScreen;
