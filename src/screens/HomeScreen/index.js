/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,

} from 'react-native';
import Container from 'library/Container';
import { getLogin } from 'configs/apis/requestAuthen';
import utils, { width, height } from 'configs/utils';
import HomeNotAuthScreen from './HomeNotAuthScreen';
import HomeLoginScreen from './HomeLoginScreen';
import R from 'res/R';
import ModalCustom from './ModalCustom';
import apis from 'configs/apis';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import jwtDecode from 'jwt-decode';
import RNCallKeep from 'react-native-callkeep'
import RNCallKit from 'react-native-callkit';
import RNCallKeepManager from 'components/RNCallKeepManager'
import { login } from 'middlewares/actions/login/actionLogin';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    id: 1,
                    name: 'Sự cố bình thường',
                    image: R.images.icons.ic_sos1,
                    level: 'NC1',

                },
                {
                    id: 2,
                    name: 'Sự cố nghiêm trọng',
                    image: R.images.icons.ic_sos2,
                    level: 'NC2',

                },
                {
                    id: 3,
                    name: 'Sự cố đặc biệt nghiêm trọng',
                    image: R.images.icons.ic_sos3,
                    level: 'NC3',

                },
            ],
            dataButton: [
                // {
                //     id: 1,
                //     name: 'Cấp cứu',
                // },
                // {
                //     id: 2,
                //     name: 'Phẫu thuật',
                // },
                // {
                //     id: 3,
                //     name: 'Tim mạch',
                // },
                // {
                //     id: 4,
                //     name: 'Chẩn đoán hình ảnh',
                // },
                // {
                //     id: 5,
                //     name: 'Sản',
                // },
                // {
                //     id: 6,
                //     name: 'Nhi',
                // },
            ],
            profile: {}
        }
    }

    componentDidMount = () => {

        this.getData()
        this.getListSpecials()
    };

    getData = async () => {
        let decoded = jwtDecode(utils.database.token)
        let res = await apis.fetch(apis.PATH.DETAIL_USER + '/' + decoded.sub)
        if (res && res.id) {
            this.setState({
                profile: res
            })
            this.props.dispatch(login(res))
        } else {
            utils.alertWarn('Phiên đăng nhập hết hạn')
            NavigationServices.navigate(screenName.AuthenStack)
        }
    }
    getListSpecials = async () => {
        let res = await apis.fetch(apis.PATH.GET_LIST_SPECIALS, { page: 0, size: 20 })
        if (Array.isArray(res) && res.length > 0) {
            let dataButton = [...res]
            dataButton[0].checked = true
            this.setState({
                dataButton: dataButton
            })
        }
    }
    showModal = (item) => () => {
        this.ModalCustom.showModal(item)
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={this.showModal(item)}
                disabled={item.checked ? true : false}
                style={styles.buttonSendSOS}>
                <Image style={styles.imageSendSOS} source={item.checked ? R.images.icons.ic_sos4 : item.image} />
                <Text style={styles.txtSendSOS}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    checkItem = (item) => () => {
        let data = [...this.state.dataButton]
        data.forEach(e => {
            if (e.id == item.id) {
                e.checked = true
            } else {
                e.checked = false
            }
        })
        this.setState({
            dataButton: data
        })
    }
    _renderButton = ({ item, index }) => {
        console.log('item: ', item);
        return (
            <TouchableOpacity
                onPress={this.checkItem(item)}
                style={[styles.buttonSpecial, { backgroundColor: item.checked ? '#E0230D' : '#FFF' }]}>
                <Text style={[styles.txtSpecialButton, { color: item.checked ? R.colors.white : R.colors.black }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    sendSOS = async (item) => {
        let decoded = jwtDecode(utils.database.token)
        let obj = this.state.dataButton.find(e => e.checked == true)
        let res = await apis.put(apis.PATH.REPORT + `?reporter=${decoded.sub}&departmentId=${obj.id}&level=${item.level}`)
        if (res && res.id) {
            let data = [...this.state.data]
            data.forEach(e => {
                if (e.id == item.id) {
                    e.checked = true
                }
            })
            this.setState({ data })
            utils.alertSuccess('Cảnh báo sự cố thành công')
            RNCallKeepManager.displayIncommingCall(0)
            // NavigationServices.navigate(screenName.CustomCallKeep)
        } else {
            utils.alertDanger('Cảnh báo sự cố thất bại')
        }
    }
    onRefress = () => {
        let data = [...this.state.data]
        data.forEach(e => {
            e.checked = false
        })
        this.setState({ data })
    }
    keyExtractor = (item, index) => `${item.id || index}`
    goHistory=()=>{
        NavigationServices.navigate(screenName.ListAlert)
    }
    render() {
        const { data, dataButton, profile } = this.state
        return (
            <Container
                iconRight={R.images.icons.ic_history}
                onPressRight={this.goHistory}
            >
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonSOS}>
                        <Image source={R.images.icons.profile.ic_info} style={styles.imageSOS} />
                        <View style={styles.containerProfile}>
                            <Text style={styles.txtname}>{profile.name}</Text>
                            <Text>{profile.telephone}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={data}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                        />
                    </View>
                    <View style={styles.containerSpeciallist}>

                        <Text style={styles.txtSpecialist}>Khoa</Text>
                        <FlatList
                            data={dataButton}
                            renderItem={this._renderButton}
                            numColumns={3}
                            columnWrapperStyle={styles.collumStyle}
                            keyExtractor={this.keyExtractor}
                        />
                    </View>
                    <View style={styles.containerRefress}>
                        <TouchableOpacity
                            onPress={this.onRefress}
                            style={styles.buttonRefress}>
                            <Image source={R.images.icons.ic_refress} style={styles.ImageRefress} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ModalCustom ref={ref => this.ModalCustom = ref} onPress={this.sendSOS} />
            </Container>
        )

    }
}

const styles = StyleSheet.create({
    ImageRefress: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    buttonRefress: {
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    containerRefress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSendSOS: {
        textAlign: 'center',
        width: '70%'
    },
    imageSendSOS: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    buttonSendSOS: {
        width: width / 3,
        alignItems: 'center',
        paddingTop: 10,
    },
    txtSpecialButton: {
        textAlign: 'center',
        fontFamily: R.fonts.Bold,

    },
    buttonSpecial: {
        width: width / 3 - 20,
        alignItems: 'center',
        borderColor: R.colors.orange,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        height: 80
    },
    collumStyle: { justifyContent: 'space-between', padding: 10, },
    txtSpecialist: {
        paddingLeft: 15,
        color: R.colors.black,
        fontFamily: R.fonts.Bold
    },
    containerSpeciallist: {
        flex: 1,
        borderTopColor: R.colors.gray,
        borderTopWidth: 1,
        marginTop: 20,
        paddingTop: 10,
    },
    txtname: {
        fontFamily: R.fonts.Heavy
    },
    containerProfile: {
        flex: 1,
        paddingLeft: 10
    },
    imageSOS: {
        height: 40,
        width: 40,
        resizeMode: 'contain'

    },
    buttonSOS: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: R.colors.white,
        borderBottomColor: R.colors.gray,
        borderBottomWidth: 0.5,
        paddingLeft: 20,
    },
    container: {
        backgroundColor: R.colors.white1,
        flex: 1
    },
    example: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20
    },

});

export default connect()(HomeScreen)