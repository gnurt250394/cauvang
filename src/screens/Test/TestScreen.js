import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';
import ScaleText from 'components/TextScale';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import utils, { height } from 'configs/utils';
import ActionSheet from 'react-native-actionsheet'
import PushNotification from 'components/PushNotification';
import { connect } from 'react-redux';
import FormQuestion1 from './FormQuestion1';
import FormQuestion2 from './FormQuestion2';
import Swiper from 'react-native-swiper'
import apis from 'configs/apis';
class TestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    _id: 0
                },
                {
                    _id: 1,
                },
                {
                    _id: 2,
                },
                {
                    _id: 4,
                },
                {
                    _id: 3,

                },
                {
                    _id: 5,

                },

            ],
            listChecked: [],
            currentIndex: 0
        };
        this.list = []
    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        try {
            let res = await apis.fetch(apis.PATH.QUESTION)
            if (res && res.code == 200) {
                res.data.unshift({ _id: 0 })
                this.setState({ data: res.data })
            }
        } catch (error) {

        }

    }
    backQuestion = () => {
        const { data, currentIndex } = this.state
        if (data && currentIndex > 0 && currentIndex <= data.length - 1) {
            this.swiper && this.swiper.scrollTo(currentIndex - 1)
        }
    }

    onPressCkeck = (item) => (data, e) => {
        let list = [...this.state.listChecked]
        let listFinal = []
        let obj = {}
        obj = { ...e }
        var id = e._id
        var index = list.findIndex(elm => elm._id === id)
        console.log('index: ', index);
        console.log(list)
        if (index == -1) {
            this.list.push(obj)
            listFinal = this.list
        } else {
            list.splice(index, 1, e)
            listFinal = list

        }
        this.setState({ listChecked: listFinal }, () => {
            console.log(this.state.listChecked, 'llll')

        })

        // this.setState({
        //     data: list
        // })
    }
    onSend = async () => {
        try {
            let data = [...this.state.listChecked]
            console.log('data: ', data);
            let type = '2'
            NavigationServices.navigate(screenName.TestResultScreen, {
                type: type
            })
            // let res = await apis.post(apis.PATH.ADD_FOLLOW, { type })
            // if (res && res.code == 200) {
            //     utils.alertSuccess('Gửi câu hỏi thành công')
            //     NavigationServices.navigate(screenName.TestResultScreen, {
            //         type: res.data.type
            //     })
            // } else {
            //     utils.alertDanger(res.message)
            // }
        } catch (error) {

        }

    }
    _renderItem = ({ item, index }) => {
        const { currentIndex } = this.state
        switch (index) {
            case 0:
                return <FormQuestion1
                    key={`${item._id}`}
                    onPress={this.nextQuestion}
                    onPressBack={this.backQuestion}
                    index={index}
                    length={this.state.data.length} />
            default:
                return <FormQuestion2
                    key={`${item._id}`}
                    onPress={this.nextQuestion}
                    onPressBack={this.backQuestion}
                    index={index}
                    item={item}
                    onSend={this.onSend}
                    onPressCheck={this.onPressCkeck(item)}
                    length={this.state.data.length}
                />
        }

    }
    _keyExtractor = (item, index) => `${item._id || index}`
    nextQuestion = () => {
        const { data, currentIndex } = this.state
        if (data && data.length - 1 > currentIndex) {
            this.swiper && this.swiper.scrollTo(this.state.currentIndex + 1)
        }

    }
    onIndexChanged = (currentIndex) => {

        this.setState({ currentIndex })
    }
    onReport = () => {
        NavigationServices.navigate(screenName.ReportScreen)
    }
    render() {
        const { listButton, data } = this.state
        const { userApp } = this.props
        return (
            <ScrollView >
                {/**view 1 */}
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height / 3 - 30
                }}>
                    <ScaleText size={20} style={styles.txtHello}>Xin chào, <ScaleText size={20} style={{
                        color: R.colors.defaultColor
                    }}>{userApp.fullName}</ScaleText></ScaleText>
                    <ScaleText size={16} style={styles.TxtQuestion} >Trả lời ngay các câu hỏi sau đây để đánh giá tình trạng sức khỏe của bạn</ScaleText>

                </View>

                {/** form question */}
                <View style={{
                    alignItems: 'center'
                }}>
                    <Swiper
                        loop={false}
                        onIndexChanged={this.onIndexChanged}
                        scrollEnabled={false}
                        showsPagination={false}
                        height={height / 3}
                        ref={ref => this.swiper = ref}
                        style={styles.containerHeaderTitle}
                        showsButtons={false}>
                        {

                            data && data.length > 0 ? data.map((item, index) => {
                                return this._renderItem({ item, index })
                            }) : <View />}
                    </Swiper>
                    <TouchableOpacity
                        onPress={this.onReport}
                        style={styles.buttonWarning}>
                        <Image source={R.images.icons.home.ic_warning} style={styles.imageWarning} />
                        <ScaleText>Báo cáo dấu hiệu bất thường</ScaleText>
                    </TouchableOpacity>
                </View>





            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(TestScreen);


const styles = StyleSheet.create({
    imageWarning: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginRight: 10
    },
    buttonWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 13
    },
    TxtQuestion: {
        color: R.colors.black3,
        fontFamily: R.fonts.Regular,
        textAlign: 'center',
        paddingBottom: 20,
        paddingHorizontal: 10
    },

    txtHello: {
        fontFamily: R.fonts.Black,
        paddingBottom: 5
    },
    containerHeaderTitle: {
        backgroundColor: R.colors.defaultColor,
        // height: height / 2,

    },
    flex: {
        flex: 1
    },
    button: {
        paddingHorizontal: 10
    },
    txtBetween: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: R.colors.white
    },
    imageBack: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    containerPage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 20,
    },
})