import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {Text, View, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, BackHandler, Alert, AsyncStorage
    } from 'react-native'
import {List, ListItem,  SearchBar, Icon} from 'react-native-elements'
import  ActionButton  from 'react-native-action-button';




export default class MainScreen extends Component {
    static navigationOptions = {
        title: 'Main',
    };
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: false,
            data: [],
            dataExMa : {
                category: '',
                delivery_type: '',
                count: '',
                weight: '',
                value: '',
                weight_price: '',
                extra_price: '',
            },
            dataExIn:{
                sender: '',
                netto: '',
                brutto: '',
                expiry: '',
                invoice_number: '',

            },
            tmpdata: [],
            skey: '',
            db: 15,
            offset: 0,
            error: null,
            refreshing: false,


        };
    }



    goToInDet = (item, i) => {
        fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices/' + item.packageId)
            .then(res => res.json())
            .then(res => {
                i.netto = res.netto;
                i.brutto = res.brutto;
                i.expiry = res.expiry;
                i.invoice_number = res.invoice_number;
                this.props.navigation.navigate('Details', {mail: item, ex: i})
            })

    }

    goToMaDet = (item, i) => {
        fetch('https://hidden-dusk-48885.herokuapp.com/api/mails/' + item.packageId)
            .then(res => res.json())
            .then(res => {
              // i.sender = res.sender;
                i.weight = res.weight;
                i.category = res.category;
                i.count = res.count;
                i.weight_price = res.weight_price;
                i.value = res.value;
                i.extra_price = res.extra_price;
                i.delivery_type = res.delivery_type;
                this.props.navigation.navigate('Details', {mail: item, ex: i})
            })
    }


    navDet = (item) => {
        if(item.package_type == 'invoice' ) {
                this.goToInDet(item, this.state.dataExIn);


        } else {
                this.goToMaDet(item, this.state.dataExMa);
                };

        }


    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        await this.makeRemoteRequest();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Alert.alert( 'Logout', 'Are sure you want to logout?',
            [ ,
                {text: 'Cancel',  style: 'cancel'},
                {text: 'Yes', onPress: () => this.props.navigation.navigate('Login', {})}, ] )
        return true;
    }


    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    handleRefresh = () => {
        this.setState(
            {
                offset: 0,
                refreshing: true,
                data: []
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };
    handleLoadMore = () => {
        this.setState(
            {
                loading: true,
                offset: this.state.offset + 15,
            }, () => {this.makeRemoteRequest()}

        );

    };

    getIcon = (type) => {
        if(type.package_type == 'packet'){
            return 'business-center'
        }
        else if(type.package_type == 'mail') {
            return 'mail'
        }else if(type.package_type == 'invoice'){
            return 'attach-money'
    } else if( type.package_type == 'gazette') {
        return 'insert-drive-file'
        }
}

    deleteCheck = (item) => {
        Alert.alert( 'Delete', 'Are you sure you want to delete this item?',
            [ ,
                {text: 'Cancel',  style: 'cancel'},
                {text: 'Yes', onPress: () => this.deleteItem(item)} ] )
    }

    async deleteItem (item) {

        var t = this.props.navigation.state.params.t;

        if (item.package_type == 'invoice') {
            fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices/' + item.packageId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",
                    'Authorization': 'Bearer '
                },

            })
        } else {
            fetch('https://hidden-dusk-48885.herokuapp.com/api/mails/' + item.packageId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",
                    'Authorization': 'Bearer '
                },
            })
        }
        this.handleRefresh();

    }

     async makeRemoteRequest() {
        const { db, offset , page} = this.state;
        const url = `https://hidden-dusk-48885.herokuapp.com/api/packages/?offset=${this.state.offset}&count=${this.state.db}`;
        this.setState({ loading: true });
        await fetch(url, {method: 'GET'})
            .then(res => res.json())
            .then(res => {
                setTimeout(() => null, 0);
                this.setState({
                    data: page === 1 ? res.content : [...this.state.data, ...res.content],
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
            this.setState({ error, loading: false });
        });
    };




    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };


    render () {
        var token = this.props.navigation.state.params.t;
        return (
            <View>

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem

                            onPress = {
                                () => this.navDet(item)
                            }
                            title={item.admin.name}
                            subtitle={item.subject}
                            leftIcon={{
                                type: 'Feather',
                                name: this.getIcon(item)}}
                            rightIcon={{ name: 'delete',}}
                            onPressRightIcon = {
                                () => this.deleteCheck(item)
                            }
                            containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.packageId}
                    ItemSeparatorComponent={this.renderSeparator}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                    ListFooterComponent={this.renderFooter}
                    refreshing = {this.state.refreshing}
                    onRefresh = {this.handleRefresh}
                />
                <ActionButton buttonColor="rgba(0,50,250,1)"
                            //  onPress = {() => this.props.navigation.navigate('AddItem', {t: token})}
                >
                    <ActionButton.Item buttonColor='#3498db' title="Search" onPress = {() => this.props.navigation.navigate('Search', {t: token})}>
                        <Icon name="search" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#e74c3c' title="Add mail" onPress = {() => this.props.navigation.navigate('AddItem', {t: token})}>
                        <Icon name="note-add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>

        );
    }


}

const Nav = StackNavigator ({
    Main: {screen: MainScreen}
})

const styles = StyleSheet.create({
    big: {
        fontSize: 80,
    },
})



//AppRegistry.registerComponent('Temalabor', () => Nav);
