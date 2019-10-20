import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import R from 'res/R';
const { width } = Dimensions.get("window");

const getAdjustedFontSize = (size) => {
    return parseInt(size) * width * (1.8 - 0.002 * width) / 400;
}

class ScaleText extends React.Component {
    renderFontfamily = () => {
        const { fontFamily } = this.props
        switch (fontFamily) {
            case 'bold': return R.fonts.Bold
            case 'boldItalic': return R.fonts.BoldItalic
            case 'italic': return R.fonts.Italic
            case 'light': return R.fonts.Light
            case 'lightItalic': return R.fonts.LightItalic
            default: return R.fonts.Regular
        }
    }
    render() {
        return (
            <Text {...this.props} style={[this.props.style, { fontSize: getAdjustedFontSize(this.props.size), fontFamily: this.renderFontfamily() }]} >{this.props.children}</Text>
        );
    }
}
ScaleText.defaultProps = {
    size: 14
}
ScaleText.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    fontFamily: PropTypes.string,
}
export default ScaleText;

ScaleText.prototype.props = {
    size: PropTypes.string,
    style: PropTypes.object,
    fontFamily: 'bold' | 'boldItalic' | 'italic' | 'light' | 'lightItalic',
}
