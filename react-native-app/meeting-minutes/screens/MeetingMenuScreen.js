import React from 'react';
import firebase from 'firebase';
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
    var database = firebase.database();
    var generatedCode = makeid();
    database.ref('codes/' + generatedCode).push({
        stuff: "[]",
  });
    this.props.navigation.navigate('NewMeeting');
  }

  _onPressJoinMeeting = () => {
    this.props.navigation.navigate('EnterCode');
  }

  }
  function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
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
