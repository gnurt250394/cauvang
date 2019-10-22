import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import R from 'res/R';
import { height } from 'configs/utils';

class ListDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onSelectDrug = (item) => () => {
        this.props.onPress && this.props.onPress(item)
    }
    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={this.onSelectDrug(item)}
                style={{
                    backgroundColor: R.colors.secondColor,
                    paddingVertical: 10,
                    paddingLeft: 10,
                    borderBottomColor: R.colors.gray,
                    borderBottomWidth: 1
                }}
            >
                <Text style={{ fontFamily: R.fonts.Black }}>{item.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems:'center'
                }}>
                    <Text style={{
                        fontFamily:R.fonts.Regular,
                        paddingRight:5
                    }}>Hàm lượng:</Text>
                    <Text style={{
                        fontFamily: R.fonts.BlackItalic,
                        paddingVertical: 3
                    }}>{item.content}</Text>
                </View>

            </TouchableOpacity>
        )
    }
    keyExtractor = (item, index) => `${item.id || index}`
    render() {
        const { data } = this.props
        return (
                <FlatList
                    data={data}
                    nestedScrollEnabled={true}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: height / 3 }}
                    keyExtractor={this.keyExtractor}
                />
        );
    }
}

export default ListDrug;
