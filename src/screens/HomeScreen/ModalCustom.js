import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import R from 'res/R';
import { width, height } from 'configs/utils';

class ModalCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            item: {}
        };
    }
    showModal = (item) => {
        console.log('item: ', item);
        this.setState({ visible: true, item })
    }
    hideModal = () => {
        this.setState({ visible: false })
    }
    sendSOS = () => {
        this.hideModal()
        this.props.onPress && this.props.onPress(this.state.item)
    }

    render() {
        const { visible } = this.state
        return (
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                animated={true}
                onRequestClose={() => { this.hideModal() }}
            >
                <View style={styles.containerModal}>
                    <View style={styles.containerView}>
                        <Image source={R.images.icons.ic_sos3} style={styles.imageLogo} />
                        <Text style={styles.txt}>Xác nhận gửi cảnh báo khẩn cấp</Text>
                        <TouchableOpacity
                            onPress={this.sendSOS}
                            style={styles.buttonSend}>
                            <Text style={{
                                color: R.colors.white,
                                fontFamily: R.fonts.Bold
                            }}>Gửi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.hideModal}
                            style={styles.buttonClose}>
                            <Image source={R.images.icons.ic_close} style={styles.icClose} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalCustom;


const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: R.colors.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    containerView: {
        backgroundColor: R.colors.white,
        width: width - 50,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageLogo: {
        height: 35,
        width: 35,
        resizeMode: 'center',
        alignSelf: 'center',
    },
    txt: {
        textAlign: 'center',
        fontFamily: R.fonts.Semibold,
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonSend: {
        backgroundColor: R.colors.red,
        width: '20%',
        height: 42,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    icClose: {
        height: 25,
        width: 20,
        resizeMode: 'contain'
    },
    buttonClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
})