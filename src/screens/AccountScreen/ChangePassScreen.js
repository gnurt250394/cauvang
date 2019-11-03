import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import utils from 'configs/utils';
import apis from 'configs/apis';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class ChangePassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password1: '',
            phone: this.props.navigation.getParam('phone', "")
        };
    }
    onChangeText = (state) => (value) => {
        this.setState({ [state]: value })
    }
    onChangePass = async () => {
        const { password, password1, phone } = this.state
        if (!password && !password1) {
            utils.alertDanger('Vui lòng nhập mật khẩu')
            return
        }
        if (password != password1) {
            utils.alertDanger('Mật khẩu mới và mật khẩu nhập lại không khớp')
            return
        }
        if (phone) {
            let res = await apis.put(apis.PATH.FORGOT_PASS, { password, phone })
            if (res && res.code == 200) {
                utils.alertSuccess(res.message)
                NavigationServices.navigate(screenName.LoginScreen)
            }
        } else {
            let res = await apis.put(apis.PATH.CHANGE_PASS, { password })
            if (res && res.code == 200) {
                utils.alertSuccess(res.message)
                NavigationServices.pop()
            }
        }

    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onChangeText('password')}
                        secureTextEntry={true}
                        placeholder="Nhập mật khẩu mới"
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputPass}
                        onChangeText={this.onChangeText('password1')}
                        placeholder="Nhập lại mật khẩu mới"
                    />
                    <TouchableOpacity
                        onPress={this.onChangePass}
                        style={styles.buttonChange}
                    >
                        <Text style={styles.txtChange}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default ChangePassScreen;


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    txtChange: {
        color: R.colors.black,
        fontFamily: R.fonts.BlackItalic,
        fontSize: 16
    },
    buttonChange: {
        backgroundColor: R.colors.secondColor,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20
    },
    inputPass: {
        borderBottomColor: R.colors.black5,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    input: {
        borderBottomColor: R.colors.black5,
        borderBottomWidth: 1,
    },
})