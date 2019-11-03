import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import apis from 'configs/apis';
import moment from 'moment';
class MyDrugScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          _id: 1,
          name: 'Đơn thuốc bệnh viện E'
        },
        {
          _id: 2,
          name: 'Đơn thuốc bệnh viện E'
        },
        {
          _id: 3,
          name: 'Đơn thuốc bệnh viện E'
        },
      ]
    };
  }
  gotoDetail = (item) => () => {
    NavigationServices.navigate(screenName.DetailDrugScreen, {
      item
    })
  }
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    let res = await apis.fetch(apis.PATH.PRESCRIPTION)
    if (res && res.code == 200) {
      this.setState({ data: res.data })
    }
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this.gotoDetail(item)}
        style={styles.containerItem}>
        <Image source={R.images.icons.drug.ic_drugs} style={styles.iconDrug} />
        <View style={{
          paddingLeft: 10
        }}>
          <Text style={styles.txtName}>{item.name}</Text>
          <Text style={{
            color:R.colors.black,
            fontFamily:R.fonts.Medium,
            paddingBottom:4
          }}>Chẩn đoán: {item.diagnose}</Text>
          <Text style={styles.txtTime}>{moment(item.create_at).format('HH:mm - DD/MM/YYYY')}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  keyExtractor = (item, index) => `${item._id || index}`
  render() {
    const { data } = this.state
    return (
      <Container>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </Container>
    );
  }
}

export default MyDrugScreen;


const styles = StyleSheet.create({
  txtTime: {
    color: R.colors.gray,
    fontFamily: R.fonts.LightItalic
  },
  txtName: {
    color: R.colors.black,
    fontFamily: R.fonts.Bold,
    fontSize: 15,
    paddingBottom: 7
  },
  iconDrug: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    flex: 1,
    borderColor: R.colors.black9,
    borderWidth: 0.2,
    borderRadius: 8,
    padding: 15,
    backgroundColor: R.colors.white,
    elevation: 4
  },
})