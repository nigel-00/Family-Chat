import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";
import Icon2 from 'react-native-vector-icons/Ionicons';
import Logo from '../components/famchat.png'


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribed;
    }, []);

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    }
    return (
        <KeyboardAvoidingView behavior="padding" style ={styles.container }>
        <StatusBar style="light"/>
        <Image source={Logo} style={{ width: 200, height: 200 }} />
       

        <View style={styles.inputContainer}>
        <Input 
        placeholder="Email" 
        autoFocus 
        type="Email" 
        value={email} 
        onChangeText={text => setEmail(text)}/>

        <Input 
        placeholder="Password" 
        secureTextEntry 
        type="password"
        value={password}
        onChangeText={text => setPassword(text)}
        onSubmitEditing={signIn}
        />
        </View>
        <Button containerStyle={styles.button} onPress={signIn} title="Login" />
        <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register" />

        </KeyboardAvoidingView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        backgroundColor: "white",

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,

    },

    });