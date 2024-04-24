import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
const App = (props) => {
  const [secondStepActive, setSecondStepActive] = useState(true)
  const WalkthroughableText = walkthroughable(Text)
  const WalkthroughableImage = walkthroughable(Image)
  useEffect(() => {
    props.copilotEvents.on('stepChange', handleStepChange)
    props.start();
  }, [])

  const handleStepChange = (step) => {

  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.container}>
        {/* Step 1  */}
        <CopilotStep
          text='This is the heading with some style'
          order={1}
          name='firstUniqueKey'
        >
          <WalkthroughableText
            style={style.title}
          >Example of App Introduction in React Native
          </WalkthroughableText>
        </CopilotStep>
        {/* Step 3 Image */}
        <CopilotStep
          text='This is an Image'
          order={3}
          name='thirdUniqueKey'>
          <WalkthroughableImage
            source={require('./src/asset/images/react.png')}
            style={style.image}
          />
        </CopilotStep>

        {/* Step 2 */}
        <View style={style.activeSwitchContainer}>
          <CopilotStep
            active={secondStepActive}
            text='This is simple text without style'
            order={2}
            name='secondUniqueKey'
          >
            <WalkthroughableText style={{ height: 70 }}>
              Default Text without style which can be skiped after disabling the switch
            </WalkthroughableText>
          </CopilotStep>
          <Switch
            onValueChange={(secondStepActive) => setSecondStepActive(secondStepActive)}
            value={secondStepActive}
          />
        </View>
        <View style={style.middleView}>
          <TouchableOpacity
            style={style.button}
            onPress={() => { props.start(); }}
          >
            <Text style={style.buttonText}>Start App Tour</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default copilot({
  overlay: 'svg',
  animated: true
})(App);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40
  },
  middleView: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    height: 80,
    margin: 20
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20
  }
})
