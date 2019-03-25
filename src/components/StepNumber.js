// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

type Props = {
  currentStepNumber: number,
  lastStepNumber: number,
};

const StepNumber = ({
  currentStepNumber,
  lastStepNumber,
}: Props) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
    <Text>/</Text>
    <Text style={[styles.stepNumberText]}>{lastStepNumber}</Text>
  </View>
);

export default StepNumber;
