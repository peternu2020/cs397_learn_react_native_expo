import React, {useState, useRef, useEffect} from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Camera, Permissions } from 'expo';

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';


//export default class CameraPage extends React.Component {
  const CameraApp = () => {
    camera = null;

    /*
    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };
    */
    let [captures,setCaptures] = useState([])
    let [capturing, setCapturing] = useState('null') 
    //let [type, setType] = useState('back')
    let [type, setCameraType] = useState(Camera.Constants.Type.back)
    let [permission, setPermission] = useState('null')
    //let [flash, setFlash] = useState('off')
    let [flash, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    let cameraRef = useRef(null)

   
    handleCaptureIn = () => setCapturing(true);
    
    handleCaptureOut = () => {
        /*
        if (this.state.capturing)
            this.camera.stopRecording();
        */
        if (capturing)
            cameraRef.current.stopRecording();
    };

    handleShortCapture = async () => {
        //const photoData = await this.camera.takePictureAsync();
        const photoData = await cameraRef.current.takePictureAsync();
        //this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        setCapturing(false);
        setCaptures([photoData, ...captures]);
    };

    handleLongCapture = async () => {
        //const videoData = await this.camera.recordAsync();
        const videoData = await cameraRef.current.recordAsync();
        //this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
        setCapturing(false);
        setCaptures([videoData, ...captures]);
    };

    /*
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    */
    
    useEffect(() => {
      (async function anyNameFunction() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
        setPermission(hasCameraPermission);
      })();
    }, []); 

    
        //const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
        /*
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }
        */
        if (permission === null) {
            return <View />;
        } else if (permission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        //type={cameraType} 
                        type = {type}
                        //flashMode={flashMode} 
                        flashMode={flash}
                        style={styles.preview}
                        //ref={camera => this.camera = camera} 
                        ref={cameraRef}
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    //flashMode={flashMode} 
                    flashMode={flash}
                    //cameraType={cameraType} 
                    cameraType = {type}
                    //setFlashMode={this.setFlashMode} 
                    setFlashMode = {setFlashMode}
                    //setCameraType={this.setCameraType} 
                    setCameraType = {setCameraType}
                    //onCaptureIn={this.handleCaptureIn} 
                    onCaptureIn = {handleCaptureIn}
                    //onCaptureOut={this.handleCaptureOut} 
                    onCaptureOut = {handleCaptureOut}
                    //onLongCapture={this.handleLongCapture} 
                    onLongCapture = {handleLongCapture}
                    //onShortCapture={this.handleShortCapture} 
                    onShortCapture = {handleShortCapture}
                />
            </React.Fragment>
        );
};

export default CameraApp;