import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import { width } from 'configs/utils';

class AlertDangerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.navigation.getParam('profile', {})
        };
    }

    render() {
        const { profile } = this.state
        return (
            <Container>
                <View style={{
                    flex: 1
                }}>
                    <View style={styles.buttonSOS}>
                        <Image source={R.images.icons.profile.ic_info} style={styles.imageSOS} />
                        <View style={styles.containerProfile}>
                            <Text style={styles.txtname}>{profile.name}</Text>
                            <Text>{profile.telephone}</Text>
                        </View>
                    </View>
                    <Image source={R.images.icons.ic_callSOS} style={styles.iconCall} />
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    iconCall: {
        height: width / 2,
        width: width / 2,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    },
    txtname: {
        fontFamily: R.fonts.Heavy
    },
    containerProfile: {
        flex: 1,
        paddingLeft: 10
    },
    imageSOS: {
        height: 40,
        width: 40,
        resizeMode: 'contain'

    },
    buttonSOS: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: R.colors.white,
        borderBottomColor: R.colors.gray,
        borderBottomWidth: 0.5,
        paddingLeft: 20,
    },
});
export default AlertDangerScreen;
