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
    renderIcon = (item) => {
        switch (item.level) {
            case 'NC1':
                return R.images.icons.ic_callSOS
            case 'NC2':
                return R.images.icons.ic_callSOS2
            case 'NC3':
                return R.images.icons.ic_callSOS3
            default: return R.images.icons.ic_callSOS
        }
    }
    formatDate = (item) => {
        return moment(item.created).format('HH:mm DD/MM/YYYY')
        
    }
    render() {
        const { item, onPress } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.containerItem}
            >
                <Image source={this.renderIcon(item)} style={styles.imageAvatar} />

                <View style={styles.containerLabel}>
                    <Text style={[styles.txtName,{paddingBottom: 10,}]}>{item.department.name}</Text>
                    <Text style={styles.txtName}>{this.formatDate(item)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ItemDoctor;


const styles = StyleSheet.create({
    containerLabel: {
        paddingLeft: 20
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
        borderRadius: 25,
        resizeMode:'contain'
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor:R.colors.gray,
        borderWidth:1,
        borderRadius:10,
        margin:10
    },
})