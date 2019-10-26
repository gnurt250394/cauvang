import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import HeaderDefault from 'components/HeaderDefault'
import Container from 'library/Container'
import InputAuthen from 'components/LoginComponent/InputAuthen'
import ButtonBase from 'components/ButtonBase'
import R from 'res/R'
import { requestRegister } from 'configs/apis/requestAuthen'
import { showMessage } from 'react-native-flash-message'
import utils from 'configs/utils'
import status from 'configs/constants'
import NavigationServices from 'routes/NavigationServices'
import screenName from 'configs/screenName'
import { showLoading, hideLoading } from 'library/Loading/LoadingComponent'
import apis from 'configs/apis'
import { login } from 'middlewares/actions/login/actionLogin'
import { connect } from 'react-redux';

class RegisterScreen extends Component {
    state = {
        isLoading: false,
        hospital: '',
        gender: '',
        phone: this.props.navigation.getParam('phone', '')
    }
    onRegister = async () => {
        let fullName = this.inputFullName.getValue()
        let { hospital, gender } = this.state
        let password = this.inputPassword.getValue()
        let password2 = this.inputPassword2.getValue()
        let phone = this.inputPhone.getValue()
        let hospitalId = hospital && hospital._id ? hospital._id : null
        if (password != password2) {
            utils.alertDanger('Mật khẩu cũ và mới không khớp')
            return
        }
        let params = {
            fullName, password, hospitalId, phone, gender
        }
        // NavigationServices.navigate(screenName.OtpScreen, {
        //     params
        // })   
        let res = await requestRegister(fullName, password, hospitalId, phone, gender)
        if (res && res.code == status.SUCCESS) {
            utils.alertSuccess('Đăng ký thành công')
            NavigationServices.navigate(screenName.TestScreen)
            this.props.dispatch(login(res.data))
            utils.setItem(utils.KEY.TOKEN, res.token)
        } else {
            utils.alertDanger(res.message)
        }

    }
    selectHospital = (hospital) => {
        this.setState({ hospital })
    }
    onSelectHospital = () => {
        NavigationServices.navigate(screenName.ListHospitalScreen, {
            onItemSelected: this.selectHospital
        })
    }
    render() {
        const { hospital, phone } = this.state
        return (
            <Container isLoading={this.state.isLoading}>
                <InputAuthen label="Họ và tên" reqiure={true} placeholder={"Họ và Tên*"} ref={ref => this.inputFullName = ref} />
                <View style={styles.containerPhoneGender}>
                    <InputAuthen containerStyle={{
                        width: '70%',
                    }} placeholder={"Số điện thoại*"} value={phone} ref={ref => this.inputPhone = ref} keyboardType="numeric" />
                    <TouchableOpacity style={styles.buttonGender}>
                        <Text>Giới tính</Text>
                        <Image source={R.images.icons.ic_up_down} style={styles.imgGender} />
                    </TouchableOpacity>
                </View>

                <InputAuthen label="Mật khẩu" reqiure={true} placeholder={"Mật khẩu*"} ref={ref => this.inputPassword = ref} secureTextEntry={true} />
                <InputAuthen label="Nhập lại mật khẩu" reqiure={true} placeholder={"Nhập lại mật khẩu*"} ref={ref => this.inputPassword2 = ref} secureTextEntry={true} />
                <TouchableOpacity
                    onPress={this.onSelectHospital}
                    style={[styles.buttonGender, styles.buttonOutpatient]}>
                    <Text>{hospital && hospital.name ? hospital.name : 'Chọn bệnh viện đang điều trị ngoại trú'}</Text>
                    <Image source={R.images.icons.ic_up_down} style={styles.imgGender} />
                </TouchableOpacity>
                <ButtonBase value="Đăng ký" onPress={this.onRegister} styleButton={styles.buttonRegister} />
            </Container>
        )
    }
}

export default connect()(RegisterScreen)


const styles = StyleSheet.create({
    buttonOutpatient: {
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    containerPhoneGender: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingTop: 5
    },
    imgGender: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    buttonGender: {
        borderColor: R.colors.defaultColor,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',

    },
    buttonRegister: {
        backgroundColor: R.colors.secondColor,
        marginTop: 20,
    },
})