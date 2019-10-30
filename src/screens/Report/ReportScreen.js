import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';
import ScaleText from 'components/TextScale';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import utils, { height, width } from 'configs/utils';
import ActionSheet from 'react-native-actionsheet'
import PushNotification from 'components/PushNotification';
import { connect } from 'react-redux';
import apis from 'configs/apis';

class ReportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            doctor_id: '',
            data: [],
            keyword: ''

        };
    }
    componentDidMount = () => {
        this.getData()
    };

    getData = async (keyword) => {
        let params = {}
        if (keyword) params.keyword = keyword
        let res = await apis.fetch(apis.PATH.LIST_DOCTOR, params)
        if (res && res.code == 200) {
            this.setState({ data: res.data })
        }
    }
    onChecked = (item) => () => {
        let data = [...this.state.data]
        this.setState({ doctor_id: item._id })
        data.forEach(e => {
            if (e._id == item._id) {
                e.checked = !e.checked
            } else {
                e.checked = false
            }
        })
        this.setState({ data })
    }
    _renderItem = ({ item, index }) => {
        const image = item.image ? { uri: item.image } : R.images.icons.ic_doctor
        return (
            <TouchableOpacity
                onPress={this.onChecked(item)}
                style={styles.containerText}>
                <View style={styles.containerName}>
                    <Image source={image} style={styles.imageButton} />
                    <ScaleText fontFamily="bold" style={styles.txtNameButton}>{item.fullName}</ScaleText>
                </View>
                <View style={styles.containerChecked}>
                    {
                        item.checked ? <Image source={R.images.icons.ic_checked} style={styles.imgChecked} /> : null
                    }
                </View>
            </TouchableOpacity>
        )

    }
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
    _onChangeText = (value) => {
        this.setState({ keyword: value })
    }
    onSubmit = () => {
        this.getData(this.state.keyword)

    }
    render() {
        const { data } = this.state
        const { userApp } = this.props
        return (
            <Container
                scrollView={true}
            >
                {/**view 1 */}
                <View style={styles.containerView1}>
                    <ScaleText size={20} style={styles.txtHello}>Xin chào, <ScaleText size={20} style={{
                        color: R.colors.defaultColor
                    }}>{userApp.name}</ScaleText></ScaleText>
                    <View style={styles.containerHeaderTitle}>
                        <View style={styles.containerTitleHeader}>
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
                    <View style={styles.containerList}>
                        <TextInput
                            placeholder="Tìm kiếm BS"
                            style={styles.textInput}
                            onChangeText={this._onChangeText}
                            onSubmitEditing={this.onSubmit}
                        />
                        <FlatList
                            data={data}
                            nestedScrollEnabled={true}
                            renderItem={this._renderItem}
                            ListEmptyComponent={() => <Text style={{paddingVertical:15}}>Không có bác sĩ nào</Text>}
                            keyExtractor={this._keyExtractor}
                        />

                    </View>

                    <TouchableOpacity
                        onPress={this.onSend}
                        style={styles.buttonSend}>
                        <ScaleText style={styles.txtSend}>Gửi báo cáo</ScaleText>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(ReportScreen);


const styles = StyleSheet.create({
    textInput: {
        borderRadius: 5,
        borderColor: R.colors.gray,
        borderWidth: 1,
        height: 38,
        width: '80%',
        backgroundColor: R.colors.white,
        marginTop: 5,
        paddingLeft: 10,
        marginBottom: 5
    },
    containerTitleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 25,
    },
    containerList: {
        backgroundColor: R.colors.secondColor,
        maxHeight: height / 3,
        width: width - 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 5
    },
    containerName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgChecked: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    containerChecked: {
        borderColor: R.colors.defaultColor,
        borderWidth: 1,
        borderRadius: 11,
        height: 22,
        width: 22,
    },
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
        paddingLeft: 10,
    },
    imageButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },


    txtHello: {
        fontFamily: R.fonts.Bold,
        fontSize: 20,
        paddingBottom: 30,
        paddingTop: 50,
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
        width: width - 100,
        paddingRight: 10
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