import uuid from 'uuid'
import RNCallKeep from 'react-native-callkeep';
import NavigationServices from 'routes/NavigationServices';
import screenName from 'configs/screenName';
export function openVideoCallScreen(doctor_id) {
    console.log('opening video call screen', { doctor_id })
    NavigationServices.navigate(screenName.DetailAlert, {
        data: { doctor_id }
    })
}
class RNCallKeepManager {

    constructor() {
        this.UUID = false
        this.doctorId = 0
        this.isAppForeground = false
        this.setupCallKeep()
    }

    setIsAppForeGround = value => {
        this.isAppForeground = value
    }

    prepareOpenVideoCall = () => {
        if (!this.isAppForeground) {
            setTimeout(() => {
                openVideoCallScreen(this.doctorId)
            }, 1000)
        } else {
            openVideoCallScreen(this.doctorId)
        }
        this.isAppForeground = false
        console.log('did set isAppForeground to false')
        RNCallKeep.endCall(this.UUID)
    }

    setupCallKeep = () => {
        const options = {
            android: {
                alertTitle: 'Permissions required',
                alertDescription: 'This application needs to access your phone accounts',
                cancelButton: 'Cancel',
                okButton: 'ok',
                imageName: 'ic_launcher',
            }
        };
        RNCallKeep.setup(options);
        // RNCallKeep.setAvailable(true);
        RNCallKeep.addEventListener('answerCall', async () => {
            console.log('press answer, call established!', { isAppForeground: this.isAppForeground })
            this.prepareOpenVideoCall()
        });
        RNCallKeep.addEventListener('endCall', () => {
            console.log('call ended')
            this.isAppForeground = false
        })
    }

    displayIncommingCall = (doctorId) => {
        this.doctorId = doctorId
        this.UUID = uuid.v4()
        console.log('display incomming call', { UUID: this.UUID })
        RNCallKeep.displayIncomingCall(this.UUID, '00000000', 'SHIBA')
    }

    endCall = () => {
        console.log('endCall invoked', { UUID: this.UUID })
        RNCallKeep.endCall(this.UUID)
    }

}

let manager = new RNCallKeepManager()

export default manager