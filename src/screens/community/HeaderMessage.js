import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ButtonBase from 'components/ButtonBase'
import NavigationServices from 'routes/NavigationServices'
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation'
import R from 'res/R';
import ScaleText from 'components/TextScale';

const prototype = {
    onPressLeft: PropTypes.func,
    iconLeft: PropTypes.number,
    valueLeft: PropTypes.string,
    onPressRight: PropTypes.func,
    valueRight: PropTypes.string,
    iconRight: PropTypes.number,
    title: PropTypes.string,
    style: PropTypes.object,
    time: PropTypes.string,
}
class HeaderMessage extends Component {
    render() {
        const { onPressLeft, onPressRight, navigation, valueRight, iconRight, valueLeft, iconLeft, title, style, time } = this.props
        return (
            <View style={[styles.containerHeader, style]}>
                <ButtonBase onPress={onPressLeft} icon={iconLeft ? iconLeft : R.images.icons.ic_back} value={valueLeft} />
                <View style={{
                    alignItems: 'center'
                }}>
                    <ScaleText fontFamily="bold" size={20} style={styles.txtNameHeader}>{title}</ScaleText>
                    <ScaleText fontFamily="lightItalic" size={12} style={styles.txtNameHeader}>{time}</ScaleText>
                </View>
                <ButtonBase value={valueRight} icon={iconRight} onPress={onPressRight} />

            </View>
        )
    }
}
HeaderMessage.defaultProps = {
    onPressLeft: () => NavigationServices.pop(),
}
HeaderMessage.prototype.props = prototype
export default HeaderMessage


const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: R.colors.defaultColor,
        minHeight: 55,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 5,
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 }
    },
    txtNameHeader: {
        fontFamily: R.fonts.Bold,
        flex: 1,
        color: R.colors.white,
        paddingHorizontal: 15
    },
})
