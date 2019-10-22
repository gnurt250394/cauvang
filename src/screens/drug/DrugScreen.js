import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class DrugScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onBookingDrug = () => {
        NavigationServices.navigate(screenName.BookingDrugScreen)
    }
    render() {
        return (
            <Container>
                <Image source={R.images.default.drug} style={styles.imageDrug} />
                <View style={{
                    flex: 1,
                }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: R.colors.secondColor, }]}>
                        <Image source={R.images.icons.drug.ic_prescription} style={styles.imageButton} />
                        <Text style={styles.txtButton}>Lịch sử mua thuốc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onBookingDrug}
                        style={styles.button}>
                        <Image source={R.images.icons.drug.ic_cart} style={styles.imageButton} />
                        <Text style={styles.txtButton}>Đặt mua thuốc theo đơn</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default DrugScreen;


const styles = StyleSheet.create({
    imageDrug: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 200,
        width: '100%',
        marginBottom: '10%'
    },
    txtButton: {
        fontFamily: R.fonts.Bold,
        paddingLeft: 10,
        color: R.colors.textColor
    },
    imageButton: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        width: '100%'
    },
})