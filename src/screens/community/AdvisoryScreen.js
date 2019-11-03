import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabDoctor from 'routes/TabDoctor';
import HeaderDefault from 'components/HeaderDefault';
import R from 'res/R';

class AdvisoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderDefault
                    title="Tư vấn"
                    style={{
                        backgroundColor: R.colors.defaultColor,
                    }}
                />
                <TabDoctor />
            </View>
        );
    }
}

export default AdvisoryScreen;
