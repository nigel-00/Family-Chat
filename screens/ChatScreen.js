import React, { useLayoutEffect, useEffect,  useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Avatar } from 'react-native-elements';
import { SafeAreaView, StatusBar } from 'react-native';
import { Platform, TextInput, ScrollView, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import CallTransfer  from "./CallTransfer";


const ChatScreen = ({navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    const goToVideoLogin = () => {
        navigation.navigate('CallTransfer'); 
      };

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title:"Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon2 name="person" size={24} color="white" /> 
            <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                {route.params.chatName}
            </Text>
        </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={navigation.goBack}>
                <Icon name="arrow-left" size={24} color= "white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}
                >
                <TouchableOpacity onPress={goToVideoLogin}>
                <Icon name="video-camera" size={24} color= "white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={goToVideoLogin}>
                <Icon name="phone" size={24} color= "white" />
                </TouchableOpacity>

                </View>
            ),
        });
    },[navigation]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           message: input,
           displayName: auth.currentUser.displayName,
           email: auth.currentUser.email,
           photoURL: auth.currentUser.photoURL
        });
        setInput('');
    };

    useLayoutEffect(() => {
        const unsubscribe  = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
    return unsubscribe   
    }, [route] );

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <StatusBar  style="light"/> 
        <KeyboardAvoidingView
        behavior={Platform.OS  === "ios" ?  "padding": "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView contentContainerStyle={{ paddingTop:15 }}>
            {messages.map(({id,data }) => 
                data.email === auth.currentUser.email ? (

                    <View key={id} style={styles.receiver}>
                    <Avatar
                    position="absolute"
                    containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right:-5,
                    }}
                    bottom={-15}
                    right={-5}
                    rounded
                    size={30}
                    source = {{
                        uri: data.photoURL,
                    }}
                    
                     />
                    <Text style={styles.receiverText}>{data.message}</Text>
                    </View>
                ): (
                    <View key={id} style={styles.sender}>
                    <Avatar 
                        position="absolute"
                    containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right:-5,
                    }}
                    bottom={-15}
                    right={-5}
                    rounded
                    size={30}
                    source = {{
                        uri: data.photoURL,
                    }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                )
            )}

            </ScrollView>

            <View style={styles.footer}> 
            <TextInput 
                value={input} 
                onChangeText= {text => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder = "family chat message" 
                style={styles.TextInput}
                />
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Icon name="send" size={24} color= "#2B68E6" />
                </TouchableOpacity>
            </View>
            </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1, 
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 2,
    },

    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 2,

    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
}); 