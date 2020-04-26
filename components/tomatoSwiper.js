import React, {Component} from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
 
class TomatoSwiper extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    };
  }
 
  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }
 
  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }
 
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
 
  render() {
 
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.props.changeTimerValue('left')}
        onSwipeRight={(state) => this.props.changeTimerValue('right')}
        config={config}
        >
        {/* <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text> */}
        <Image
           style={styles.imageTomato}
           source={require('../assets/images/pomodoro.png')}
         />
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  imageTomato: {
    width:270, 
    height:300,
    transform: [{ rotate: '0deg' }]
  }
});
 
export default TomatoSwiper;