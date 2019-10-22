import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import R from 'res/R';
import Container from 'library/Container';
import ScaleText from 'components/TextScale';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import utils, { height } from 'configs/utils';
import ActionSheet from 'react-native-actionsheet'
class HomeLoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listButton: [
                {
                    id: 1,
                    onPress: () => {
                        NavigationServices.navigate(screenName.FollowHealthScreen)
                    },
                    image: R.images.icons.home.ic_ehealth,
                    name: 'Theo dõi sức khỏe'
                },
                {
                    id: 2,
                    onPress: () => {
                        NavigationServices.navigate(screenName.ScheduleScreen)
                    },
                    image: R.images.icons.home.ic_calendar,
                    name: 'Lịch khám'
                },
                {
                    id: 3,
                    onPress: () => {
                        utils.alertInfo('Chức năng đang phát triển')

                    },
                    image: R.images.icons.home.ic_drug,
                    name: 'Đơn thuốc của bạn'

                },
                {
                    id: 4,
                    onPress: () => {
                        utils.alertInfo('Chức năng đang phát triển')
                    },
                    image: R.images.icons.home.ic_doctor,
                    name: 'Tư vấn trực tuyến'

                },

            ],

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

    render() {
        const { listButton } = this.state
        return (
            <Container style={styles.flex}
                scrollView={true}
            >
                {/**view 1 */}
                <View style={styles.containerView1}>
                    <ScaleText size={20} style={styles.txtHello}>Xin chào, <ScaleText size={20} style={{
                        color: R.colors.defaultColor
                    }}>{'User'}</ScaleText></ScaleText>
                    <View style={styles.containerHeaderTitle}>
                        <ScaleText size={16} style={styles.TxtQuestion} >Hôm nay chỉ số đường huyết của bạn là bao nhiêu?</ScaleText>
                        <View style={styles.containerInput}>
                            <TextInput
                                placeholder="Nhập câu trả lời"
                                style={styles.input} />
                            <TouchableOpacity style={styles.buttonSend}>
                                <ScaleText style={styles.txtSend}>Gửi</ScaleText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonWarning}>
                        <Image source={R.images.icons.home.ic_warning} style={styles.imageWarning} />
                        <ScaleText>Báo cáo dấu hiệu bất thường</ScaleText>
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
                {/* <ActionSheet
                    ref={o => this.actionSheetChooseType = o}
                    options={actions}
                    cancelButtonIndex={actions.length - 1}
                    destructiveButtonIndex={actions.length - 1}
                    onPress={(index) => {
                        if (index <= this.state.medicalTestResult.length - 1) {
                            this.setState({ currentGroup: this.state.medicalTestResult[index] });
                        }
                    }}
                /> */}
            </Container>
        );
    }
}

export default HomeLoginScreen;


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
    txtSend: {
        color: R.colors.white
    },
    buttonSend: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    input: {
        backgroundColor: R.colors.white,
        height: 40,
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
        paddingBottom: 30
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50%',
        paddingVertical: 20
    },
    containerHeaderTitle: {
        backgroundColor: R.colors.defaultColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    containerView3: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerView1: {
        height: height / 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    flex: {
        flex: 1
    },
})