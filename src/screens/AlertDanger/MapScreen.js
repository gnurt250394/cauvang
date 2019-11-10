import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Container from 'library/Container';
import { WebView } from 'react-native-webview';
import { showLoading, hideLoading } from 'library/Loading/LoadingComponent';

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <View style={{flex:1}}>
                    <WebView
                        source={{ uri: 'https://inmapz.com/maps/benh-vien-e-hospital-3077822157?utm_venue=false' }}
                        // style={{height:500 }}
                        onLoadStart={() => { showLoading() }}
                        onLoadProgress={(e)=>{
                            console.log('e: ', e.nativeEvent);

                        }}
                        onLoadEnd={() => { hideLoading() }}
                    />
                </View>
            </Container>
        );
    }
}

export default MapScreen;
