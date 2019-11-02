import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { height } from 'configs/utils';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
import apis from 'configs/apis';
import moment from 'moment';
class FollowHealthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataChart: [],
            listTime: []
        };
    }
    componentDidMount = () => {
        this.getData()
    };

    getData = async () => {
        let res = await apis.fetch(apis.PATH.LIST_FOLLOW)
        if (res && res.code == 200) {
            this.setState({ data: res.data, dataChart: res.listPoint, listTime: res.listTime })
        }
    }
    getRating = (item) => {
        const type = item.type
        if (type == 1) {
            return R.colors.green
        } else if (type == 2) {
            return R.colors.orange
        } else {
            return R.colors.red
        }
    }
    formatDate = (item) => {
        return moment(item.create_at).format('DD')
    }
    _renderItem = ({ item, index }) => {
        const data = [50, 40, 50, 20]
        return (
            <View key={index}>
                <Text style={{
                    paddingHorizontal: 10
                }}>{item.create_at}</Text>
                <View style={[styles.viewDots, { backgroundColor: this.getRating(item) }]} />

            </View>
        )
    }
    renderLineChart = (data, listTime) => {
        console.log('listTime: ', listTime);
        console.log('data: ', data);
        const contentInset = { top: 20, bottom: 20 }
        return (
            <View style={{ height: height / 4, flexDirection: 'row', paddingLeft: 5 }}>
                <YAxis
                    data={data}
                    contentInset={{ top: 35, bottom: 20 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}`}
                />
                <View style={{ flex: 1 }}>
                    <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={data}
                        formatLabel={(value, index) => listTime && listTime.length > 0 ? listTime[index] : index}
                        contentInset={{ left: 20, right: 20 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />
                    <LineChart
                        style={{ flex: 1, paddingHorizontal: 10 }}
                        data={data}
                        animate={true}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset}
                    >
                        <Grid />
                    </LineChart>
                </View>
            </View>
        )
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    onNoteDoctor = () => {
        NavigationServices.navigate(screenName.NoteDoctorScreen)
    }
    render() {
        const { data, dataChart, listTime } = this.state
        return (
            <Container scrollView={true}>
                <View>
                    <View >
                        <Text style={styles.txtTitle}>Đánh giá chung</Text>

                        <FlatList
                            data={data}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>

                    <Text style={styles.txtTitle} >Chỉ số đường huyết</Text>
                    {this.renderLineChart(dataChart, listTime)}
                    {/* <Text style={styles.txtTitle}>Chỉ số xyz</Text>
                    {this.renderLineChart(dataChart)} */}
                    <TouchableOpacity
                        onPress={this.onNoteDoctor}
                        style={styles.buttonNoteDoctor}>
                        <Image source={R.images.icons.follow_health.ic_note} style={styles.imgNote} />
                        <Text style={styles.txtNote}>Lời dặn của bác sỹ</Text>
                    </TouchableOpacity>
                </View>
            </Container >
        );
    }
}

export default FollowHealthScreen;


const styles = StyleSheet.create({
    txtTitle: {
        alignSelf: 'center',
        paddingVertical: 10,
        fontFamily: R.fonts.Bold
    },
    txtNote: {
        paddingHorizontal: 10,
        fontFamily: R.fonts.Regular
    },
    imgNote: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    buttonNoteDoctor: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 20
    },
    viewDots: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginVertical: 7,
        marginHorizontal: 10
    },
})