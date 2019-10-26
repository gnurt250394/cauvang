import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import apis from 'configs/apis';

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  getData = async () => {
    let res = await apis.fetch(apis.PATH.NOTIFICATION)
    if (res && res.code == 200) {
      this.setState({ data: res.data })
    }
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  keyExtractor = (item, index) => `${item._id || index}`
  render() {
    const { data } = this.state
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default NotificationScreen;
