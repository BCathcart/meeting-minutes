import React from 'react';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class MeetingCodeEnterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
      textValue: ''
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon onPress={this._onPressBackButton}
          name='arrow-left'
          size={50}
          color='black'
          style={styles.icon}/>

        <Text style = {styles.text}>Please enter{"\n"}your meeting{"\n"}code:</Text>

        <Text style = {styles.incorrectCodeText}>{this.state.textValue}</Text>

        <TouchableOpacity onPress={this._onPressEnter} style={styles.enterButton}>
              <Image
                source={require('../assets/images/button_enter.png')}
              />
        </TouchableOpacity>

        <View style={styles.textBox}>
            <TextInput
            style={{fontSize: 44}}
            placeholder="Enter Code..."
            onChangeText={(text) => this.setState({code:text})}
            />
        </View>

      </View>
    );
  }


  _onPressEnter = () => {
    // If nothing entered return
    if (this.state.code == undefined || this.state.code == '')
        return;

    //console.log(this.state.code);
    var db = firebase.database();

    // Check if the code is in the database
    var ref = db.ref('codes').child(this.state.code);
    var childData;
    console.log(ref);
    ref.on('value', function(snapshot) {
        childData = snapshot.val();
        console.log(childData);
    });

    if (childData != null) {
        this.setState({
            textValue: ''
        });
        this.props.navigation.navigate('MeetingDialog');
    } else {
        this.setState({
            textValue: 'Incorrect Code'
        });
        this.props.navigation.navigate('MeetingDialog'); // TODO: remove
    }

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
  text: {
    top: 100,
    color: '#000',
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
  },
  incorrectCodeText: {
    top: 140,
    color: '#cc0000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: "#1995ad",
    textShadowRadius: 20,
  },
  textBox: {
    position: 'absolute',
    fontSize: 44,
    bottom: 260,
    alignSelf: 'center',
    textAlign: 'center',
  },
  enterButton: {
    position: 'absolute',
    bottom: 100,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  }
});
