import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

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
  },
});

const App = props => (
  <View style={styles.container}>
    <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
      <WalkthroughableText style={styles.title}>
        {'Welcome to the demo of\n"React Native Joyride"'}
      </WalkthroughableText>
    </CopilotStep>
    <View style={styles.middleView}>
      <CopilotStep text="Here goes your profile picture!" order={2} name="secondText">
        <WalkthroughableImage
          source={{ uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg' }}
          style={styles.profilePhoto}
        />
      </CopilotStep>
      <TouchableOpacity style={styles.button} onPress={() => props.start()}>
        <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <CopilotStep text="Here is an item in the corner of the screen." order={3} name="thirdText">
        <WalkthroughableText style={styles.tabItem}>
          <Ionicons name="ios-contact" size={40} color="#888" />
        </WalkthroughableText>
      </CopilotStep>

      <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" />
      <Ionicons style={styles.tabItem} name="ios-globe" size={40} color="#888" />
      <Ionicons style={styles.tabItem} name="ios-navigate-outline" size={40} color="#888" />
      <Ionicons style={styles.tabItem} name="ios-rainy" size={40} color="#888" />
    </View>
  </View>
);

App.propTypes = {
  start: PropTypes.func.isRequired,
};

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(App);
