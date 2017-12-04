
import { View, Text, TextInput, StyleSheet, Picker, ScrollView, TouchableOpacity,  BackHandler} from 'react-native'
import React, { Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Button, FormInput, FormLabel} from "react-native-elements";


export default class AddItemScreen extends Component {
    static navigationOptions = {
        title: 'AddItem'
    };
        constructor(states) {
            super(states);
            this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
            this.state = {
                package_type: 'mail',
                division: 'dia',
                subject: ' ',
                time: '',
                admin : {
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
                sender: '',
                invoice: {
                brutto: '0',
                netto: '0',
                expiry: '0',
                invoice_number: '0',

            }
        }
        }

        isValidMail = () => {
            var v = this.state;
            if (v.subject.length > 0 && v.adress.length > 0 && v.city.length > 0 && ("" + v.zip).length > 0 &&
                v.category.length > 0 ) {
                return true
            }else {
                return false
            }

        }

    isValidInv = () => {
        var v = this.state;
        if (v.subject.length > 0 && v.adress.length > 0 && v.city.length > 0 && ("" + v.zip).length > 0 &&
            v.brutto > 0 && v.netto > 0 && v.expiry > 0 && v.invoice_number.length > 0) {
            return true
        }else {
            return false
        }

    }

    focusPackType = (value) => {
        this.setState({package_type: value})
        this.subref.focus();
    }

    setComment =(value) => ({

})
    submitChange =() => {
        var t = this.props.navigation.state.params.t;
        var v = this.state;
        if (this.state.package_type == "invoice") {
            if (this.isValidInv()) {
                fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices', {
                    method: 'POST',
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
                        brutto: Number.parseInt(this.state.brutto, 10),
                        netto: Number.parseInt(this.state.netto, 10),
                        expiry: Number.parseInt(this.state.expiry, 10),
                        invoice_number: this.state.invoice_number,
                    })
                }).then(res => res.json())
                    .then((res) => {
                        this.props.navigation.navigate('Main', {})
                        alert(this.state.package_type + " added")

                    })
                    .catch((error) => {
                        alert("Please fill the inputs correctly")
                    })
            } else {
                alert("Pleas fill the inputs correctly");
            }

        } else {
            if (this.isValidMail()) {
                fetch('https://hidden-dusk-48885.herokuapp.com/api/mails', {
                    method: 'POST',
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
                      //  sender: this.state.sender,
                        category: this.state.category,
                        delivery_type: this.state.delivery_type,
                        count: Number.parseInt(this.state.count, 10),
                        weight: Number.parseInt(this.state.weight, 10),
                        value: Number.parseInt(this.state.value, 10),
                        weight_price: Number.parseInt(this.state.weight_price, 10),
                        extra_price: Number.parseInt(this.state.extra_price, 10)

                    })
                }).then(res => res.json())
                    .then((res) => {
                        this.props.navigation.navigate('Main', {})
                        alert(this.state.package_type + " added")

                    })
                    .catch((error) => {
                        alert("Please fill the inputs correctly")
                    })

            } else {
                alert("Pleas fill the inputs correctly");
            }

        }
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {

        this.props.navigation.navigate('Main', {})
        return true;
    }


    render() {
    /*    RenderExtra = (state) => {
            const Type = this.state.type;
            if(type == "Package"){
                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Adding a {type}
                    </Text>
                </View>


            }
        }*/
    const selected = this.state;
        return(
            <ScrollView style = {{flex: 1}}>

                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Adding new mail:
                    </Text>
                </View>

                <Text style = {styles.content}>
                    Package Type:
                </Text>
                <Picker
                    selectedValue={selected.package_type}
                    onValueChange = { (itemv) => this.setState({package_type: itemv})}
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
                    onValueChange = {(item) => this.setState({

                        division:item})}

                >
                    <Picker.Item label="Dia" value="Dia" />
                    <Picker.Item label="RX" value="RX" />
                </Picker>
                <Text style = {styles.content}>
                    Admin:
                </Text>
                <Picker
                    selectedValue={this.state.admin.name}
                    onValueChange={(itemv) => this.setState({admin:{
                        name:itemv}})}
                >
                    <Picker.Item label="Lilla" value="Lilla" />
                    <Picker.Item label="Jancsi" value="Jancsi" />
                    <Picker.Item label="Klára" value="Klára" />
                    <Picker.Item label="Peti" value="Peti" />
                </Picker>
                <Text style = {styles.content}>
                    Time:
                </Text>
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
                    inputRef = {(r) => {this.subref = r}}
                    returnKeyType = "go"
                    placeholder = "Subject goes here"
                    editable = {true }
                    style = {styles.textcont}
                    onChangeText = {(itemv) => this.setState({subject: itemv})}
                    onSubmitEditing={() => { this.cit.focus() }}
                />

                <View  style = {styles.fontV}>
                    <FormLabel
                        labelStyle = {styles.content}
                    >Address</FormLabel>
                    <FormInput returnKeyType = "go"
                               placeholder = "City"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               ref={(item) => { this.cit = item }}
                               onSubmitEditing={() => { this.zi.focus() }}
                               onChangeText = {(itemv) => this.setState({city: itemv})}/>
                    <FormInput returnKeyType = "go"
                               placeholder = "Zip"
                               keyboardType="numeric"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               ref={(item) => { this.zi = item }}
                               onSubmitEditing={() => { this.ad.focus() }}
                               onChangeText = {(itemv) => this.setState({zip: itemv})}/>
                    <FormInput returnKeyType = "go"
                               placeholder = "Address"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               ref={(item) => { this.ad = item }}
                               onSubmitEditing={() => { this.com.focus() }}
                               onChangeText = {(itemv) => this.setState({adress: itemv})}/>
                </View>
                <Text style = {styles.content}>
                    Comment:
                </Text>
                <TextInput
                    placeholder = "Comment goes here"
                    editable = {true }
                    maxLength = {40}
                    style = {styles.textcont}
                    onChangeText={(value) => this.setState({package_comment:value})}
                    ref={(item) => { this.com = item }}

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
                    <Picker
                        selectedValue={this.state.delivery_type}
                        onValueChange = {(item) => this.setState({ delivery_type:item})}

                    >
                        <Picker.Item label="normal" value="normal" />
                        <Picker.Item label="express" value="express" />
                    </Picker>
                    <Text style={styles.content}> Category: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder="Category goes here"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.cat = item }}
                        onSubmitEditing={() => { this.cou.focus() }}
                        onChangeText={(value) => this.setState({category:value})}
                    />

                    <Text style={styles.content}> Count: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder="Count"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.cou = item }}
                        onSubmitEditing={() => { this.val.focus() }}
                        onChangeText={(value) => this.setState({count:value})}

                    />
                    <Text style={styles.content}> Value: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder="Value goes here"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.val = item }}
                        onSubmitEditing={() => { this.we.focus() }}
                        onChangeText={(value) => this.setState({value:value})}

                    />
                    <Text style={styles.content}> Weight: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder="Weight goes here"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.we = item }}
                        onSubmitEditing={() => { this.wep.focus() }}
                        onChangeText={(value) => this.setState({weight:value})}

                    />
                    <Text style={styles.content}> Weight price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder="Weight price goes here:"
                        editable={true}
                        ref={(item) => { this.wep = item }}
                        onSubmitEditing={() => { this.ep.focus() }}
                        style={styles.textcont}
                        onChangeText={(value) => this.setState({weight_price:value})}

                    />
                    <Text style={styles.content}> Extra price: </Text>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="go"
                        placeholder="Extra price goes here"
                        ref={(item) => { this.ep = item }}
                        onSubmitEditing={  () => this.submitChange()}
                        editable={true}
                        style={styles.textcont}
                        onChangeText={(value) => this.setState({extra_price:value})}

                    />
                </View>
                }

                {this.state.package_type == 'invoice' &&
                <View>

                    <Text style={styles.content}> Invoice#: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder="Invoice# goes here:"
                        editable={true}
                        style={styles.textcont}
                        onSubmitEditing={() => { this.ex.focus() }}
                        onChangeText={(value) => this.setState({invoice_number:value})}

                    />
                    <Text style={styles.content}> Expiry: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder="Expiry goes here"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.ex = item }}
                        onSubmitEditing={() => { this.br.focus() }}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({expiry:value})}
                        />
                    <Text style={styles.content}> Brutto: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder="Brutto price goes here:"
                        editable={true}
                        ref={(item) => { this.br = item }}
                        onSubmitEditing={() => { this.net.focus() }}
                        style={styles.textcont}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({brutto:value})}

                    />
                    <Text style={styles.content}> Netto: </Text>
                    <TextInput
                        returnKeyType="go"
                        placeholder="Netto price goes here"
                        editable={true}
                        style={styles.textcont}
                        ref={(item) => { this.net = item }}
                        onSubmitEditing={ () => this.submitChange()}
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({netto:value})}
                    />

                    </View>
                }
                <View style = {styles.fontV}>
                    <Button
                        containerViewStyle = {{paddingTop: 10}}
                        large
                        icon={{name: 'note-add'}}
                        title='Submit'
                        backgroundColor ="#e74c3c"
                        onPress = {
                            () => this.submitChange()
                        }
                    />
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
