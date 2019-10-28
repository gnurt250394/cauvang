import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import apis from 'configs/apis';
import { updateCountNoti } from 'middlewares/actions/notification/actionNotification';
import R from 'res/R';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi'
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    let res = await apis.fetch(apis.PATH.NOTIFICATION)
    if (res && res.code == 200) {
      this.setState({ data: res.data })
      this.props.dispatch(updateCountNoti(res.count))
    }
  }
  renderTitle = (item) => {
    switch (item.type) {
      case 1: return 'Lịch khám'
      case 2: return 'Dấu hiệu bất thường'
      case 3: return 'Lời dặn'
      case 4: return 'Tư vấn'
      case 5:
      case 6: return 'Thuốc'
      default: return 'Thông báo'
    }
  }
  formatDate = (item) => {
    return moment(item.create_at).fromNow()
  }
  renderItem = ({ item, index }) => {
    const icon = item.image ? { uri: item.image } : R.images.icons.ic_notification
    return (
      <TouchableOpacity style={styles.containerItem}>
        <Image source={icon} style={[styles.imageNoti, { resizeMode: item.image ? 'cover' : 'contain' }]} />
        <View style={styles.containerText}>
          <Text style={styles.txtTitle}>{this.renderTitle(item)}</Text>
          <Text>{item.title}</Text>
          <Text style={styles.txtTime}>{this.formatDate(item)}</Text>

        </View>
      </TouchableOpacity>
    )
  }
  keyExtractor = (item, index) => `${item._id || index}`
  listEmpty=()=> <Text style={{
    paddingTop:30,
    textAlign:'center',
    fontFamily:R.fonts.Black,
    fontSize:19
  }}>Không có dữ liệu</Text>
  render() {
    const { data } = this.state
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#eee'
      }}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.listEmpty}
        />
      </View>
    );
  }
}

export default connect()(NotificationScreen);


const styles = StyleSheet.create({
  txtTime: {
    paddingTop: 3,
    fontFamily: R.fonts.Italic,
    color: R.colors.gray
  },
  txtTitle: {
    fontFamily: R.fonts.Black,
    fontSize: 15,
    paddingBottom: 7
  },
  containerText: {
    paddingLeft: 10
  },
  imageNoti: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  containerItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  },
})