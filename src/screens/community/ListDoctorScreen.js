import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import ItemDoctor from './ItemDoctor';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import { getlistMessage } from 'configs/apis/getListMessage';
import status from 'configs/constants';
import { BASE_URI } from 'configs/apis';

class ListDoctorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // {
                //     id: 1,
                //     name: 'Nguyễn Văn A',
                //     time: '10:12',
                //     message: 'đây là tin nhắn'
                // },
                // {
                //     id: 2,
                //     name: 'Đào Trọng Tấn',
                //     time: '10:12',
                //     message: 'đây là tin nhắn'
                // },
                // {
                //     id: 3,
                //     name: 'Chu',
                //     time: '10:12',
                //     message: 'đây là tin nhắn'
                // },
            ],
            listHistoryDoctor: [

            ]
        };
    }
    chatWithDoctor = (item) => () => {
        NavigationServices.navigate(screenName.MessageScreen, {
            item
        })
    }
    componentDidMount = () => {
        this.getData()
    };
    getData = async () => {
        let res = await getlistMessage()
        if (res && res.code == status.SUCCESS) {
            this.setState({ data: res.data })
        }
    }
    _renderItem = ({ item, index }) => {
        console.log('item: ', item._id);
        return (
            <ItemDoctor item={item} onPress={this.chatWithDoctor(item)} />
        )
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    _renderItemListHistoryDoctor = ({ item, index }) => {
        console.log(' item.name.indexOf : ', item.name.indexOf(' '));
        return (
            <TouchableOpacity style={{
                alignItems: 'center',
                padding: 5
            }}>
                <Image source={item.image ? (item.image.indexOf('http') == 0 ? item.image : BASE_URI + item.image) : R.images.default.logo} style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35
                }} />
                <Text style={{
                    fontFamily: R.fonts.Regular
                }}>{item.name.indexOf(' ') == -1 ? item.name : item.name.substring(0, item.name.indexOf(' '))}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const { data, listHistoryDoctor } = this.state
        return (
            <Container>
                {/* <View style={{
                    padding: 15
                }}>
                    <Text>Bác sĩ đã tư vấn gần đây</Text>
                    <FlatList
                        data={data}
                        horizontal={true}
                        renderItem={this._renderItemListHistoryDoctor}
                        keyExtractor={this._keyExtractor}
                    />
                </View> */}
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </Container>
        );
    }
}

export default ListDoctorScreen;
