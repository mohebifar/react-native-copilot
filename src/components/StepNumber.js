// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

import type { Step } from '../types';

type Props = {
  isFirstStep: boolean,
  isLastStep: boolean,
  currentStep: Step,
  currentStepNumber: number,
};

const StepNumber = ({
  isFirstStep,
  isLastStep,
  currentStep,
  currentStepNumber,
}: Props) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
  </View>
);

export default StepNumber;
