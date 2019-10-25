import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Container from 'library/Container'
import NavigationServices from 'routes/NavigationServices'
import screenName from 'configs/screenName'
import utils from 'configs/utils'
import { connect } from 'react-redux';
import { logout } from 'middlewares/actions/login/actionLogin'

class AccountScreen extends Component {
    onLogout = () => {
        this.props.dispatch(logout())
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
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
