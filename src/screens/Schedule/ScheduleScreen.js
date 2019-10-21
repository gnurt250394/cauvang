import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import Container from 'library/Container';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import R from 'res/R';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
LocaleConfig.locales.en = {
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mär.', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
    dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
};

LocaleConfig.locales.vi = LocaleConfig.locales[''];
class ScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    goToDetail=()=>{
        NavigationServices.navigate(screenName.DetailScheduleScreen)
    }
    render() {
        return (
            <Container>
                <Calendar
                    // Collection of dates that have to be marked. Default = {}
                    markedDates={{
                        '2019-10-22': { selected: true, marked: true, selectedColor: 'blue' },
                        '2012-05-17': { marked: true },
                        '2012-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        '2012-05-19': { disabled: true, disableTouchEvent: true }
                    }}
                />
                <View style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <TouchableOpacity 
                    onPress={this.goToDetail}
                    style={styles.buttonFirstSchedule}>
                        <Text style={styles.TxtFirstSchedule}>Đến lịch khám gần nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAddSchedule}>
                        <Image source={R.images.icons.ic_next} style={styles.imgNext} />
                        <Text style={{
                            fontFamily: R.fonts.Bold,
                        }}> Thêm lịch khám</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default ScheduleScreen;


const styles = StyleSheet.create({
    imgNext: {
        height: 19,
        width: 19,
        resizeMode: 'contain'
    },
    buttonAddSchedule: {
        backgroundColor: R.colors.secondColor,
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        paddingVertical: 15,
        borderRadius: 7,
        paddingHorizontal: 5,
    },
    TxtFirstSchedule: {
        textAlign: 'center',
        color: R.colors.white,
        fontFamily: R.fonts.Bold
    },
    buttonFirstSchedule: {
        backgroundColor: R.colors.defaultColor,
        width: '40%',
        paddingVertical: 10,
        borderRadius: 7,
        marginBottom: 7,
    },
})