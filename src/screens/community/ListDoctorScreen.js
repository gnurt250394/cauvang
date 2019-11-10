import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import ItemDoctor from './ItemDoctor';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import { getlistMessage } from 'configs/apis/getListMessage';
import status from 'configs/constants';
import apis, { BASE_URI } from 'configs/apis';

class ListDoctorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            size: 20,
        };
    }
    detailAlert = (item) => () => {
        NavigationServices.navigate(screenName.DetailAlert, {
            item
        })
    }
    componentDidMount = () => {
        this.getData()
    };
    loadMore = () => {
        const { data, page, size } = this.state
        if (data.length >= page * size) {
            this.setState(preState => {
                return { page: preState.page + 1 }
            }, this.getData)
        }
    }
    getData = async () => {
        let res = await apis.fetch(apis.PATH.HISTORY_ALERT + `?page=${this.state.page}&size=${this.state.size}`, {})
        if (res && res.length > 0) {
            this.formatData(res)
        }
    }
    formatData = (data) => {
        if (data.length == 0) {

        } else {
            if (this.state.page == 1) {
                this.setState({ data: data })
            } else {
                this.setState(preState => {
                    return { data: [...preState.data, ...data] }
                })
            }
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <ItemDoctor item={item} onPress={this.detailAlert(item)} />
        )
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    render() {
        const { data, listHistoryDoctor } = this.state
        return (
            <FlatList
                data={data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.6}
            />
        );
    }
}

export default ListDoctorScreen;
