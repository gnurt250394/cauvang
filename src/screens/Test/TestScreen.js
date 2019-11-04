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
            listInput: [],
            currentIndex: 0,
            listFinal: [],
            selected: false
        };
        this.list = []
        this.data = []
    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        try {
            let res = await apis.fetch(apis.PATH.QUESTION, { type: 2 })
            if (res && res.code == 200) {
                let data = [...res.data]
                
                let list = []
                data.forEach((e,i)=>{
                    if (i % 5 == 0) {
                        let obj = {
                            itemsQuestion: data.splice(0, 5),
                            _id: e._id,
                            position: e.position
                        }
                        list.push(obj)
                    } else {
                        let obj = {
                            itemsQuestion: data.splice(0, 5),
                            _id: e._id,
                            position: e.position

                        }
                        list.push(obj)
                    }
                })
                this.setState({ data: res.data })
            }
        } catch (error) {

        }

    }
    backQuestion = (item) => async () => {
        const { data, currentIndex, listChecked, selected } = this.state
        if (data && currentIndex > 0 && currentIndex <= data.length - 1) {
            this.swiper && this.swiper.scrollTo(currentIndex - 1)
        }

        this.checkList(item)
    }

    onPressCkeck = (item) => (e) => {
        let listChecked = [];
        let data = [...this.state.data]
        data.forEach(elm => {
            if (elm._id == item._id) {
                if (item.type == 3) {
                    listChecked = elm.anwser.filter(element => element.checked == true)

                } else {
                    let index = this.list.findIndex(element => e._id == element._id)
                    if (index == -1) {
                        this.list.push(e)
                        listChecked = this.list
                    } else {
                        this.list.splice(index, 1, e)
                        listChecked = this.list
                    }

                }

            }
        })
        this.setState({ listChecked: listChecked, selected: true }, () => {

        })

        // this.setState({
        //     data: list
        // })
    }
    checkList = (item) => {
        const { listChecked, selected } = this.state
        this.list = []

        if (Array.isArray(listChecked) && listChecked.length > 0 && selected) {
            let data = listChecked.filter(e => e.checked == true)
            let total = data.reduce((total, current) => {

                return total + Number(current.total)
            }, 0)
            console.log('total: ', total);
            let obj = {}
            obj.point = total
            obj._id = item._id
            let index = this.data.findIndex(e => e._id == item._id)
            if (index == -1) {
                this.data.push(obj)
            } else {
                this.data.splice(index, 1, obj)

            }
            console.log('this.data: ', this.data);
            this.setState({ selected: false })
        }
    }
    onSend = (item) => async () => {

        try {
            this.checkList(item)
            let point = this.data.reduce((total, current) => {
                return total + parseInt(current.point)
            }, 0)

            let res = await apis.post(apis.PATH.CONFIRM_ANWSER, { point })
            if (res && res.code == 200) {
                utils.alertSuccess('Gửi câu hỏi thành công')
                NavigationServices.navigate(screenName.TestResultScreen, {
                    type: res.data.type
                })
            } else {
                utils.alertDanger(res.message)
            }
        } catch (error) {


        }

    }
    onChangeText = (item) => (value) => {
        let point = Number(value)
        item.anwser.sort((a, b) => b.from_point - a.from_point || b.to_point - a.total_point)
        let objPoint = item.anwser.find(e => point >= e.from_point && point <= e.to_point || point < item.anwser[0].from_point || point > item.anwser[item.anwser.length - 1].to_point)
        let data = [...this.state.data]
        let list = []
        data.forEach(e => {
            if (e._id == item._id) {
                if (objPoint && objPoint._id) {
                    let obj = {
                        anwser_id: item._id,
                        name: value,
                        point: objPoint.total_point,
                        glycemic: point,
                        _id: item._id,
                        checked: true
                    }
                    list.push(obj)
                }
            }
        })

        this.setState({ listChecked: list, selected: true }, () => {
            console.log('selected: ', this.state.selected);
            console.log('listChecked: ', this.state.listChecked);

        })
    }
    _renderItem = ({ item, index }) => {
        switch (index) {
            case 0:
                return <FormQuestion1
                    key={`${item._id}`}
                    onPress={this.nextQuestion(item)}
                    onPressBack={this.backQuestion(item)}
                    index={index}
                    length={this.state.data.length} />
            default:
                return <FormQuestion2
                    key={`${item._id}`}
                    onPress={this.nextQuestion(item)}
                    onPressBack={this.backQuestion(item)}
                    onChangeText={this.onChangeText(item)}
                    index={index}
                    item={item}
                    onSend={this.onSend(item)}
                    onPressCheck={this.onPressCkeck(item)}
                    length={this.state.data.length}
                />
        }

    }
    _keyExtractor = (item, index) => `${item._id || index}`
    nextQuestion = (item) => async () => {

        const { data, currentIndex, listChecked, selected } = this.state

        if (data && data.length - 1 > currentIndex) {
            this.swiper && this.swiper.scrollTo(this.state.currentIndex + 1)
        }

        this.checkList(item)
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
                    }}>{userApp.name}</ScaleText></ScaleText>
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
        fontFamily: R.fonts.Bold,
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