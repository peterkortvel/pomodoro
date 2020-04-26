import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { formatTimeString } from 'react-native-stopwatch-timer/lib/utils'


const Settings = props => {
    const [breakTotalTime, setBreakTotalTime] = useState(props.breakTotalTime);
    const [focusTotalTime, setFocusTotalTime] = useState(props.focusTotalTime);

    const updateHandler = () => {
        props.resetTimerBack();
        props.settingHandler(breakTotalTime,focusTotalTime);
    };

    const timeFocusAdd = (focusAdd) => {
        focusAdd ? setFocusTotalTime(focusTotalTime - (focusTotalTime % 60000) + 60000) : setFocusTotalTime(focusTotalTime  - (focusTotalTime % 60000) - 60000);
    };

    const timeBreakAdd = (breakAdd) => {
        breakAdd ? setBreakTotalTime(breakTotalTime  - (breakTotalTime % 60000) + 60000) : setBreakTotalTime(breakTotalTime  - (breakTotalTime % 60000)  - 60000);
    };

    return (
        <Modal
            visible={props.visible}
            animationType='slide'
        >
            <View style={styles.container}>
                <Text style={styles.textBreak}>Focus Time</Text>
                <View style={styles.timeContainer}>
                    <TouchableOpacity style={styles.resetButton} onPress={() => timeFocusAdd(false)}>
                        <SimpleLineIcons name="arrow-left" size={25} color="#DDDDDD" />
                    </TouchableOpacity>
                        <Text style={styles.timeText}>
                            {formatTimeString(focusTotalTime, false)}
                        </Text>
                    <TouchableOpacity style={styles.skipButton} onPress={() => timeFocusAdd(true)}>
                        <SimpleLineIcons name="arrow-right" size={25} color="#DDDDDD" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textBreak}>Break Time</Text>
                <View style={styles.timeContainer}>
                    <TouchableOpacity style={styles.resetButton} onPress={() => timeBreakAdd(false)}>
                        <SimpleLineIcons name="arrow-left" size={25} color="#DDDDDD" />
                    </TouchableOpacity>
                        <Text style={styles.timeText}>
                        {formatTimeString(breakTotalTime, false)}
                        </Text>
                    <TouchableOpacity style={styles.skipButton} onPress={() => timeBreakAdd(true)}>
                        <SimpleLineIcons name="arrow-right" size={25} color="#DDDDDD" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsWrapper}>
                    <View style={styles.button}>
                        <Button title="UPDATE" onPress={updateHandler} />
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeContainer: {
        flexDirection: 'row'
    },
    timeText: {
        fontWeight: '200',
        fontSize: 40,
        color: '#9A9A9A'
    },
    textBreak: {
        marginTop: 5,
        fontWeight: '200',
        fontSize: 22,
        color: '#9A9A9A'
     },

});

export default Settings;