import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import ScaleText from 'components/TextScale';
import DatePicker from 'react-native-datepicker'
import R from 'res/R';
import { width } from 'configs/utils';
import { CheckBox } from 'native-base'
class FormQuestion2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            height: '',
            weight: '',
            BMI: '',
            checked1: false,
            checked2: false,
            checked3: false
        };
    }
    onChangeText = (state) => (value) => {
        this.setState({ [state]: value }, () => {
            const { date, height, weight } = this.state
            if (height && weight) {
                if (this.timeout) clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    let BMI = weight / ((height / 100) * (height / 100))
                    this.setState({ BMI: BMI.toFixed(2) })
                }, 10)


            }
        })

    }
    onPressCheck = (data, e) => () => {
        data.forEach(item => {
            if (item._id == e._id) {
                item.checked = true
            } else {
                item.checked = false
            }
        })
        this.props.onPressCheck && this.props.onPressCheck(data, e)
    }
    render() {
        const { BMI } = this.state
        const { index, length, item } = this.props
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtDate}>{item.name}</Text>
                    <View >
                        {item.anwser && item.anwser.length > 0 ?
                            item.anwser.map((e, i) => {
                                return (
                                    <TouchableOpacity
                                        onPress={this.onPressCheck(item.anwser, e)}
                                        key={i} style={styles.buttonChecked}>
                                        <View style={styles.containerChecked}>
                                            {
                                                e.checked ? <Image source={R.images.icons.ic_checked} style={styles.iconChecked} /> : null
                                            }
                                        </View>
                                        <Text style={styles.TxtAnwser}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            }) : null
                        }


                    </View>
                </View>
                {/**footer */}
                {
                    length - 1 == index ?
                        <TouchableOpacity
                        onPress={this.props.onSend}
                        style={styles.buttonSend}>
                            <Text style={styles.txtSend}>Gửi</Text>
                        </TouchableOpacity>
                        :
                        null

                }
                <View style={styles.containerPage}>
                    <TouchableOpacity
                        onPress={this.props.onPressBack}
                        style={styles.button}>
                        <Image source={R.images.icons.ic_back_arrow} style={styles.imageBack} />
                    </TouchableOpacity>
                    <Text style={styles.txtBetween}>{index + 1}/{length}</Text>
                    <TouchableOpacity
                        onPress={this.props.onPress}
                        style={styles.button}>
                        <Image source={R.images.icons.ic_next_arrow} style={[styles.imageBack, { tintColor: index == length - 1 ? R.colors.gray : R.colors.white }]} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    TxtAnwser: {
        paddingLeft: 10,
        color: R.colors.white,
        fontFamily: R.fonts.BlackItalic
    },
    buttonChecked: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    iconChecked: {
        height: 17,
        width: 17,
        resizeMode: 'contain'
    },
    containerChecked: {
        backgroundColor: R.colors.white,
        height: 20,
        width: 20,
        borderRadius: 3,
        borderColor: R.colors.gray,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSend: {
        fontFamily: R.fonts.Bold,
        color: R.colors.textColor
    },
    buttonSend: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: R.colors.white,
        width: '30%',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15
    },
    container: {
        padding: 10,
        flex: 1,
    },
    txtDate: {
        paddingBottom: 10,
        color: R.colors.white,
        fontFamily: R.fonts.Bold
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
    txtBMI: {
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: R.fonts.Bold
    },
    inputHeight: {
        backgroundColor: R.colors.white,
        borderRadius: 5,
        height: 40
    },
    txtHeight: {
        color: R.colors.white,
        paddingTop: 10,
        paddingBottom: 5,
        fontFamily: R.fonts.Bold
    },
    width40: { width: '40%' },
    containerHeightWeight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateInput: {
        backgroundColor: R.colors.white,
        borderRadius: 5,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },

});
export default FormQuestion2;
