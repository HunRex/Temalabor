
import { View, Text, TextInput, StyleSheet, Picker, ScrollView, TouchableOpacity, BackHandler, Alert} from 'react-native'
import React, { Component} from 'react'
import {FormInput, FormLabel} from "react-native-elements";
import DatePicker from 'react-native-datepicker'


export default class EditScreen extends Component {
    static navigationOptions = {
        title: 'Edit'
    };

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            packageId: '1',
            package_type: 'mail',
            division: 'dia',
            subject: ' ',
            time: '',
            admin: {
                name: 'Jancsi'
            },
            adress: '',
            city: '',
            zip: '',
            package_comment: '',
            count: '0',
            value: '0',
            weight: '0',
            weight_price: '0',
            extra_price: '0',
            category: 'RXDum',
            delivery_type: 'express',
            invoice: {
                sender: '',
                brutto: '0',
                netto: '0',
                expiry: '0',
                invoice_number: '0',

            },
        }
    }


    submitChange = () => {
        if (this.state.package_type == "invoice") {
            fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices/' + this.state.packageId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",
                },
                body: JSON.stringify({
                    package_type: this.state.package_type,
                    admin: {
                        name: this.state.admin.name,
                    },
                    adress: {
                        adress: this.state.adress,
                        city: this.state.city,
                        zip: Number.parseInt(this.state.zip, 10),
                    },
                    division: this.state.division,
                    package_comment: this.state.package_comment,
                    subject: this.state.subject,
                    time: this.state.time,

                    brutto: Number.parseInt(this.state.invoice.brutto, 10),
                    netto: Number.parseInt(this.state.invoice.netto, 10),
                    expiry: Number.parseInt(this.state.invoice.expiry, 10),
                    invoice_number: this.state.invoice.invoice_number,

                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.navigation.navigate('Main', {})
                    alert(this.state.package_type + " modified")

                }).catch((error) => {
                this.props.navigation.navigate('Main', {})
            })

        } else {
            fetch('https://hidden-dusk-48885.herokuapp.com/api/mails/' + this.state.packageId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",
                },
                body: JSON.stringify({
                    package_type: this.state.package_type,
                    admin: {
                        name: this.state.admin.name,
                    },
                    adress: {
                        adress: this.state.adress,
                        city: this.state.city,
                        zip: Number.parseInt(this.state.zip, 10),
                    },
                   // sender: this.state.invoice.sender,
                    division: this.state.division,
                    package_comment: this.state.package_comment,
                    subject: this.state.subject,
                    time: this.state.time,
                    category: this.state.category,
                    delivery_type: this.state.delivery_type,
                    count: Number.parseInt(this.state.count, 10),
                    weight: Number.parseInt(this.state.weight, 10),
                    value: Number.parseInt(this.state.value, 10),
                    weight_price:Number.parseInt(this.state.weight_price, 10),
                    extra_price:Number.parseInt(this.state.extra_price, 10)

                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.navigation.navigate('Main', {})
                    alert(this.state.package_type + " modified")

                })
                .catch((error) => {
                    this.props.navigation.navigate('Main', {})
                })
        }
    }



    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Alert.alert("Dismiss", 'Are you sure you want to dismiss your changes?',
            [ ,
                {text: 'Cancel',  style: 'cancel'},
                {text: 'Yes', onPress: () => this.props.navigation.goBack(null)}, ] )
        return true;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const basic= this.props.navigation.state.params.ba;
        const ex = this.props.navigation.state.params.ex;
        this.setState ( {
            packageId : basic.packageId,
            package_type: basic.package_type,
            division: basic.division,
            subject: basic.subject,
            time: basic.time,
            admin: {
                name: basic.admin.name
            },
            adress: basic.adress.adress,
            city: basic.adress.city,
            zip:"" + basic.adress.zip,
            package_comment: basic.package_comment,

          })
        if(basic.package_type != "invoice" ) {
             this.setState({
                 count: "" + ex.count,
                 value: "" + ex.value,
                 weight: "" + ex.weight,
                 weight_price:"" + ex.weight_price,
                 extra_price:"" + ex.extra_price,
                 category: ex.category,
                 delivery_type: ex.delivery_type,})
        } else {
           this.setState({
               invoice: {
               sender: ex.sender,
               brutto: "" + ex.brutto,
               netto: "" + ex.netto,
               expiry: "" + ex.expiry,
               invoice_number: ex.invoice_number,}})

            }
        }



 /*   validateNumber = (num) => {
        var reg = /[0-9]+/;
        return reg.test(num);
    }*/


    render() {

        return(
            <ScrollView>

                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Edit mail:
                    </Text>
                </View>

                <Text style = {styles.content}>
                    Package Type:
                </Text>
                <Picker
                    enabled = {false}
                    selectedValue={this.state.package_type}
                    onValueChange={(itemv) => this.setState({package_type: itemv})}
                >
                    <Picker.Item label="packet" value="packet" />
                    <Picker.Item label="invoice" value="invoice" />
                    <Picker.Item label="mail" value="mail" />
                    <Picker.Item label="gazette" value="gazette" />
                </Picker>
                <Text style = {styles.content}>
                    Division:
                </Text>
                <Picker
                    selectedValue={this.state.division}
                    onValueChange={(item) => this.setState({division: item})
                    }

                >
                    <Picker.Item label="Dia" value="Dia" />
                    <Picker.Item label="RX" value="RX" />
                </Picker>
                <Text style = {styles.content}>
                    Admin:
                </Text>
                <Picker
                    selectedValue={this.state.admin.name}
                    onValueChange={(itemv) =>  this.setState({admin:{
                        name:itemv}})}
                >
                    <Picker.Item label="Lilla" value="Lilla" />
                    <Picker.Item label="Jancsi" value="Jancsi" />
                    <Picker.Item label="Peti" value="Peti" />
                    <Picker.Item label="Klára" value="Klára" />
                </Picker>
                <DatePicker
                    style={{width: '100%'}}
                    date={this.state.time}
                    mode="date"
                    placeholder="select date"
                    format=""
                    minDate="1980-01-01"
                    maxDate="2099-12-24"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({time: date})}}
                />
                <Text style = {styles.content}>
                    Subject:
                </Text>
                <TextInput
                    returnKeyType = "go"
                    value = {this.state.subject}
                    editable = {true }
                    style = {styles.textcont}
                    onChangeText = {(itemv) => this.setState({subject: itemv})}
                />
                <View  style = {styles.fontV}>
                    <FormLabel
                        labelStyle = {styles.content}
                    >Address</FormLabel>
                    <FormInput returnKeyType = "go"
                               value = {this.state.city}
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               onChangeText = {(itemv) => this.setState({city: itemv})}/>
                    <FormInput returnKeyType = "go"
                               value = {this.state.zip}
                               keyboardType="numeric"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               onChangeText = {(itemv) => this.setState({zip: itemv})}/>
                    <FormInput returnKeyType = "go"
                               value = {this.state.adress}
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               onChangeText = {(itemv) => this.setState({adress: itemv})}/>

                </View>
                <Text style = {styles.content}>
                    Comment:
                </Text>
                <TextInput
                    value = { this.state.package_comment}
                    editable = {true }
                    maxLength = {40}
                    style = {styles.textcont}
                    onChangeText = {(itemv) => this.setState({package_comment: itemv})}

                />
                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Extra details:
                    </Text>
                </View>
                <Text style = { styles.fontV}>
                    Additional details, according to package type
                </Text>


                {this.state.package_type != 'invoice' && <View>

                    <Text style={styles.content}> Category: </Text>
                    <TextInput
                        returnKeyType="go"
                        value ={this.state.category}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({category: itemv})}

                    />
                    <Picker
                        selectedValue={this.state.delivery_type}
                        onValueChange = {(item) => this.setState({ delivery_type:item})}

                    >
                        <Picker.Item label="normal" value="normal" />
                        <Picker.Item label="express" value="express" />
                    </Picker>
                    <Text style={styles.content}> Count: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        value ={""+ this.state.count}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({count: itemv})}
                    />
                    <Text style={styles.content}> Value: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        value ={"" +this.state.value}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({value: itemv})}

                    />
                    <Text style={styles.content}> Weight: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        value ={"" + this.state.weight}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({weight: itemv})}

                    />
                    <Text style={styles.content}> Weight price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        value ={"" + this.state.weight_price}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({weight_price: itemv})}
                    />
                    <Text style={styles.content}> Extra price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        value ={"" + this.state.extra_price}
                        editable={true}
                        style={styles.textcont}
                        onChangeText = {(itemv) => this.setState({extra_price: itemv})}
                    />
                </View>
                }

                {this.state.package_type == 'invoice' &&
                <View>
                    <Text style={styles.content}> Invoice#: </Text>
                    <TextInput
                        returnKeyType="go"
                        value ={this.state.invoice_number}
                        editable={true}
                        style={styles.textcont}
                        onChangeText={(value) => this.setState({invoice_number:value})}
                    />

                    <Text style={styles.content}> Expiry: </Text>
                    <TextInput
                        returnKeyType="go"
                        value ={"" + this.state.expiry}
                        editable={true}
                        style={styles.textcont}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({expiry:value})}
                    />
                    <Text style={styles.content}> Brutto: </Text>
                    <TextInput
                        returnKeyType="go"
                        value = {"" + this.state.brutto}
                        editable={true}
                        style={styles.textcont}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({brutto:value})}
                    />
                    <Text style={styles.content}> Netto: </Text>
                    <TextInput
                        returnKeyType="go"
                        value ={"" + this.state.netto}
                        editable={true}
                        style={styles.textcont}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({netto:value})}
                    />
                </View>
                }

                <View style = { styles.btnview}>

                    <TouchableOpacity
                        onPress = {
                            () => this.submitChange()
                        }
                        style ={styles.submitbtn}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
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

    submitbtn: {
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