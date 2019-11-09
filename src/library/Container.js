import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, StatusBar } from 'react-native';
import HeaderDefault from 'components/HeaderDefault';
import PropTypes from 'prop-types';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,

} from "rn-placeholder";
import LinearGradient from 'react-native-linear-gradient';
import R from 'res/R';
const prototype = {
    onPressLeft: PropTypes.func,
    iconLeft: PropTypes.number,
    valueLeft: PropTypes.string,
    onPressRight: PropTypes.func,
    valueRight: PropTypes.string,
    iconRight: PropTypes.number,
    scrollView: PropTypes.bool,
    isLoading: PropTypes.bool,
    title: PropTypes.string
}
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: true,
        };
    }

    render() {
        const { onPressLeft, onPressRight, valueRight, iconRight, valueLeft, iconLeft, scrollView, isLoading, title } = this.props
        const ContainerComponent = scrollView ? ScrollView : View
        return (
            <View style={styles.container}>
                <HeaderDefault
                    onPressLeft={onPressLeft}
                    onPressRight={onPressRight}
                    valueRight={valueRight}
                    iconRight={iconRight}
                    valueLeft={valueLeft}
                    iconLeft={iconLeft}
                    title={title}
                />
                <StatusBar animated={true} backgroundColor={R.colors.defaultColor} barStyle="light-content" />

                    {this.props.children}
            </View>
        );
    }
}
Container.prototype.props = prototype
export default Container;


const styles = StyleSheet.create({
    containerComponent: {
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    lottie: {
        width: 100,
        height: 100
    }
})