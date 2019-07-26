import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school_pridictions: [],
            loading_getSchools: false,
            isModalVisible: false,
            school_id: '',
            school: 'SCHOOL',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            loading: false,
            camera: false,
            avatarSource: null,
            image: null,


        };
    }

    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.container}>


                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.lowerContainer}>
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', backgroundColor: 'transparent', marginTop: height(5) }}>
                            <Image source={images.icon} style={styles.logo} />
                            <View style={[styles.txtContainer, {}]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(3.5),color:colors.Offeeblue }]}>Sign Up</Text>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), fontWeight: 'normal' }]}>ALREADY HAVE AN ACCOUNT? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: colors.Offeeblue, fontWeight: 'normal' }]}>LOGIN!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='gray' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Full Name'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='email' color='gray' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Email'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='gray' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Password'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={[styles.TxtInput, { width: width(66) }]}
                                />
                                <TouchableOpacity>
                                    <Icon name='eye' color='rgb(217,217,217)' size={totalSize(2)} type='font-awesome' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='gray' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Confirm Password'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={[styles.TxtInput, { width: width(66) }]}
                                />
                                <TouchableOpacity>
                                    <Icon name='eye' color='rgb(217,217,217)' size={totalSize(2)} type='font-awesome' />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row', width: width(80), height: height(8), justifyContent: 'flex-start', backgroundColor: 'transparent', marginVertical: 0 }]}>
                                <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: colors.Offeeblue }]}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(1), color: 'white', marginHorizontal: 5, marginVertical: 4 }]}>Upload Image</Text>
                                </TouchableOpacity>
                                <View style={{ width: width(2) }}></View>
                                {
                                    this.state.image === null ?
                                        <Text style={[styles.instructions, { fontSize: totalSize(1), color: 'rgb(217,217,217)' }]}>No file selected</Text>
                                        :
                                        <Image source={this.state.image} style={{ height: totalSize(5), width: totalSize(5) }} />
                                }
                            </View>
                            <View style={styles.btnContainer}>

                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('login')}>
                                    {
                                        this.state.loading === true ?
                                            <ActivityIndicator size={'small'} color='white' />
                                            :
                                            <View style={styles.btnTxtContainer}>
                                                <Text style={styles.btnTxt}>Signup</Text>
                                            </View>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default SignUp;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)'

    },
    searchContainer: {
        width: width(90),
        height: height(6),
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        marginVertical: height(1),
        borderRadius: 25,
        flexDirection: 'row'
    },

    TxtInput: {
        width: width(70),
        height: height(6),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'red',
        fontSize: totalSize(1.5),
        //color: 'rgb(217,217,217)'
        //color: 'rgb(180,210,53)',
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgb(245,245,238)',
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
        //marginTop: height(10)
    },
    logo: {
       // marginVertical: height(1),
        height: totalSize(20),
        width: totalSize(12.5)
    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginVertical: height(3)
        marginVertical: height(1),
    },
    welcome: {
        fontSize: totalSize(5),
        //textAlign: 'center',
        //margin: 10,
        color: 'rgb(66,67,69)',
        fontWeight: 'bold',
        //opacity: 0.6
    },
    instructions: {
        fontSize: totalSize(2),
        textAlign: 'center',
        color: 'rgb(66,67,69)',
        //color: 'rgb(217,217,217)',
        //marginBottom: 5,
    },
    btnTxtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: totalSize(2),
        color: 'white',
    },


    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'black'
    },
    InputContainer: {
        flexDirection: 'row',
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
       // backgroundColor: 'white',
        marginTop: height(1),
        //elevation: 2.5,
        borderRadius: 2.5,
        //marginVertical: height(1),
        borderWidth: 1,
        //borderColor: 'rgb(180,210,53)'
        borderColor: colors.Offeeblue

    },
    button: {
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: colors.Offeeblue,
        marginVertical: height(5),
        elevation: 2.5,
        borderRadius: 2.5,

    },
    buttonSmall: {
        //width: width(15),
        //height: height(3),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(66,67,69)',
        //marginVertical: height(1),
        borderRadius: 2
    },
    PickerStyle: {
        width: width(75),
        height: height(8),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'white',
        fontSize: totalSize(2.5),
        color: 'rgb(66,67,69)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
});
