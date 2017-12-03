import React, { Component } from 'react';
import { Text, View, StyleSheet , Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
Alert, AsyncStorage, Keyboard, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {FormInput} from 'react-native-elements'




export default class LoginForm extends Component {
    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            uname: '',
            pword: '',
            token: '',
            data: [],
            disabled: false,
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {

        return true;
    }

    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    getName = (value) => {
        this.setState({
            uname: value,
        })
    }

    getPassword = (value) => {
        this.setState({
            pword: value
        })
    }

    render() {
        console.disableYellowBox = true;
        return (

            <View style={styles.login}>
                <Image source={require('./slp.png')}/>

                <FormInput returnKeyType="next"
                           placeholder="Username"
                           keyboardType="email-address"
                           style={styles.forms}
                           onChangeText={(item) => this.setState({ uname:item})}
                           onSubmitEditing={() => { this.pa.focus() }}
                />
                <FormInput returnKeyType="go"
                           ref={(item) => { this.pa = item }}
                           placeholder="Password"
                           secureTextEntry style={styles.forms}
                           onChangeText={(item) => this.setState({ pword:item})}
                           onSubmitEditing={ () => this.loginCheck()}
                           />
                <TouchableOpacity
                    activeOpacity={this.state.disabled ? 1 : 0.7}
                    disabled={this.state.disabled}
                    onPress={
                        () =>
                        this.loginCheck()
                    }
                    ref={(item) => { this.btn = item }}
                    style={styles.lgnbtn}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>



        );

    }

    loginCheck = () => {
       // Alert.alert( 'Login', 'Authentication...',
          //  [ ,] )
        this.setState({
            disabled : true,
        })
        fetch('https://hidden-dusk-48885.herokuapp.com/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.uname,
                password: this.state.pword
            })
        }) .then(response => {
            // response from server
            // here you can check status of response and handle it manually
            switch (response.status) {
                case 401: alert('Unauthorized'); break;
                case 400: alert('Unauthorized'); break;
            }
            // or you can check if status in the range 200 to 299
            if (response.ok) {
                Keyboard.dismiss();
                this.props.navigation.navigate('Main', {})
            }
        })


        /*     .then(res => { if(res.status == 401){ alert("sajt"); return;}
        else {(res => res.json())
            .then((res => {
                // Alert.alert("Login", "Succesfull login")

                Keyboard.dismiss();
                this.props.navigation.navigate('Main', {})

            }))}})

        this.setState({
            disabled : false,
        })*/

        this.setState({
            disabled :false,
        })

    }
}

const styles = StyleSheet.create({
    login: {
        backgroundColor: '#00BCD4',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    lgnbtn: {
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16a085',
        paddingBottom:0,


    },
    forms: {
        height: 50,
        backgroundColor: '#00ACC1',
        top: 0,
        width:'75%',
        marginBottom:0,
        color: '#FFF',
        marginBottom:5,
    }

})