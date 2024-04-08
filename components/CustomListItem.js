import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, Avatar } from 'react-native-elements';
import { auth, db } from "../firebase";
import Icon2 from 'react-native-vector-icons/Ionicons';

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setChatMessages(snapshot.docs.map(doc => doc.data()));
            });
    
        return () => unsubscribe();
    }, [id]); 
    
    return (

        <ListItem
            key={id}
            onPress={() => enterChat(id, chatName)}
            bottomDivider
        >
            {chatMessages?.[0]?.photoURL ? (
                <Avatar
                    rounded
                    source={{ uri: chatMessages[0]?.photoURL }}
                />
            ) : (
                <Icon2 name="person" size={24} color="black" /> 
            )}
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    );
};


export default CustomListItem

const styles = StyleSheet.create({})