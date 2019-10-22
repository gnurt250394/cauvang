import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import ListDrug from './ListDrug';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';

class BookingDrugScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: 'Thuốc giảm đau',
                    content: '200mg'
                },
                {
                    id: 2,
                    name: 'Levothyroxine',
                    content: '700mg'
                },
                {
                    id: 3,
                    name: 'Memantine',
                    content: '900mg'
                },
                {
                    id: 4,
                    name: 'Donepezil',
                    content: '100mg'
                },
                {
                    id: 5,
                    name: 'Zolpidem',
                    content: '500mg'
                },
                {
                    id: 6,
                    name: 'Etonogestrel +',
                    content: '400mg'
                },
                {
                    id: 7,
                    name: 'Thuốc giảm đau',
                    content: '200mg'
                },
                {
                    id: 8,
                    name: 'Levothyroxine',
                    content: '700mg'
                },
                {
                    id: 9,
                    name: 'Memantine',
                    content: '900mg'
                },
                {
                    id: 10,
                    name: 'Donepezil',
                    content: '100mg'
                },
                {
                    id: 11,
                    name: 'Zolpidem',
                    content: '500mg'
                },
                {
                    id: 12,
                    name: 'Etonogestrel +',
                    content: '400mg'
                },
            ],
            listDrug: []
        };
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ paddingTop: 7 }}>
                <Text style={{
                    fontFamily: R.fonts.Bold
                }}>{item.name} - {item.content}</Text>
                <Text>Số lượng: {item.count || 1}</Text>
            </View>

        )
    }
    onChangeText = (value) => {

    }
    compressArray(original) {

        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);

        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {

            var myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i] == copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }

            if (myCount > 0) {
                var a = new Object();
                a = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }

        return compressed;
    };
    onSelectDrug = (item) => {
        let data = []
        data.push(item)
        this.setState({ listDrug: this.compressArray([...this.state.listDrug, ...data]) })

    }
    onBooking=()=>{
        NavigationServices.navigate(screenName.ConfirmBookingScreen)
    }
    render() {
        const { data, listDrug } = this.state
        return (
            <Container scrollView={true}>
                <View>
                    <View style={styles.containerSearch}>
                        <TextInput
                            style={styles.inputSearch}
                            onChangeText={this.onChangeText}
                            placeholder={"Tìm đơn thuốc"} />
                        <Image source={R.images.icons.drug.ic_search} style={styles.iconSearch} />
                    </View>
                    <ListDrug data={data} onPress={this.onSelectDrug} />

                    <TouchableOpacity style={styles.buttonInputDrug}>
                        <Text style={styles.txtInputDrug}>Nhập đơn thuốc</Text>
                    </TouchableOpacity>
                    <View style={styles.containerBookingDrug}>
                        <Text style={styles.txtLabel}>Đơn thuốc đặt mua:</Text>
                        <FlatList
                            data={listDrug}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                        {
                            listDrug && listDrug.length > 0 ?
                                <TouchableOpacity
                                onPress={this.onBooking}
                                style={styles.buttonBooking}>
                                    <Text style={styles.txtBooking}>Đặt mua</Text>
                                </TouchableOpacity>
                                : null
                        }

                    </View>

                </View>
            </Container>
        );
    }
}

export default BookingDrugScreen;


const styles = StyleSheet.create({
    txtBooking: {
        fontFamily: R.fonts.Bold,
        color: R.colors.white
    },
    buttonBooking: {
        backgroundColor: R.colors.defaultColor,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 10
    },
    txtLabel: {
        fontFamily: R.fonts.Black,
        color: R.colors.textColor
    },
    containerBookingDrug: {
        flex: 1,
        paddingHorizontal: 10
    },
    txtInputDrug: {
        fontFamily: R.fonts.BoldItalic,
        color: R.colors.defaultColor
    },
    buttonInputDrug: {
        alignSelf: 'flex-end',
        paddingVertical: 15,
        paddingRight: 6
    },
    iconSearch: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    inputSearch: {
        height: 40,
        flex: 1
    },
    containerSearch: {
        borderRadius: 5,
        borderColor: R.colors.gray,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
        marginTop: 10,
        paddingHorizontal: 6,
        marginBottom: 5
    },
})