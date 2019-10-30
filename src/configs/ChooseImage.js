import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Chọn Ảnh',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const ChooseImage = () => {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                reject()
                console.log('User cancelled image picker');
            } else if (response.error) {
                reject()
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                reject()
                console.log('User tapped custom button: ', response.customButton);
            } else {
                resolve(response.uri)

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            }
        });
    })
}
export default ChooseImage