import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';
import ScaleText from 'components/TextScale';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import utils, { height } from 'configs/utils';
import ActionSheet from 'react-native-actionsheet'
import PushNotification from 'components/PushNotification';
import { connect } from 'react-redux';
import apis from 'configs/apis';

class ReportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            doctor_id: ''

        };
    }
    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={item.onPress}
            style={styles.containerText}>
            <Image source={item.image} style={styles.imageButton} />
            <ScaleText fontFamily="bold" style={styles.txtNameButton}>{item.name}</ScaleText>
        </TouchableOpacity>
    )
    _keyExtractor = (item, index) => `${item.id || index}`

    onSend = async () => {
        const { value, doctor_id } = this.state
        if (!value) {
            utils.alertDanger('Bạn chưa nhập nội dung cần báo cáo')
            return
        }
        let params = {
            content: value,
            doctor_id
        }
        let res = await apis.post(apis.PATH.REPORT, params)
        if (res && res.code == 200) {
            NavigationServices.pop()
            utils.alertSuccess(res.message)
        } else {
            utils.alertDanger(res.message)
        }
     
    }
    onChangeText = (value) => {
        this.setState({ value })
    }
    render() {
        const { listButton } = this.state
        const { userApp } = this.props
        return (
            <Container
                scrollView={true}
            >
                {/**view 1 */}
                <View style={styles.containerView1}>
                    <ScaleText size={20} style={styles.txtHello}>Xin chào, <ScaleText size={20} style={{
                        color: R.colors.defaultColor
                    }}>{userApp.fullName}</ScaleText></ScaleText>
                    <View style={styles.containerHeaderTitle}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: 25,
                        }}>
                            <Image source={R.images.icons.home.ic_warning} style={styles.imageWarning} />
                            <ScaleText style={{
                                color: R.colors.white
                            }}>Báo cáo dấu hiệu bất thường</ScaleText>
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput
                                placeholder="Nhập dấu hiệu cần báo cáo"
                                onChangeText={this.onChangeText}
                                multiline={true}
                                maxLength={2000}
                                style={styles.input} />

                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={this.onSend}
                        style={styles.buttonSend}>
                        <ScaleText style={styles.txtSend}>Gửi báo cáo</ScaleText>
                    </TouchableOpacity>
                </View>




                {/**view 3 */}
                <View style={styles.containerView3}>

                    <FlatList
                        data={listButton}
                        numColumns={2}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />



                </View>

                <PushNotification />
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(ReportScreen);


const styles = StyleSheet.create({
    imageWarning: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginRight: 10,
        tintColor: R.colors.white
    },
    buttonWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 13
    },
    txtSend: {
        color: R.colors.white
    },
    buttonSend: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: R.colors.textColor,
        marginTop: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    input: {
        backgroundColor: R.colors.white,
        fontFamily: R.fonts.Light,
        paddingHorizontal: 10,
        width: '70%',
        borderRadius: 5
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TxtQuestion: {
        color: R.colors.white,
        textAlign: 'center',
        paddingBottom: 5
    },
    txtNameButton: {
        paddingTop: 10,
    },
    imageButton: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },


    txtHello: {
        fontFamily: R.fonts.Bold,
        fontSize: 20,
        paddingBottom: 30,
        paddingTop: 50,
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50%',
        paddingVertical: 20
    },
    containerHeaderTitle: {
        backgroundColor: R.colors.black5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    containerView3: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerView1: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    flex: {
        flex: 1
    },
})