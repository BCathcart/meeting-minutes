import React from 'react';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

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


// Real-time Firebase dialog data
let currentTranscript;
let oldTranscript;

export default class MeetingMenuScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this._updateDialog = this._updateDialog.bind(this);

    this.state = {
      textValue: '',
      dialogArr: [],
    }
  }

  
  componentWillMount() {
    const { code } = this.props.navigation.state.params.data;
  
    var db = firebase.database();

    // Check if the code is in the database
    var ref = db.ref('codes').child(code);

    // Attach an asynchronous callback to read the data
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      currentTranscript = snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  // Update the dialog array every half-second
  componentDidMount() {
    this.interval = setInterval(() => this._updateDialog(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Updates the scrollView with any new dialog (checks every half-second)
  _updateDialog() {
    if (currentTranscript != undefined && currentTranscript != oldTranscript) {
      // Make a new array
      let newDiagArr = [];
      for (var entry in currentTranscript) {
        // skip loop if the property is from prototype
        if (!currentTranscript.hasOwnProperty(entry)) continue;
        console.log(currentTranscript[entry]);
        newDiagArr.push(currentTranscript[entry]);
      }
      this.setState({
        "dialogArr": newDiagArr,
      });
      oldTranscript = currentTranscript;
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

        <View style = {{alignSelf: 'center', justifyContent: 'center', flex: 1, padding: 10}}>
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
    alignSelf: 'flex-start',
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
