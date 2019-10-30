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
import Swiper from 'react-native-swiper'
import apis from 'configs/apis';
import FormQuestion1 from 'screens/Test/FormQuestion1';
import FormQuestion2 from 'screens/Test/FormQuestion2';
class TestTodayScreen extends Component {
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
    backQuestion = async () => {
        const { data, currentIndex, listChecked } = this.state
        if (data && currentIndex > 0 && currentIndex <= data.length - 1) {
            this.swiper && this.swiper.scrollTo(currentIndex - 1)
        }
        if (typeof listChecked == 'object' && listChecked.name) {
            let res = await apis.put(apis.PATH.CHECK_QUESTION, { data: listChecked }, true)
            if (res && res.code == 200) {
                this.setState({ listChecked: {} })
            }
        } else if (Array.isArray(listChecked) && listChecked.length > 0) {
            let obj = {}
            let point = listChecked.reduce((total, current) => {
                return total.point + current.point
            }, 0)
            obj.point = point
            obj.name = listChecked[0].name
            obj.anwser_id = listChecked[0].question_id
            let res = await apis.put(apis.PATH.CHECK_QUESTION, { data: obj }, true)
            if (res && res.code == 200) {
                this.setState({ listChecked: {} })
            }
        }
    }

    onPressCkeck = (item) => (e) => {
        let listChecked;
        let data = [...this.state.data]
        data.forEach(elm => {
            if (elm._id == item._id) {
                if (item.type == 3) {
                    listChecked = elm.anwser.filter(element => element.checked == true)
                } else {
                    let obj = e
                    obj.anwser_id = e._id
                    listChecked = obj
                }

            }
        })
        this.setState({ listChecked: listChecked }, () => {

        })

        // this.setState({
        //     data: list
        // })
    }
    onSend = async () => {
        try {
            // let data = [...this.state.listChecked]
            // let type = '2'
            // NavigationServices.navigate(screenName.TestResultScreen, {
            //     type: type
            // })
            let res = await apis.post(apis.PATH.CONFIRM_ANWSER)
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
        let data = [...this.state.data]
        let list = {}
        data.forEach(e => {
            if (e._id == item._id) {
                let obj = {
                    anwser_id: e.anwser && e.anwser.length > 0 ? e.anwser[0]._id : '',
                    name: value
                }
                list = obj


            }
        })

        console.log('list: ', list);
        this.setState({ listChecked: list })
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
                    onChangeText1={this.onChangeText(item)}
                    index={index}
                    item={item}
                    onSend={this.onSend}
                    onPressCheck={this.onPressCkeck(item)}
                    length={this.state.data.length}
                />
        }

    }
    _keyExtractor = (item, index) => `${item._id || index}`
    nextQuestion = async () => {

        const { data, currentIndex, listChecked } = this.state
        console.log('listChecked: ', listChecked);
        if (data && data.length - 1 > currentIndex) {
            this.swiper && this.swiper.scrollTo(this.state.currentIndex + 1)
        }

        if (typeof listChecked == 'object' && listChecked.name) {
            let res = await apis.put(apis.PATH.CHECK_QUESTION, { data: listChecked }, true)
            if (res && res.code == 200) {
                this.setState({ listChecked: {} })
            }
        } else if (Array.isArray(listChecked) && listChecked.length > 0) {
            let obj = {}
            let point = listChecked.reduce((total, current) => {
                return total.point + current.point
            }, 0)
            obj.point = point
            obj.name = listChecked[0].name
            obj.anwser_id = listChecked[0].question_id
            let res = await apis.put(apis.PATH.CHECK_QUESTION, { data: obj }, true)
            if (res && res.code == 200) {
                this.setState({ listChecked: {} })
            }
        }

    }
    onIndexChanged = (currentIndex) => {

        this.setState({ currentIndex })
    }
    onReport = () => {
        NavigationServices.navigate(screenName.ReportScreen)
    }
    render() {
        const { userApp } = this.props
        const { listButton, data } = this.state
        return (
            <Container
                scrollView={true}
            >
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


            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps)(TestTodayScreen);

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