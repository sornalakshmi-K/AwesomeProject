import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceToText = () => {
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [results, setResults] = useState([]);
  const [speechService, setSpeechService] = useState('');
  useEffect(() => {
    checkService();
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    const androidPermissionChecking = async () => {
      if ((Platform.OS = 'android')) {
        const permission = PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        console.log(permission, 'hasPermission');
      }
    };
    androidPermissionChecking();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const checkService = async () => {
    const speechRecognitionService = await Voice.getSpeechRecognitionServices();
    console.log(speechRecognitionService, 'speechRecognitionService');
    setSpeechService(speechRecognitionService);
    if (speechRecognitionService.length > 0) {
      speechRecognitionService.forEach(service => {
        console.log(service, 'service');
      });
    }
  };
  const onSpeechStart = e => {
    console.log(e,"onSpeechStart");
    setStarted('✔');
  };

  const onSpeechEnd = e => {
    setEnded('✔');
  };

  const onSpeechResults = e => {
    setResults(e.value);
  };
  const startRecognizing = async () => {
    try {
      console.log('start');
      await Voice.start('en-US');
      Voice.onSpeechResults = e => {
        console.log(e, 'e');
        setResults(e.value[0]);
      };
      setStarted('');
      setEnded('');
      //setResults([]);
    } catch (e) {
      console.log(e,"e");
    }
  };
  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();

      setStarted('');
      setEnded('');
      setResults([]);
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Voice To Text Recognizing</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={startRecognizing}>
          <Image
            source={require('../asset/images/mic.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commonRow}>
        <View style={styles.columnStartView}>
          <Text style={styles.text}>Started {started}</Text>
        </View>
        <View style={styles.columnEndView}>
          <Text style={styles.text}>Ended {ended}</Text>
        </View>
      </View>
      <ScrollView horizontal>
        {results != undefined &&
          results != [] &&
          results != null &&
          results.map(item => {
            return (
              <View style={styles.commonRow}>
                <Text style={styles.title}>{item}ff</Text>
              </View>
            );
          })}
      </ScrollView>
      <TouchableOpacity style={styles.stopButton} onPress={stopRecognizing}>
        <Text style={styles.stopButtonText}>Stop Listening</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commonRow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  columnStartView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  columnEndView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    color: '#000',
    fontFamily: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageView: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  stopButton: {
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  text:{
    color: '#000',
    fontFamily: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }
});
export default VoiceToText;
