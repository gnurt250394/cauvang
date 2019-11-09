import React from 'react';
import RNCallKit from 'react-native-callkit';

import uuid from 'uuid';
import { View } from 'react-native';

class CustomCallKeepScreen extends React.Component {
    constructor(props) {

        // Initialise RNCallKit
        let options = {
            appName: 'RNCallKitExample',
            imageName: 'my_image_name_in_bundle',
            ringtoneSound: 'my_ringtone_sound_filename_in_bundle',
        };
        try {
            RNCallKit.setup(options);
        } catch (err) {
            console.log('error:', err.message);
        }

        // Add RNCallKit Events
        // RNCallKit.addEventListener('didReceiveStartCallAction', this.onRNCallKitDidReceiveStartCallAction);
        // RNCallKit.addEventListener('answerCall', this.onRNCallKitPerformAnswerCallAction);
        // RNCallKit.addEventListener('endCall', this.onRNCallKitPerformEndCallAction);
        // RNCallKit.addEventListener('didActivateAudioSession', this.onRNCallKitDidActivateAudioSession);
        // RNCallKit.addEventListener('didDisplayIncomingCall', this.onRNCallKitDidDisplayIncomingCall);
        // RNCallKit.addEventListener('didPerformSetMutedCallAction', this.onRNCallKitDidPerformSetMutedCallAction);
    }

    onRNCallKitDidReceiveStartCallAction = (data) => {
        /*
         * Your normal start call action
         *
         * ...
         *
         */

        let _uuid = uuid.v4();
        RNCallKit.startCall(_uuid, data.handle);
    }

    onRNCallKitPerformAnswerCallAction = (data) => {
        /* You will get this event when the user answer the incoming call
         *
         * Try to do your normal Answering actions here
         *
         * e.g. this.handleAnswerCall(data.callUUID);
         */
    }

    onRNCallKitPerformEndCallAction = (data) => {
        /* You will get this event when the user finish the incoming/outgoing call
         *
         * Try to do your normal Hang Up actions here
         *
         * e.g. this.handleHangUpCall(data.callUUID);
         */
    }

    onRNCallKitDidActivateAudioSession = (data) => {
        /* You will get this event when the the AudioSession has been activated by **RNCallKit**,
         * you might want to do following things when receiving this event:
         *
         * - Start playing ringback if it is an outgoing call
         */
    }

    onRNCallKitDidDisplayIncomingCall = (error) => {
        /* You will get this event after RNCallKit finishes showing incoming call UI
         * You can check if there was an error while displaying
         */
    }

    onRNCallKitDidPerformSetMutedCallAction = (muted) => {
        /* You will get this event after the system or the user mutes a call
         * You can use it to toggle the mic on your custom call UI
         */
    }

    // This is a fake function where you can receive incoming call notifications
    onIncomingCall = () => {
        // Store the generated uuid somewhere
        // You will need this when calling RNCallKit.endCall()
        let _uuid = uuid.v4();
        RNCallKit.displayIncomingCall(_uuid, "886900000000")
    }

    // This is a fake function where you make outgoing calls
    onOutgoingCall = () => {
        // Store the generated uuid somewhere
        // You will need this when calling RNCallKit.endCall()
        let _uuid = uuid.v4();
        RNCallKit.startCall(_uuid, "886900000000")
    }

    // This is a fake function where you hang up calls
    onHangUpCall = () => {
        // get the _uuid you stored earlier
        RNCallKit.endCall(_uuid)
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

export default CustomCallKeepScreen