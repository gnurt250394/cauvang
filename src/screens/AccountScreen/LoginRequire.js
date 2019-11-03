import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class LoginRequire extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    _navigator = (routerName, params) => () => {
        NavigationServices.navigate(routerName, params)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.group}>
                    <TouchableOpacity
                        onPress={this._navigator(screenName.LoginScreen)}
                        style={styles.containerLogin}>
                        <Text style={styles.txtLogin}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._navigator(screenName.InputPhoneScreen)}
                        style={styles.containerRegister}>
                        <Text style={styles.txtRegister}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LoginRequire;


const styles = StyleSheet.create({
    txtRegister: {
        fontFamily: R.fonts.Medium,
        color: R.colors.textColor,
        fontSize: 16
    },
    containerRegister: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    txtLogin: {
        color: R.colors.defaultColor,
        fontFamily: R.fonts.Medium,
        fontSize: 16
    },
    containerLogin: {
        flex: 1,
        height: '100%',
        borderRightColor: R.colors.black,
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: R.colors.secondColor
    },
    group: {
        backgroundColor: R.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        width: '60%'
    },
    container: {
        flex: 1,
        backgroundColor: R.colors.black9,
        alignItems: 'center',
        justifyContent: 'center'
    },
})