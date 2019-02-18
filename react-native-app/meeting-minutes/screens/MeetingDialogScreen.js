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
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { checkForUpdateAsync } from 'expo/build/Updates/Updates';

// Variables used to create the pdf
let count = 0;

let htmlStart = "<html lang=\"en\"> \
<head>\
<title>Page Title</title>\
<meta charset=\"UTF-8\">\
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\
<style>\
body {\
  font-family: Arial;\
  margin: 0;\
}\
.header {\
  padding: 10px;\
  text-align: center;\
  background: #1abc9c;\
  color: white;\
  font-size: 30px;\
}\
.content {padding:20px;}\
</style>\
</head>\
<body>\
<div class=\"header\">\
  <h1>Meeting Transcription</h1>\
</div>\
<div class=\"content\">";

let htmlDialog = '';

let htmlEnd = "</body></html>";


// Real-time Firebase read variables
var currentTranscript = "";
var oldTranscript = "";

// Update this count every time Firebase updates with a new child
let currentDialogCount = 0;
let oldDialogCount = 0;


export default class MeetingMenuScreen extends React.Component {

  static navigationOptions = {
    header: null
  };
  
  componentWillMount() {
    // const { code } = this.props.navigation.state.params.data;
  
    // var db = firebase.database();

    // // Check if the code is in the database
    // var ref = db.ref('codes').child("code");
    // var childData;

    // // Attach an asynchronous callback to read the data at our posts reference
    // ref.on("value", function(snapshot) {
    //   console.log("REAL TIME FIREBASE READ");
    //   _onGetDialog();
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
  }

  constructor() {
    super();

    this._check = this._check.bind(this);

    this.state = {
      textValue: '',
      dialogArr: [],
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 5}}>
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
        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="Get Dialog"  onPress={this._onGetDialog} style={styles.endButton}
          icon={
            <Icon name='bell' size={15} color='black'/>
          }
          buttonStyle={{
          backgroundColor: "#1995AD",
          width: 300,
          height: 45,
          borderWidth: 0,
          borderRadius: 5,}}
          />
        </View>

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <Button title="End Meeting"  onPress={this._onEndMeeting} style={styles.endButton}
          icon={
            <Icon name='bell' size ={15} color='black'/>
          }
          buttonStyle={{
          backgroundColor: "#1995AD",
          width: 300,
          height: 45,
          borderWidth: 0,
          borderRadius: 5,}}
          />
        </View>
      </View>
    );
  }


  _onEndMeeting = () => {
    this.state.dialogArr.push("newelement" + count);
    this.setState({
      dialogArr: this.state.dialogArr,
    });

    htmlStart += "<p>newelement" + count + "</p>";
    
    count++;
    this.props.navigation.navigate('SavePdf');
    console.log(htmlStart + htmlDialog + htmlEnd);
    this.createPDF;
  }

  async createPDF() {
    let options = {
      html: htmlStart + htmlDialog + htmlEnd,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    alert(file.filePath);
  }
  

  _onGetDialog = () => {
    // const { code } = this.props.navigation.state.params.data;

    // console.log("code" + code);

    // // this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
    // //     this.setState({
    // //         data,
    // //     })
    // // })
    
    // var db = firebase.database();

    // // Check if the code is in the database
    // var ref = db.ref('codes').child(code);
    // var childData;

    // ref.on("child_added", function(snapshot, prevChildKey) {
    //   var newPost = snapshot.val();
    //   // console.log("Author: " + newPost.author);
    //   // console.log("Title: " + newPost.title);
    //   // console.log("Previous Post ID: " + prevChildKey);
    //   childData = newPost;
    // });

    // this.state.dialogArr.push(childData);
    // this.setState({
    //   "dialogArr": this.state.dialogArr,
    // });

    const { code } = this.props.navigation.state.params.data;
  
    var db = firebase.database();

    // Check if the code is in the database
    var ref = db.ref('codes').child("-LXCyBBtJNP10mTykf6l");

    // Attach an asynchronous callback to read the data
    ref.on("value", function(snapshot) {
      console.log("REAL TIME FIREBASE READ");
      currentDialogCount++;
      //currentTranscript = snapshot.val();
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    this._check();
  }

  // Instead of this function, add the following code to
  // periodically update the state with the currentTranscript?
  //  - put the counts as state variables
  //
  // componentDidMount() {
  //   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  _check() {
    // need an infinite loop here
    if (currentTranscript != oldTranscript) {
      console.log("CHECK: " + currentTranscript);
      this.state.dialogArr.push(currentTranscript);
      this.setState({
        "dialogArr": this.state.dialogArr,
      });
      oldTranscript = currentTranscript;
    }
  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F2',
  },
  scrollView: {
    top: 30,
    bottom: 150,
  },
  endButton: {
    position: 'absolute',
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
