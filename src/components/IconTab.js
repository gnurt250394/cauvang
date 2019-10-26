import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import R from 'res/R';

class IconTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { tintColor, count } = this.props
        return (
            <View>
                <Image source={R.images.icons.home.ic_noti} style={[styles.imageTab, { tintColor }]} />
                <View style={styles.containerIcon}>
                    <Text style={styles.txtCOunt}>{count > 99 ? '99' : count}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    txtCOunt: {
        color: R.colors.white,
        fontFamily: R.fonts.Bold,
        fontSize: 12
    },
    containerIcon: {
        position: 'absolute',
        top: -13,
        right: -12,
        backgroundColor: R.colors.blue,
        borderRadius: 25 / 2,
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTab: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
});
const mapStateToProps = (state) => ({
    count: state.loginReducer.count
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps)(IconTab);
