import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Container from 'library/Container'
import NavigationServices from 'routes/NavigationServices'
import screenName from 'configs/screenName'
import utils from 'configs/utils'
import { connect } from 'react-redux';
import { logout } from 'middlewares/actions/login/actionLogin'
import R from 'res/R'

class AccountScreen extends Component {
    onLogout = () => {
        this.props.dispatch(logout())
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding:10
                }}>
                    <Image source={R.images.icons.ic_user} style={{
                        height: 70,
                        width: 70,
                        borderRadius: 35
                    }} />
                    <Text>Hoang trung</Text>
                </View>
                <TouchableOpacity
                    onPress={this.onLogout}
                >
                    <Text>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});


export default connect(mapStateToProps)(AccountScreen)
