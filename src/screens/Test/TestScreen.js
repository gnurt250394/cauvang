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
class TestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 0
                },
                {
                    id: 1,
                    name: 'hihi',
                    anwser: [
                        {
                            name: 'hahs',
                            id: 1
                        },
                        {
                            name: 'hahs',
                            id: 2
                        },
                        {
                            name: 'hahs',
                            id: 3
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'hihi',
                    anwser: [
                        {
                            name: 'hahs',
                            id: 1
                        },
                        {
                            name: 'hahs',
                            id: 2
                        },
                        {
                            name: 'hahs',
                            id: 3
                        },
                    ]
                },
                {
                    id: 3,
                    name: 'hihi',
                    anwser: [
                        {
                            name: 'hahs',
                            id: 1
                        },
                        {
                            name: 'hahs',
                            id: 2
                        },
                        {
                            name: 'hahs',
                            id: 3
                        },
                    ]
                },
                {
                    id: 4,
                    name: 'hihi',
                    anwser: [
                        {
                            name: 'hahs',
                            id: 1
                        },
                        {
                            name: 'hahs',
                            id: 2
                        },
                        {
                            name: 'hahs',
                            id: 3
                        },
                    ]
                },
                {
                    id: 5,
                    name: 'hihi',
                    anwser: [
                        {
                            name: 'hahs',
                            id: 1
                        },
                        {
                            name: 'hahs',
                            id: 2
                        },
                        {
                            name: 'hahs',
                            id: 3
                        },
                    ]
                },
            ],
            currentIndex: 0
        };
    }
    backQuestion = () => {
        const { data, currentIndex } = this.state
        console.log('currentIndex: ', currentIndex);
        console.log('data: ', data.length);
        if (data && currentIndex > 0 && currentIndex <= data.length - 1) {
            this.swiper && this.swiper.scrollTo(currentIndex - 1)
        }
    }
    _renderItem = ({ item, index }) => {
        const { currentIndex } = this.state
        switch (index) {
            case 0:
                return <FormQuestion1
                    onPress={this.nextQuestion}
                    onPressBack={this.backQuestion}
                    index={index}
                    length={this.state.data.length} />
            default:
                return <FormQuestion2
                    onPress={this.nextQuestion}
                    onPressBack={this.backQuestion}
                    index={index}
                    length={this.state.data.length}
                />
        }

    }
    _keyExtractor = (item, index) => `${item.id || index}`
    nextQuestion = () => {
        const { data, currentIndex } = this.state
        if (data && data.length - 1 > currentIndex) {
            this.swiper && this.swiper.scrollTo(this.state.currentIndex + 1)
        }
        console.log(this.swiper)
    }
    onIndexChanged = (currentIndex) => {
        this.setState({ currentIndex })
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
                    height:height/3-30
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
                        height={height/3}
                        ref={ref => this.swiper = ref}
                        style={styles.containerHeaderTitle} showsButtons={false}>
                        {data.map((item, index) => {
                            return this._renderItem({ item, index })
                        })}
                    </Swiper>
                    <TouchableOpacity style={styles.buttonWarning}>
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