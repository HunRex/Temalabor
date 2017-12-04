import React, { Component } from 'react';
import { Text, View, StyleSheet , Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView,
    BackHandler, Alert} from 'react-native';
import { StackNavigator} from 'react-navigation';
import MainScreen from "../MainScreen";
import ActionButton from "react-native-action-button";
import {Icon} from "react-native-elements";



export default class DetailsScreen extends Component{
    static navigationOptions ={
        title: 'Details'
    };
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {

        this.props.navigation.goBack(null);
        return true;
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
        this.props.navigation.navigate('Main', {})

    }




    render() {
        const m = this.props.navigation.state.params.mail;
        const p = this.props.navigation.state.params.ex;
        return(
            <View>
            <ScrollView>
                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Basic Details:
                    </Text>
                </View>
                <Text style = {styles.content}>
                    Package Type:
                </Text>
                <TextInput
                    placeholder = {m.package_type}

                    editable = { false }
                    style = {styles.textcont}
                    />
                <Text style = {styles.content}>
                    Subject:
                </Text>
                <TextInput
                    placeholder = {m.subject}
                    editable = { false }
                    style = {styles.textcont}
                />
                <Text style = {styles.content}>
                    Time:
                </Text>
                <TextInput
                    placeholder = {m.time}
                    editable = { false }
                    style = {styles.textcont}
                />
                <Text style = {styles.content}>
                    Address
                </Text>
                <TextInput
                    placeholder = {m.adress.zip + "  "+ m.adress.city + " " + m.adress.adress }
                    editable = { false }
                    style = {styles.textcont}
                />
                <Text style = {styles.content}>
                    Division:
                </Text>
                <TextInput
                    placeholder = {m.division}

                    editable = { false }
                    style = {styles.textcont}
                />
                <Text style = {styles.content}>
                    Admin:
                </Text>
                <TextInput
                    placeholder = {m.admin.name}
                    editable = { false }
                    style = {styles.textcont}
                />
                <Text style = {styles.content}>
                    Comment:
                </Text>
                <TextInput
                    placeholder = {m.package_comment}
                    editable = { false }
                    maxLength = {40}
                    style = {styles.textcont}
                />
                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Extra details:
                    </Text>
                </View>
                <Text style = { styles.fontV}>
                    Additional details, according to package type
                </Text>
                {m.package_type == 'invoice' &&
                <View>
                    <Text style={styles.content}> Invoice#: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={p.invoice_number}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Expiry: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={""+ p.expiry}
                        editable={false}
                        style={styles.textcont}
                        keyboardType="numeric"
                    />
                    <Text style={styles.content}> Brutto: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={""+ p.brutto}
                        editable={true}
                        style={styles.textcont}
                        keyboardType="numeric"
                    />
                    <Text style={styles.content}> Netto: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={""+ p.netto}
                        editable={true}
                        style={styles.textcont}
                        keyboardType="numeric"
                    />
                </View>
                }

                {m.package_type != 'invoice' && <View>
                    <Text style={styles.content}> Category: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={p.category}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Delivery type: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder={p.delivery_type}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Count: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder={"" + p.count}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Value: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder={"" + p.value}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Weight: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder={"" + p.weight}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Weight price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder={"" + p.weight_price}
                        editable={false}
                        style={styles.textcont}

                    />
                    <Text style={styles.content}> Extra price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder={"" + p.extra_price}
                        editable={false}
                        style={styles.textcont}
                    />
                </View>
                }
            </ScrollView>
                <ActionButton offsetX={15} offsetY={100} buttonColor="rgba(250,50,0,1)"  icon={<Icon name='create' size={25} />}
                              onPress = {() => this.props.navigation.navigate('Edit', {ba: m, ex:p})}
                >
                    <Icon name="create" style={styles.actionButtonIcon} />
                </ActionButton>
                <ActionButton offsetX={15} buttonColor="rgba(0,50,250,1)"  icon={<Icon name='delete' size={25} />}
                              onPress = {() => this.deleteCheck(this.props.navigation.state.params.mail)}

                >
                    <Icon name="delete" style={styles.actionButtonIcon} />
                </ActionButton>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    font: {
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    textcont: {
        borderRadius: 2,
        borderWidth: 0.5,
        backgroundColor:'#ecf0f1',

    },

    content: {
        paddingTop: 5,

    },

    btnview: {
        paddingTop: 10,
        alignItems: 'center',
    },

    editbtn: {
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#95a5a6',
        paddingBottom:0,
    },


    fontV: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
