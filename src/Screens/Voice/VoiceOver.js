import React, {useState, useEffect} from 'react';
import {AccessibilityInfo, View, Text, StyleSheet, TouchableOpacity,TextInput} from 'react-native';

const VoiceOver = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      isReduceMotionEnabled => {
        setReduceMotionEnabled(isReduceMotionEnabled);
      },
    );
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged', //will be called when status of the screen reader changed
      isScreenReaderEnabled => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      },
    );

    //isReduceMotionEnabled reduce animations and effects
    AccessibilityInfo.isReduceMotionEnabled().then(isReduceMotionEnabled => {
      setReduceMotionEnabled(isReduceMotionEnabled);
    });
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      reduceMotionChangedSubscription.remove();//remove event listener 
      screenReaderChangedSubscription.remove();
    };
  }, []);

  onPress = () => {};

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel="Voice over and talk back">
      <Text style={styles.status}>
        The reduce motion is {reduceMotionEnabled ? 'enabled' : 'disabled'}.
      </Text>
      <Text style={styles.status}>
        The screen reader is {screenReaderEnabled ? 'enabled' : 'disabled'}.
      </Text>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Tap me!"
        onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Press me!</Text>
        </View>
      </TouchableOpacity>
      {/* accessibilityLabelledBy */}
      <Text nativeID="formLabel">Label for Input Field</Text>
      <TextInput
        accessibilityLabel="input"
        accessibilityLabelledBy="formLabel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    margin: 30,
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VoiceOver;
