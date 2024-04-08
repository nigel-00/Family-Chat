import React, {useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View, StatusBar } from 'react-native'
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from "../firebase";
import Icon2 from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login",
        });
     }, [navigation]);

    const register = () => {
       auth.createUserWithEmailAndPassword(email, password)
       .then(authUser => {
        authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl  || <Icon2 name="person" size={24} color="black" />, 
    });
       })
       .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light"/>

        <Text h3 style={{marginBottom: 50}}>Create an account</Text>

        <View style={styles.inputContainer}>
        <Input
            placeholder='Full Name'
            autoFocus
            type='text'
            value={name}
            onChangeText={(text) => setName(text)}
        />

        <Input
            placeholder='Email'
            type='email'
            value={email}
            onChangeText={(text) => setEmail(text)}
        />

        <Input
            placeholder='Password'
            secureTextEntry
            type='password'
            value={password}
            onChangeText={(text) => setPassword(text)}
        />

        <Input
            placeholder='Profile Picture URL (optional)'
            type='text'
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
        />
        </View>
        <Button 
        containerStyle={styles.button}
        raised
        onPress={register} 
        title="Register"/>
        <View style={{ height: 100  }} />
        </KeyboardAvoidingView>
    )

}

export default RegisterScreen 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    },
});