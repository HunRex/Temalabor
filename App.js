import React, { Component } from 'react';
import { Text, View, StyleSheet, AppRegistry } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import LoginForm from './Components/Login/LoginForm';
import MainScreen from './Components/Main/MainScreen';
import DetailsScreen from "./Components/Main/Details/DetailsScreen";
import AddItemScreen from "./Components/Main/AddItem/AddItemScreen";
import EditScreen from "./Components/Main/Details/EditScreen";
import SearchScreen from "./Components/Main/SearchView";



const Nav = StackNavigator ({
        Login: {screen: LoginForm},
        Main: {screen: MainScreen},
        Details: {screen: DetailsScreen},
        AddItem: { screen: AddItemScreen},
        Edit: { screen: EditScreen},
        Search: {screen: SearchScreen},

},
)

export default class App extends Component {
    static navigationOptions = {
        title: 'Main',
    };

    render() {
        return <Nav/>
    }
}



AppRegistry.registerComponent('Temalabor', () => Nav);




