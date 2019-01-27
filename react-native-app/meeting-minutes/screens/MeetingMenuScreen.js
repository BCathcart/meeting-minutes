import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default class MeetingMenuScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this._onPressNewMeeting} style={styles.continueButton}>
              <Image
                source={require('../assets/images/button_setup-meeting.png')}
              />
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onPressJoinMeeting} style={styles.setupButton}>
              <Image
                source={require('../assets/images/button_join-meeting.png')}
              />
        </TouchableOpacity>

      </View>
    );
  }

  _onPressNewMeeting = () => {
    this.props.navigation.navigate('NewMeeting');
  }

  _onPressJoinMeeting = () => {

  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  continueButton: {
    position: 'absolute',
    bottom: 250,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  setupButton: {
    position: 'absolute',
    bottom: 120,
    paddingVertical : 20,
    alignSelf: 'center',
  }
});
