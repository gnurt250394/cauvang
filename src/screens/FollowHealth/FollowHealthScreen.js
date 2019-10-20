import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';

class FollowHealthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    time: '10',
                    overRating: 10
                },
                {
                    id: 2,
                    time: '10',
                    overRating: 5
                },
                {
                    id: 3,
                    time: '10',
                    overRating: 1
                },
                {
                    id: 4,
                    time: '10',
                    overRating: 10
                },
            ]
        };
    }
    getRating = (item) => {
        const overRating = item.overRating
        if (overRating >= 7) {
            return R.colors.green
        } else if (overRating >= 5 && overRating < 7) {
            return R.colors.orange
        } else {
            return R.colors.red
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <View >
                <Text style={{
                    paddingHorizontal: 10
                }}>{item.time}</Text>
                <View style={[styles.viewDots, { backgroundColor: this.getRating(item) }]} />
                <View style={[styles.viewDots, { backgroundColor: this.getRating(item) }]} />
                <View style={[styles.viewDots, { backgroundColor: this.getRating(item) }]} />
            </View>
        )
    }
    _keyExtractor = (item, index) => `${item.id || index}`
    render() {
        const { data } = this.state
        return (
            <Container>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        maxWidth: '20%',
                        paddingTop: '6%'
                    }}>
                        <Text style={{
                            paddingVertical: 10
                        }}>Đánh giá chung</Text>
                        <Text >Chỉ số đường huyết</Text>
                        <Text >Chỉ số xyz</Text>
                    </View>
                    <FlatList
                        data={data}
                        horizontal={true}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                <TouchableOpacity style={styles.buttonNoteDoctor}>
                    <Image source={R.images.icons.follow_health.ic_note} style={styles.imgNote} />
                    <Text style={styles.txtNote}>Lời dặn của bác sỹ</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

export default FollowHealthScreen;


const styles = StyleSheet.create({
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