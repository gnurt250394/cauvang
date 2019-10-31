import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class TestResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type', 1)
        };
    }
    renderType = () => {
        console.log(this.state.type)
        switch (this.state.type) {
            case '1': return 'Chỉ số trong ngưỡng an toàn \nĐề nghị duy trì chế độ'
            case '2': return 'Chỉ số vượt ngưỡng an toàn \nĐề nghị điều chỉnh chế độ theo '
            case '3': return 'Chỉ số đáng lo ngại! \n Đề nghị liên hệ bác sĩ để được khám ngay'
            default: return 'aaaaa'
        }
    }
    renderImage = () => {
        switch (this.state.type) {
            case '1': return R.images.icons.follow_health.ic_success
            case '2': return R.images.icons.follow_health.ic_warning
            case '3': return R.images.icons.follow_health.ic_danger
            default: return R.images.icons.follow_health.ic_success
        }
    }
    goHome=()=>{
        NavigationServices.navigate(screenName.HomeScreen)
    }
    render() {
        return (
            <View style={styles.containerAlert}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={this.renderImage()} style={styles.imageAlert} />
                    <Text style={styles.txtAlert}>{this.renderType()} </Text>
                    {
                        this.state.type == '2' ?
                            <TouchableOpacity>
                                <Text style={{
                                    fontFamily: R.fonts.Bold,
                                }}>Lời dặn của bác sĩ</Text>
                            </TouchableOpacity>
                            : null

                    }
                </View>
                <View style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 35
                }}>
                    <TouchableOpacity
                        onPress={this.goHome}
                        style={{
                            backgroundColor: R.colors.blue,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            color: R.colors.white,
                            fontFamily: R.fonts.Heavy,
                            fontSize: 17
                        }}>Về trang chủ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TestResultScreen;


const styles = StyleSheet.create({
    txtAlert: {
        textAlign: 'center',
        fontFamily: R.fonts.Regular,
        paddingHorizontal: 40
    },
    containerAlert: {
        flex: 1
    },
    imageAlert: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        marginBottom: 20
    },
})