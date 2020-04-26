import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlightComponent, Button } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer'; // Docs: https://github.com/michaeljstevens/react-native-stopwatch-timer
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import TomatoSwiper from './components/tomatoSwiper';
import Settings from './components/settings';
import { Audio } from 'expo-av';  // sound library


function Pomodoro(props) {
  const [totalDuration, setTotalDuration] = useState(10000);
  const [timerStart, setTimerStart] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [timerRound, setTimerRound] = useState(0);
  const [isBreak, setIsBreak] = useState(true);
  const [msecsTimeNow, setMsecsTimeNow] = useState(2);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [breakTotalTime, setBreakTotalTime] = useState(10999);
  const [focusTotalTime, setFocusTotalTime] = useState(30999);


 




  let currentTimeinMs = 0;

  const setBreak = () => {
    setTotalDuration(breakTotalTime);
  };

  const setFocus = (back) => {
    setTotalDuration(focusTotalTime);
    console.log(back);
    setTimerRound(back ? timerRound - 1 : timerRound + 1);
  };

  // const getFormattedTime = (time) => {
  //   this.currentTime = time;
  // };

  const toggleTimer = () => {
    setTimerReset(false);
    setTimerStart(!timerStart)
  };

  const resetTimerBack = () => {
    if (!timerReset) {
      // just reset
      setTimerStart(false);
      setTimerReset(true);
    } else {
      // go back
      toggleBreak(true);
    }
  }

  const resetTimer = () => {
    setTimerStart(false);
    setTimerReset(true);
  }

  const toggleBreak = (back) => {
    isBreak ? setFocus(back) : setBreak();
    setIsBreak(!isBreak);
  }

  const handleTimerComplete = () => {
    resetTimer();
    toggleBreak();
    toggleTimer();

    playSound();
  };

  const skipBreak = () => {
    toggleBreak(false);
    resetTimer();
  }

  const showPlayButton = () => {
    if (!timerStart) {
      return <Ionicons style={{ marginLeft: 4 }} name="ios-play" size={80} color="#F3ADAD" />
    } else {
      return <Ionicons name="ios-pause" size={80} color="#F3ADAD" />
    }
  }

  const changeBreakTime = (value) => {
    console.log(value);
    if (value == 'right') {
      skipBreak();
      // setTotalDuration(totalDuration + 1000);
      // setTimerStart(false);
      // setTimerReset(true);
    } else if (value == 'left') {
      resetTimerBack();
      // setTotalDuration(totalDuration - 1000);
      // setTimerStart(false);
      // setTimerReset(true);
    }
  }

  const changeTimeBack = () => {
    setTotalDuration(currentTimeinMs - (currentTimeinMs % 60000) - 59999);
    setTimerStart(false);
    setTimerReset(true);
  }

  const changeTimeForward = () => {
    setTotalDuration(currentTimeinMs - (currentTimeinMs % 60000) + 60999);
    setTimerStart(false);
    setTimerReset(true);
    
  }

  const changeTimeForwardPressOut = () => {
    clearTimeout(timer);
  }

  const getMsecsTimeFunc = (time) => {
    currentTimeinMs = time;
  }

  // Setting Modal functions

  const settingsHandler = (breakTime, focusTime) => {
    setBreakTotalTime(breakTime);
    setFocusTotalTime(focusTime);
    isBreak ? setTotalDuration(breakTotalTime) : setTotalDuration(focusTotalTime);
    setIsSettingsVisible(false);    
    resetTimerBack();
  }

  const onCancelSettings = () => {
    setIsSettingsVisible(false);
  };

  // End of Modal functions

  return (
    
    <View style={styles.container}>
      {console.log(timerReset)}
      <TouchableOpacity style={styles.settingsButton} onPress={() => setIsSettingsVisible(true)}>
        <SimpleLineIcons name="settings" size={30} color="#DDDDDD" />
      </TouchableOpacity>
      <Settings 
        visible={isSettingsVisible} 
        settingHandler={settingsHandler} 
        onCancelSettings={onCancelSettings}
        breakTotalTime={breakTotalTime}
        focusTotalTime={focusTotalTime}
        resetTimerBack={resetTimerBack}
      />
      <View style={styles.pomodoroRoundsContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetTimerBack}>
          <SimpleLineIcons name="arrow-left" size={30} color="#DDDDDD" />
        </TouchableOpacity>
        <View>
          <View style={styles.roundsContainer}>
            <Text style={styles.textRound}>Round</Text>
            <Text style={styles.textRoundNumber}>{timerRound}</Text>
          </View>
          <View>
            <TomatoSwiper changeTimerValue={changeBreakTime} />
          </View>
          <View style={styles.breakTimeContainer}>
            <Text style={styles.textBreak}>{isBreak ? 'Break time' : 'Focus time'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={skipBreak}>
          <SimpleLineIcons name="arrow-right" size={30} color="#DDDDDD" />
        </TouchableOpacity>
      </View>



      <View style={styles.timerContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={changeTimeBack}>
          <SimpleLineIcons name="arrow-left" size={30} color="#DDDDDD" />
        </TouchableOpacity>
        <Timer
          totalDuration={totalDuration}
          start={timerStart}
          reset={timerReset}
          options={options}
          handleFinish={handleTimerComplete}
          getMsecs={getMsecsTimeFunc}
        />
        <TouchableOpacity style={styles.skipButton} onPress={changeTimeForward}>
          <SimpleLineIcons name="arrow-right" size={30} color="#DDDDDD" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={styles.pauseButton} onPress={toggleTimer}>
          {showPlayButton()}
        </TouchableOpacity>

      </View>
    </View>
  );
}



const options = {
  container: {
    alignItems: 'center',
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    width: 250
  },
  text: {
    fontSize: 60,
    fontWeight: '100',
    color: '#D0D0D0',
    marginLeft: 0,
  }
};

const styles = StyleSheet.create({

  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroRoundsContainer: {
    flexDirection: 'row'
  },
  roundsContainer: {
    alignItems: 'center'
  },
  textRound: {
    fontSize: 15,
    fontWeight: '300',
    color: '#9A9A9A'
  },
  textRoundNumber: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: '200',
    color: '#9A9A9A'
  },
  breakTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textBreak: {
    marginTop: 5,
    fontWeight: '200',
    fontSize: 22,
    color: '#9A9A9A'
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonsContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pauseButton: {
    paddingTop: 5,
    paddingLeft: 25,
    alignContent: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E53F3F',
  },
  resetButton: {
    padding: 15,
    justifyContent: 'center',

  },
  skipButton: {
    padding: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F85858'
  },
  buttonPauseText: {
    color: '#FFA5A5',
    fontWeight: '800'
  },
  settingsButton: {
    marginRight: 30,
    alignSelf: 'flex-end',
    color: '#9A9A9A'
  }
});

export default Pomodoro;



