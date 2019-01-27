import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default class NewMeetingScreen extends React.Component {
static navigationOptions = {
  header: null
};

render() {
  const { code } = this.props.navigation.state.params.data;
  return (

    <View style={styles.container}>

    <Text style={styles.meetingCode}>Your meeting code is: <Text style={{color: 'green'}}> {code} </Text> </Text>

    <TouchableOpacity onPress={this._onPressOkay} style={styles.okayButton}>
    <Image source={require('../assets/images/button_start-meeting.png')} />
    </TouchableOpacity>

    <Text style={styles.textNote}> Share this code to have others join your meeting. </Text>

    </View>
  );
}

_onPressOkay = () => {
  this.props.navigation.navigate('Blah');
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  meetingCode: {
    position: 'absolute',
    top: 100,
    fontSize: 44,
    fontWeight:'bold',
    alignSelf: 'center',
    textAlign: 'center'
  },
  textNote: {
    position: 'absolute',
    bottom: 200,
    paddingVertical: 20,
    alignSelf: 'center'
  },
  okayButton: {
    position: 'absolute',
    bottom: 120,
    paddingVertical: 20,
    alignSelf: 'center',
  }
});
