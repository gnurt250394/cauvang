import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { userApp } = this.props
        const image = userApp && userApp.image ? { uri: userApp.image } : R.images.icons.ic_user
        return (
            <Container>
                <View style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingTop: 20,
                }}>
                    <Image source={image} style={{
                        height: 80,
                        width: 80,
                        borderRadius: 40,
                    }} />
                    <Text style={{
                        fontFamily: R.fonts.Black,
                        paddingTop: 10
                    }}>{userApp.fullName}</Text>
                </View>

            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    userApp: state.loginReducer.userApp
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps)(ProfileScreen);
