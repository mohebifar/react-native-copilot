// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Button from './Button';

import styles from './style';

import type { Step } from '../types';

type Props = {
  isFirstStep: boolean,
  isLastStep: boolean,
  handleNext: func,
  handlePrev: func,
  handleStop: func,
  currentStep: Step,
};

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
}: Props) => {
  return (
    <View>
      <View style={styles.extraComponentContainer}>
        {currentStep.extraComponent}
      </View>
      <View style={styles.imageContainer}>
        <Image style={{ flex: 1 }} source={currentStep.imageSource} />
      </View>
      <View style={styles.tooltipContainer}>
        <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
      </View>
      <View style={[styles.bottomBar]}>
        {
          !isLastStep ?
            <TouchableOpacity onPress={handleStop}>
              <Button>Skip</Button>
            </TouchableOpacity>
            : null
        }
        {
          !isFirstStep ?
            <TouchableOpacity onPress={handlePrev}>
              <Button>Previous</Button>
            </TouchableOpacity>
            : null
        }
        {
          !isLastStep ?
            <TouchableOpacity onPress={handleNext}>
              <Button>Next</Button>
            </TouchableOpacity> :
            <TouchableOpacity onPress={handleStop}>
              <Button>Finish</Button>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
};

export default Tooltip;
