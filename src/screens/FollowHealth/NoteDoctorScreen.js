import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';

class NoteDoctorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: 'Điều trị y tế',
                    new: 'Lời dặn mới',
                    note: 'Lời dặn chung về vấn đề chế độ ăn uống, các thức ăn nên và không nên ăn, các hoạt động nên luyện tập và nên tránh...'
                },
                {
                    id: 2,
                    name: 'Chế độ ăn uống, luyện tập',
                    new: 'Lời dặn mới',
                    note: 'Lời dặn chung về vấn đề chế độ ăn uống, các thức ăn nên và không nên ăn, các hoạt động nên luyện tập và nên tránh...'
                },
                {
                    id: 3,
                    name: 'Dấu hiệu cần lưu ý',
                    new: 'Lời dặn mới',
                    note: 'Lời dặn chung về vấn đề chế độ ăn uống, các thức ăn nên và không nên ăn, các hoạt động nên luyện tập và nên tránh...'
                },
                {
                    id: 4,
                    name: 'Điều trị y tế',
                    new: 'Lời dặn mới',
                    note: 'Lời dặn chung về vấn đề chế độ ăn uống, các thức ăn nên và không nên ăn, các hoạt động nên luyện tập và nên tránh...'
                },
            ]
        };
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    _renderItem = ({ item, index }) => {
        return (
            <View style={{paddingTop:10}}>
                <Text style={{
                    fontFamily: R.fonts.Bold,
                    fontSize: 16
                }}>{item.name}</Text>
                <Text style={{
                    fontFamily: R.fonts.Italic,
                    color: R.colors.defaultColor
                }}>{item.new}</Text>
                <Text >({item.note})</Text>
            </View>
        )
    }
    render() {
        const { data } = this.state
        return (
            <Container >
                <FlatList
                    data={data}
                    style={{ padding: 10 }}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />

            </Container>
        );
    }
}

export default NoteDoctorScreen;
