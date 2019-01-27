import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
<<<<<<< HEAD
import {Button} from 'react-native-elements';
=======
import {Header} from 'react-native-elements';
>>>>>>> 072ee86d6c50e016aeaa4a241ef1cb1cbd62b4e5


export default class NewMeetingScreen extends React.Component {
static navigationOptions = {
  header: null
};

render() {
  const { code } = this.props.navigation.state.params.data;
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

    <Text style={styles.meetingCode}>Your meeting code is: <Text style={{color: 'green'}}> {code} </Text> </Text>
    <Button title="Start Meeting"
    icon={
      <Icon name='group' size ={15} color='white'/>
    }
buttonStyle={{
backgroundColor: "rgba(92, 99,216, 1)",
width: 300,
height: 45,
borderWidth: 0,
borderRadius: 5}}
/>
    <TouchableOpacity onPress={this._onPressOkay} style={styles.okayButton}>
    <Image source={require('../assets/images/button_start-meeting.png')} />
    </TouchableOpacity>
    <Button title="Start Meeting"
    icon={
      <Icon name='group' size ={15} color='white'/>
    }
buttonStyle={{
backgroundColor: "rgba(92, 99,216, 1)",
width: 300,
height: 45,
borderWidth: 0,
borderRadius: 5}}
/>

    <Text style={styles.textNote}> Share this code to have others join your meeting. </Text>

    </View>
  );
}

_onPressOkay = () => {
  this.props.navigation.navigate('Blah');
}
_onPressBackButton = () => {
  this.props.navigation.pop();
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
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});
