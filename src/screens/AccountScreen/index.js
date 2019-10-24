import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Container from 'library/Container'
import NavigationServices from 'routes/NavigationServices'
import screenName from 'configs/screenName'

class AccountScreen extends Component {
    onLogout=()=>{
        NavigationServices.navigate(screenName.AuthenStack)
    }
    render() {
        return (
            <View style={{
                flex:1
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

export default AccountScreen
