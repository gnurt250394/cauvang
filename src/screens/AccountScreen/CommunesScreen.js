import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import Container from 'library/Container';
import R from 'res/R';
import apis from 'configs/apis';
import NavigationServices from 'routes/NavigationServices';

class CommunesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            page: 1,
            parrent_id: this.props.navigation.getParam('parrent_id', '')
        };
    }
    getData = async () => {
        const { page, parrent_id } = this.state
        this.setState({ isLoading: true }, async () => {
            let res = await apis.fetch(apis.PATH.COMMUNES, { id_district: parrent_id })
            this.setState({ isLoading: false })
            if (res && res.code == 200) {
                this.setState({ data: res.data })
            }
        })

    }

    componentDidMount = () => {
        this.getData()
    };
    selectHospital = (item) => () => {
        let onItemSelected = this.props.navigation.getParam('onItemSelected', null)
        if (onItemSelected) onItemSelected(item)
        NavigationServices.pop()
    }
    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={this.selectHospital(item)}
                style={styles.buttonSelecthospital}>
                <Image style={styles.imgHospital} source={R.images.icons.ic_hospital} />
                <Text style={styles.txtHospital}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const { data, isLoading } = this.state
        return (
            <Container >
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </Container>
        );
    }
}

export default CommunesScreen;


const styles = StyleSheet.create({
    txtHospital: {
        fontFamily: R.fonts.Bold,
        paddingLeft: 20,
    },
    imgHospital: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    buttonSelecthospital: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        borderBottomColor: R.colors.black,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
})