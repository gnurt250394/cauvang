import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import LoadingManager from '../Loading/LoadingManager'
import * as Progress from 'react-native-progress';
import R from 'res/R';
import { width } from 'configs/utils';
import AnimatedLoader from "react-native-animated-loader";

const TIME_OUT = 10 * 1000;

export function showLoading() {
    const ref = LoadingManager.getDefault();

    if (!!ref) {
        ref.showLoading();
    }
}

export function hideLoading() {
    const ref = LoadingManager.getDefault();

    if (!!ref) {
        ref.hideLoading();
    }
}
class LoadingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isLoading: false
        };
    }
    componentWillUnmount() {
        if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
    }

    hideLoading = () => {
        if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
        this.setState({ isLoading: false });
    };

    showLoading = () => {
        this.loadingTimeout = setTimeout(() => {
            this.setState({ isLoading: false });
        }, TIME_OUT);
        this.setState({ isLoading: true });
    };

    render() {
        return (
            <Modal
                visible={this.state.isLoading}
                transparent={true}
                animationType="fade"
                onRequestClose={this.hideLoading}
            >
            <View style={{
                flex: 1,
                backgroundColor: R.colors.transparent,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 1000,
            }}>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.4)"
                    source={R.animations.loading}
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </View>
             </Modal>
        );
    }
}

export default LoadingComponent;


const styles = StyleSheet.create({
    txtPercent: {
        color: R.colors.defaultColor,
        fontWeight: 'bold'
    },
    lottie: {
        width: 100,
        height: 100
    }
})