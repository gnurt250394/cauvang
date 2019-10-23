import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import R from 'res/R';
import { BASE_URI } from 'configs/apis';
import moment from 'moment'
class ItemDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    formatTime = (time) => {
        return moment(time).format('HH:mm')
    }
    render() {
        const { item, onPress } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.containerItem}
            >
                <Image source={item._id.image ? ({ uri: item._id.image.indexOf('http') == 0 ? item._id.image : BASE_URI + item._id.image }) : R.images.default.logo} style={styles.imageAvatar} />

                <View style={styles.containerLabel}>
                    <View style={styles.containerName}>
                        <Text style={styles.txtName}>{item._id.name}</Text>
                        <Text>{this.formatTime(item.create_at)}</Text>
                    </View>
                    <Text>{item.message}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ItemDoctor;


const styles = StyleSheet.create({
    containerLabel: {
        paddingLeft: 10
    },
    txtName: {
        fontFamily: R.fonts.Bold,
    },
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%'
    },
    imageAvatar: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
})