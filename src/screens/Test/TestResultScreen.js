import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';

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
    render() {
        return (
            <Container >
                <View style={styles.containerAlert}>
                    <Image source={this.renderImage()} style={styles.imageAlert} />
                    <Text style={styles.txtAlert}>{this.renderType()} </Text>
                    {
                        this.state.type == '2' ?
                            <TouchableOpacity>
                                <Text style={{
                                    fontFamily: R.fonts.Black,

                                }}>Lời dặn của bác sĩ</Text>
                            </TouchableOpacity>
                            : null

                    }

                </View>
            </Container>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    imageAlert: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        marginBottom: 20
    },
})