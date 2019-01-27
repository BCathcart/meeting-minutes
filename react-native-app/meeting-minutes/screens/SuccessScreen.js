import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { getReminderAsync } from 'expo/build/Calendar';

export default class SuccessScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    return (
      <View onPress={this._onEndMeeting} style={styles.container}>
        <Text style = {styles.textStyle}>SUCCESS!</Text>
      </View>
    );
  }

  _onEndMeeting = () => {
        this.state.dialogArr.push("newelement" + count);
        this.setState({
        dialogArr: this.state.dialogArr,
        });
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#008000',
  }
});
