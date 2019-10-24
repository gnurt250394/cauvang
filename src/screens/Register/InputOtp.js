import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import R from 'res/R';

class InputOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    onChangeText1 = (value) => {
        if (value && value.length >= 1) {
            this.input2.focus()
            return
        }
        this.setState({ value })

    }
    onChangeText2 = (value) => {
        if (value && value.length >= 1) {
            this.input3.focus()
            return
        }
        this.setState({ value })
    }
    onChangeText3 = (value) => {
        if (value && value.length >= 1) {
            this.input4.focus()
            return
        }
        this.setState({ value })
    }
    onChangeText4 = (value) => {
        if (value && value.length >= 1) {
            this.input5.focus()
            return
        }
        this.setState({ value })
    }
    onChangeText5 = (value) => {
        if (value && value.length >= 1) {
            this.input6.focus()
            return
        }
        this.setState({ value })
    }
    onChangeText6 = (value) => {
        if (value && value.length >= 1) {
            Keyboard.dismiss()
            return
        }
        this.setState({ value })
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput ref={ref => this.input1 = ref} style={styles.input} onChangeText={this.onChangeText1} />
                <TextInput ref={ref => this.input2 = ref} style={styles.input} onChangeText={this.onChangeText2} />
                <TextInput ref={ref => this.input3 = ref} style={styles.input} onChangeText={this.onChangeText3} />
                <TextInput ref={ref => this.input4 = ref} style={styles.input} onChangeText={this.onChangeText4} />
                <TextInput ref={ref => this.input5 = ref} style={styles.input} onChangeText={this.onChangeText5} />
                <TextInput ref={ref => this.input6 = ref} style={styles.input} onChangeText={this.onChangeText6} />
            </View>
        );
    }
}

export default InputOtp;


const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: R.colors.black,
        marginHorizontal: 10,
        fontSize: 25
    },
})