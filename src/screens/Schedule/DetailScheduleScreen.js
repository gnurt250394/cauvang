import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';

class DetailScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <View style={{
                    padding: 10,
                }}>
                    <View style={styles.containerText}>
                        <Text style={styles.txtTitle}>Địa điểm khám</Text>
                        <Text style={[styles.txtTitle, { fontSize: 15 }]}>Bệnh viện E</Text>
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.txtTitle}>Địa chỉ</Text>
                        <Text style={{
                            textAlign: 'right',
                            width: '50%'
                        }}>89 Trần cung ,Nghĩa Tân, Từ Liêm, Nghĩa Tân, Cầu Giấy, Hà Nội</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.txtTitle}>Nơi làm thủ tục</Text>
                        <Text>Bệnh viện E</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.txtTitle}>Tổng tiền</Text>
                        <Text>Bệnh viện E</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.txtTitle}>Trạng thái thanh toán</Text>
                        <Text>Chưa thanh toán</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default DetailScheduleScreen;


const styles = StyleSheet.create({
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingBottom: 6,
    },
    txtTitle: {
        fontFamily: R.fonts.Bold,
        color: R.colors.black
    },
})