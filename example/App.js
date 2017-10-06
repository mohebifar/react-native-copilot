import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { joyride, joyridable, JoyrideStep } from 'react-native-joyride';

const JoyrideText = joyridable(Text);
const JoyrideImage = joyridable(Image);

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <JoyrideStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
          <JoyrideText style={styles.title}>
            Welcome to the demo of
            {'\n'}
            "React Native Joyride"
            </JoyrideText>
        </JoyrideStep>
        <View style={styles.middleView}>
          <JoyrideStep text="Here goes your profile picture!" order={2} name="secondText">
            <JoyrideImage
              source={{ uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg' }}
              style={styles.profilePhoto}
            />
          </JoyrideStep>
          <TouchableOpacity style={styles.button} onPress={() => this.props.start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <JoyrideStep text="Here is an item in the corner of the screen." order={3} name="thirdText">
            <JoyrideText style={styles.tabItem}>
              <Ionicons name="ios-contact" size={40} color="#888" />
            </JoyrideText>
          </JoyrideStep>

          <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" />
          <Ionicons style={styles.tabItem} name="ios-globe" size={40} color="#888" />
          <Ionicons style={styles.tabItem} name="ios-navigate-outline" size={40} color="#888" />
          <Ionicons style={styles.tabItem} name="ios-rainy" size={40} color="#888" />
        </View>
      </View>
    );
  }
}

export default joyride()(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  }
});
