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
        // this.input2.focus()
        this.setState({ value })

    }
    onChangeText2 = (value) => {
        this.input3.focus()
        this.setState({ value })
    }
    onChangeText3 = (value) => {
        this.input4.focus()
        this.setState({ value })
    }
    onChangeText4 = (value) => {
        this.input5.focus()
        this.setState({ value })
    }
    onChangeText5 = (value) => {
        this.input6.focus()
        this.setState({ value })
    }
    onChangeText6 = (value) => {
        Keyboard.dismiss()
        this.setState({ value })
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput ref={ref => this.input1 = ref} keyboardType="numeric" maxLength={6} style={styles.input} onChangeText={this.onChangeText1} />
                {/* <TextInput ref={ref => this.input2 = ref} keyboardType="numeric" maxLength={1} style={styles.input} onChangeText={this.onChangeText2} />
                <TextInput ref={ref => this.input3 = ref} keyboardType="numeric" maxLength={1} style={styles.input} onChangeText={this.onChangeText3} />
                <TextInput ref={ref => this.input4 = ref} keyboardType="numeric" maxLength={1} style={styles.input} onChangeText={this.onChangeText4} />
                <TextInput ref={ref => this.input5 = ref} keyboardType="numeric" maxLength={1} style={styles.input} onChangeText={this.onChangeText5} />
                <TextInput ref={ref => this.input6 = ref} keyboardType="numeric" maxLength={1} style={styles.input} onChangeText={this.onChangeText6} /> */}
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