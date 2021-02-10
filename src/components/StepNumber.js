// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

const StepNumber = ({
  currentStepNumber,
}) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
  </View>
);

export default StepNumber;
