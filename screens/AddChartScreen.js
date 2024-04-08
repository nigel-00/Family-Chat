import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import Icon from  "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";

const AddChatScreen = ({navigation}) => {
    const [ input, setInput ] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });

    } , [navigation]);

    const createChat = async () => {
        await db
        .collection('chats')
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter the name of your chat" 
                value={input} 
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                <Icon name="comments" size={24} color="black" />
                }

            />
        <Button 
        disabled={!input}
        buttonStyle={styles.button}
        onPress={createChat}
        title="Create new Chat"/>
        </View>
    );
};
export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
    button: {
        backgroundColor: "#2B68E6",
        marginTop: 20,
    
    },

});