import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [callId, setCallId] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' , justifyContent: 'center', paddingTop: '35%'}}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Enter Your Name</Text>
                            <TextInput
                                style={styles.inputControl}
                                placeholder='Name'
                                onChangeText={text => setName(text)}
                            />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Enter Your Call Id</Text>
                            <TextInput
                                style={styles.inputControl}
                                placeholder='Caller Id'
                                onChangeText={text => setCallId(text)}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate('CallPage', { data: name, id: callId });
                            }}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Join Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
   
    form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#2B68E6',
        borderColor: '#2B68E6',
        marginHorizontal: 20,
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});
