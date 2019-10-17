import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import LoadingManager from '../Loading/LoadingManager'
import * as Progress from 'react-native-progress';
import R from 'res/R';
import { width } from 'configs/utils';

export function showLoading(progress) {
    LoadingManager.getDefault().showLoading(progress)
}
class LoadingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            visible: false
        };
    }
    showLoading = (progress) => {
        if (progress >= 1) {
            this.setState({ visible: false, progress: 0 })
            return
        }
        this.setState({ progress, visible: true })


    }

    hideLoading = () => {
        this.setState({ visible: false })
    }
    render() {
        return (
            <Modal
                visible={this.state.visible}
                transparent={true}
                animationType="fade"
                onRequestClose={this.hideLoading}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: R.colors.transparent,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Progress.Circle thickness={5}
                        showsText={true}
                        strokeCap={"square"}
                        formatText={(progress) => {
                            return <Text style={styles.txtPercent}>{progress.toFixed(2) * 100}%</Text>
                        }}
                        color={R.colors.defaultColor}
                        progress={this.state.progress} size={150} />
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
})