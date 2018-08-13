import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

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
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

class App extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    secondStepActive: true,
  };

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.props.start();
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
          <WalkthroughableText style={styles.title}>
            {'Welcome to the demo of\n"React Native Copilot"'}
          </WalkthroughableText>
        </CopilotStep>
        <View style={styles.middleView}>
          <CopilotStep active={this.state.secondStepActive} text="Here goes your profile picture!" order={2} name="secondText">
            <WalkthroughableImage
              source={{ uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg' }}
              style={styles.profilePhoto}
            />
          </CopilotStep>
          <View style={styles.activeSwitchContainer}>
            <Text>Profile photo step activated?</Text>
            <View style={{ flexGrow: 1 }} />
            <Switch
              onValueChange={secondStepActive => this.setState({ secondStepActive })}
              value={this.state.secondStepActive}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => this.props.start()}>
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
  }
}

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(App);
