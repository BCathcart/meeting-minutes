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
import {Header} from 'react-native-elements';


export default class NewMeetingScreen extends React.Component {
static navigationOptions = {
  header: null
};

render() {
  const { code } = this.props.navigation.state.params.data;
  return (

    <View style={styles.container}>
    <Header centerComponent={{ text: 'Minitum', style: { fontSize: 25, fontFamily: 'source-sans-pro-regular' }}}
    containerStyle={{
      backgroundColor: '#1995AD'
    }}/>
    <Icon onPress={this._onPressBackButton}
        name='arrow-circle-o-left'
        size={35}
        color='black'
        style={styles.icon}/>

    <Text style={styles.meetingCode}>Your meeting code is: <Text style={{color: 'green'}}> {code} </Text> </Text>
    <Button title="Start Meeting" onPress={this._onPressOkay} style={styles.okayButton}
    icon={
      <Icon name='play' size ={15} color='black'/>
    }
buttonStyle={{
backgroundColor: "#1995AD",
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
  this.props.navigation.navigate('MeetingDialog');
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
    top: 150,
    fontSize: 44,
    fontWeight:'bold',
    fontFamily: 'source-sans-pro-regular',
    alignSelf: 'center',
    textAlign: 'center'
  },
  textNote: {
    position: 'absolute',
    bottom: 350,
    paddingVertical: 20,
    alignSelf: 'center'
  },
  okayButton: {
    position: 'absolute',
    top: 300,
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
