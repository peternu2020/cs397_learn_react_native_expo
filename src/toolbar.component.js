
import React from 'react';
import { Camera } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import styles from './styles';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({ 
    capturing = false, 
    cameraType = CameraTypes.back, 
    //cameraType = back,
    flashMode = CameraFlashModes.off, 
    //flashMode = off,
    setFlashMode, setCameraType, 
    onCaptureIn, onCaptureOut, onLongCapture, onShortCapture, 
}) => (
    <Grid style={styles.bottomToolbar}>
        <Row>
            <Col style={styles.alignCenter}>
                <TouchableOpacity onPress={() => setFlashMode( 
                    flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                    //flashMode === CameraFlashModes.on ? off : on
                )}>
                    <Ionicons
                        name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'}
                        // name={flashMode == on ? "md-flash" : 'md-flash-off'}
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
            </Col>
            <Col size={2} style={styles.alignCenter}>
                <TouchableWithoutFeedback
                    onPressIn={onCaptureIn}
                    onPressOut={onCaptureOut}
                    onLongPress={onLongCapture}
                    onPress={onShortCapture}>
                    <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                        {capturing && <View style={styles.captureBtnInternal} />}
                    </View>
                </TouchableWithoutFeedback>
            </Col>
            <Col style={styles.alignCenter}>
                <TouchableOpacity onPress={() => setCameraType(
                    cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                    //cameraType === CameraTypes.back ? front : back
                )}>
                    <Ionicons
                        name="md-reverse-camera"
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
            </Col>
        </Row>
    </Grid>
);