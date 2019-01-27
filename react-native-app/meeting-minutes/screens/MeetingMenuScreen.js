import React from 'react';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
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
      <Header centerComponent={{ text: 'Fish', style: { fontSize: 25, fontWeight: 'bold' }}}
      containerStyle={{
        backgroundColor: '#1995AD'
      }}/>
    <Icon onPress={this._onPressBackButton}
        name='arrow-left'
        size={35}
        color='black'
        style={styles.icon}/>



        <TouchableOpacity onPress={this._onPressNewMeeting} style={styles.continueButton}>
              <Image
                source={require('../assets/images/button_new-meeting.png')}
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
    this.props.navigation.navigate('NewMeeting', {data: {code: generatedCode}});
  }

  _onPressJoinMeeting = () => {
    this.props.navigation.navigate('EnterCode');
  }

  _onPressBackButton = () => {
    this.props.navigation.pop();
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
    bottom: 350,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  setupButton: {
    position: 'absolute',
    bottom: 240,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});
