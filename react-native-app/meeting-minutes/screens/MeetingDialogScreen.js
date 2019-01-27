import React from 'react';
import firebase from 'firebase';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

let count = 0;

export default class MeetingMenuScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    textValue: '',
    dialogArr: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 4}}>
        <ScrollView 
          style={styles.scrollView} 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});
          }}>
          {
            this.state.dialogArr.map(( item, key ) =>
            (
              <View key = { key } style = { styles.item }>
                  <Text style = { styles.item_text_style }>{ item }</Text>
                  <View style = { styles.item_separator }/>
              </View>
            ))
          }
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this._onEndMeeting} style={styles.endButton}>
                <Image
                  source={require('../assets/images/button_end.png')}
                />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onEndMeeting = () => {
    this.state.dialogArr.push("newelement" + count);
    this.setState({
      dialogArr: this.state.dialogArr,
    });

    // var RNFS = require('react-native-fs');
    // // create a path you want to write to
    // var path = RNFS.DocumentDirectoryPath + '/test.html';

    // // write the file
    // RNFS.writeFile(path, '<text>Boys we got him</text>', 'utf8')
    // .then((success) => {
    // console.log('FILE WRITTEN!');
    // })
    // .catch((err) => {
    // console.log(err.message);
    // });

    // this.setState(prevState => ({
    //   dialogArr: [...prevState.dialogArr, newelement]
    // }))
    count++;
    this.props.navigation.navigate('SavePdf');
    console.log(this.state.dialogArr);
  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  scrollView: {
    top: 30,
    bottom: 100,
  },
  endButton: {
    position: 'absolute',
    bottom: 10,
    paddingVertical : 20,
    alignSelf: 'center',
  },
  item_text_style:
  {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    padding: 10
  },
  item_separator:
  {
    height: 1,
    width: '100%',
    backgroundColor: '#263238',
  }
});
