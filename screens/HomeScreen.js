import React , {useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import CustomListItem from "../components/CustomListItem";
import { Avatar } from 'react-native-elements';
import { auth, db } from "../firebase";
import Icon from 'react-native-vector-icons/FontAwesome'


const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]); 

    const signOutUser = () => {
        auth.signOut().then(() => {
           navigation.replace("Login") 
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => 
            setChats(
              snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
         )
        );
        return unsubscribe
        }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Family Chat",
            headerStyle: { backgroundColor: "#2B68E6" },
            headerTitleStyle: { color: "white"},
            headerTintColor: "white",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>  
                <Icon name="home" size={24} color="white"/>
                </TouchableOpacity> 
                </View>  
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
                <TouchableOpacity activeOpacity={0.5}>
                <Icon name="camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                <Icon name="pencil" size={24} color="white"/>
                </TouchableOpacity>
                </View>

            ),
        });
    }, [navigation])

    const enterChat = (id, chatName) => {
       navigation.navigate('Chat', { 
        id: id,
        chatName: chatName,
       });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            {chats.map(({id, data: {chatName }}) => (
                <CustomListItem 
                key={id} 
                id={id} 
                chatName={chatName}
                enterChat={enterChat} />
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen 

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})