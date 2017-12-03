import { View, Text, TextInput, StyleSheet, Picker, ScrollView, TouchableOpacity, FlatList, BackHandler} from 'react-native'
import React, { Component} from 'react'
import DatePicker from 'react-native-datepicker'
import { StackNavigator} from 'react-navigation';
import {Button, ListItem, FormLabel, FormInput, FormValidationMessage} from "react-native-elements";


export default class SearchScreen extends Component {
    static navigationOptions ={
        title: 'Search'
    };

    constructor(states) {
        super(states);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            formValid: true,
            data: [],
            packageId: '',
            package_type: '',
            division: '',
            subject: ' ',
            fromDate: '',
            toDate: '',
            admin: {
                name: ''
            },

                adress: '',
                city: '',
                zip: '',

            package_comment: '',
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

    goToInDet = (item, i) => {
        fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices/' + item.packageId)
            .then(res => res.json())
            .then(res => {
                i.sender = res.sender;
                i.netto = res.netto;
                i.brutto = res.brutto;
                i.expiry = res.expiry;
                i.invoice_number = res.invoice_number;
                this.props.navigation.navigate('Details', {mail: res, ex: i})
            })

    }



    goToMaDet = (item, i) => {
        fetch('https://hidden-dusk-48885.herokuapp.com/api/mails/' + item.packageId)
            .then(res => res.json())
            .then(res => {
                i.weight = res.weight;
                i.category = res.category;
                i.count = res.count;
                i.weight_price = res.weight_price;
                i.value = res.value;
                i.extra_price = res.extra_price;
                i.delivery_type = res.delivery_type;
                this.props.navigation.navigate('Details', {mail: res, ex: i})
            })
    }

    deleteCheck = (item) => {
        Alert.alert( 'Delete', 'Are you sure you want to delete this item?',
            [ ,
                {text: 'Cancel',  style: 'cancel'},
                {text: 'Yes', onPress: () => this.deleteItem(item)} ] )
    }

    deleteItem = (item) => {
        var t = this.props.navigation.state.params.t;
        if(item.package_type == 'invoice'){
            fetch('https://hidden-dusk-48885.herokuapp.com/api/invoices/' + item.packageId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",
                },

            })
        } else {
            fetch('https://hidden-dusk-48885.herokuapp.com/api/mails/' + item.packageId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    kiskapu: "alma",

                },
            })
        }


    }



    navDet = (item) => {
        if(item.package_type == 'invoice' ) {
            this.goToInDet(item, this.state.dataExIn);


        } else {
            this.goToMaDet(item, this.state.dataExMa);
        };

    }

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

    search = () => {
            this.state.data = [];
            fetch('https://hidden-dusk-48885.herokuapp.com/api/packages/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    package_comment : this.state.package_comment,
                    package_type : this.state.package_type,
                    packageId : Number.parseInt(this.state.packageId, 10),
                    subject : this.state.subject,
                    admin: {name: this.state.admin.name},
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                    division: this.state.division,
                    adress: {
                        adress: this.state.adress,
                        city: this.state.city,
                        zip: Number.parseInt(this.state.zip, 10),
                    }
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        data: this.state.page === 1 ? res.content : [...this.state.data, ...res.content],

                    })
                })

    }

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

    render() {
        return (
            <ScrollView style = {styles.View}>

                <View style = {styles.fontV}>
                    <Text style = {styles.font}>
                        Search
                    </Text>
                </View>
                <View  style = {styles.fontV}>
                    <FormLabel
                        labelStyle = {styles.content}
                       >PackageId</FormLabel>
                    <FormInput returnKeyType = "go"
                               keyboardType="numeric"
                               placeholder = "Search for packageId (unique = only 1)"
                               editable = {true }
                               containerStyle = {styles.textcont}
                               onChangeText = {(itemv) => this.setState({packageId: itemv})}/>


                <Text style = {styles.content}>
                    Package Type:
                </Text>
                <Picker
                    selectedValue={this.state.package_type}
                    style = {styles.textcont}
                    onValueChange = { (itemv) => this.setState({package_type: itemv})}
                >
                    <Picker.Item label="Choose" value="" />
                    <Picker.Item label="packet" value="packet" />
                    <Picker.Item label="invoice" value="invoice" />
                    <Picker.Item label="mail" value="mail" />
                    <Picker.Item label="gazette" value="gazette" />
                </Picker>


                    <FormLabel
                        labelStyle = {styles.content}
                    > Subject:</FormLabel>
                    <FormInput  returnKeyType = "go"
                                placeholder = "Subject goes here"
                                editable = {true }
                                containerStyle = {styles.textcont}
                                onChangeText = {(itemv) => this.setState({subject: itemv})}/>

                <Text style = {styles.content}>
                    Time:
                </Text>
                <DatePicker
                    style={ styles.textcont}
                    containerStyle = {styles.textcont}
                    date={this.state.fromDate}
                    mode="date"
                    placeholder="From (date)"
                    format=""
                    onOpenModal = {() => {this.setState({fromDate: ''})}}
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
                    onDateChange={(date) => {this.setState({fromDate: date})}}
                />
                <DatePicker
                    style={styles.textcont}
                    containerStyle = {styles.textcont}
                    date={this.state.toDate}
                    mode="date"
                    placeholder="To (date)"
                    format=""
                    minDate="1980-01-01"
                    maxDate="2099-12-24"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onOpenModal = {() => {this.setState({toDate: ''})}}
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
                    onDateChange={(date) => {this.setState({toDate: date})}}
                />


                    <FormLabel
                        labelStyle = {styles.content}
                    >Address</FormLabel>
                    <FormInput returnKeyType = "go"
                               placeholder = "City"
                               editable = {true }
                               containerStyle = {styles.textcont}
                               onChangeText = {(itemv) => this.setState({city: itemv})}/>
                    <FormInput returnKeyType = "go"
                               placeholder = "Zip"
                               keyboardType="numeric"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               onChangeText = {(itemv) => this.setState({zip: itemv})}/>
                    <FormInput returnKeyType = "go"
                               placeholder = "Address"
                               editable = {true }
                               containerStyle = {styles.textcont
                               }
                               onChangeText = {(itemv) => this.setState({adress: itemv})}/>




                <Text style = {styles.content}>
                    Division:
                </Text>
                <Picker
                    selectedValue={this.state.division}
                    style = {styles.textcont}
                    onValueChange = {(item) => this.setState({

                        division:item})}

                ><Picker.Item label="Choose" value="" />
                    <Picker.Item label="Dia" value="Dia" />
                    <Picker.Item label="RX" value="RX" />
                </Picker>
                <Text style = {styles.content}>
                    Admin:
                </Text>
                <Picker
                    selectedValue={this.state.admin.name}
                    style = {styles.textcont}
                    onValueChange={(itemv) => this.setState({admin:{
                        name:itemv}})}
                >
                    <Picker.Item label="Choose" value="" />
                    <Picker.Item label="Lilla" value="Lilla" />
                    <Picker.Item label="Jancsi" value="Jancsi" />
                    <Picker.Item label="Klára" value="Klára" />
                    <Picker.Item label="Peti" value="Peti" />
                </Picker>

                <Text style = {styles.content}>
                    Comment:
                </Text>
                <TextInput
                    placeholder = "Comment goes here"
                    editable = {true }
                    maxLength = {40}
                    style = {styles.textcont}
                    onChangeText={(value) => this.setState({package_comment:value})}

                />

                    <Button
                        disabled = {!this.state.formValid}
                        containerViewStyle = {{paddingTop: 10}}
                        large
                        icon={{name: 'search'}}
                        title='Search'
                        backgroundColor ="#3498db"
                        onPress = {() => (this.search())}
                    />

                    <Text style = {styles.font}> Összesen {this.state.data.length} találat</Text>
                </View>

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
        onEndReachedThreshold={200}
        />

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
        backgroundColor:'#3498db',
        width : '90%'
    },

    content: {
        paddingTop: 5,

    },
    View: {

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
        borderRadius: 5,
    },


    fontV: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
