import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from 'res/R';

class LoginRequire extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: R.colors.black9,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: R.colors.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    height: 50,
                    width: '60%'
                }}>
                    <View style={{
                        flex: 1,
                        height:'100%',
                        borderRightColor: R.colors.black,
                        borderRightWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color:R.colors.defaultColor,
                            fontFamily:R.fonts.Medium
                        }}>Đăng nhập</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily:R.fonts.Medium,
                            color:R.colors.textColor
                        }}>Đăng ký</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default LoginRequire;
