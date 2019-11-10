import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Container from 'library/Container';
import { connect } from 'react-redux';
import { width, height } from 'configs/utils';
import R from 'res/R';
import { WebView } from 'react-native-webview';
import { showLoading, hideLoading } from 'library/Loading/LoadingComponent';
class DetailAlertScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    DetailMap = () => {

    }
    render() {
        const profile = this.props.userApp
        return (
            <Container>
                <ScrollView
                >
                    <View style={{
                        flex: 1
                    }}>
                        <View style={styles.buttonSOS}>
                            <Image source={R.images.icons.profile.ic_info} style={styles.imageSOS} />
                            <View style={styles.containerProfile}>
                                <Text style={styles.txtname}>{profile.name}</Text>
                                <Text>{profile.telephone}</Text>
                            </View>
                        </View>
                        <Image source={R.images.icons.ic_callSOS} style={styles.iconCall} />
                        <TouchableOpacity
                            style={styles.buttonMap}
                            onPress={this.DetailMap}
                        >

                            <Image source={R.images.icons.ic_map} style={styles.icMap} />
                        </TouchableOpacity>
                        {/* <WebView
                            source={{ uri: 'https://inmapz.com/maps/benh-vien-e-hospital-3077822157?utm_venue=false' }}
                            style={{ marginTop: 20, height: 400 }}
                            onLoadStart={() => { showLoading() }}
                            scrollEnabled={false}
                            onLoadEnd={() => { hideLoading() }}
                        /> */}
                        <Text>- Nơi cảnh báo: Tòa nhà H</Text>
                        <Text>- Mức độ sự cố: Nghiêm trọng</Text>
                        <Text>- Người cảnh báo: BBBB</Text>
                        <Text>- Số người đã tiếp nhận cảnh báo: 2</Text>
                        <Text> + BS. Nguyễn văn A</Text>
                        <Text> + BS> abc</Text>
                        <TouchableOpacity style={styles.buttonCall}>
                            <Image source={R.images.icons.ic_phone} style={styles.icCall} />
                            <Text style={styles.txtCall}>Gọi cho người cảnh báo</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    icMap: {
        height: height / 3,
        width: width
    },
    buttonMap: {
        paddingVertical: 20
    },
    txtCall: {
        color: '#000',
        fontFamily: R.fonts.Bold,
        paddingLeft: 10
    },
    icCall: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    buttonCall: {
        backgroundColor: R.colors.secondColor,
        width: '70%',
        flexDirection: 'row',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20
    },
    iconCall: {
        height: width / 2,
        width: width / 2,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
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
});
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});

export default connect(mapStateToProps)(DetailAlertScreen);
