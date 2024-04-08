import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

import RNEEncryptedStorage from 'react-native-encrypted-storage';

function CallPage(props){

    console.log(props.route.params);
    const name = props.route.params.data;
    const id = props.route.params.id;

    return(
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={22001385732}
                appSign={'a5c75de413a0352f3c1768731b916ed1605a7b76d98c2b01f8118aabfc953da6'}
                userID={name} 
                userName={name}
                callID={id} 
                config={{
                    ...GROUP_VIDEO_CALL_CONFIG,
                    onHangUp: () => { props.navigation.navigate('CallTransfer') },
                }}
            />
        </View>
    )
}

export default CallPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});