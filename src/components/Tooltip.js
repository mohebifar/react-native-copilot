// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Button from './Button';
import StepNumber from './StepNumber';

import styles from './style';

import type, { Step } from '../types';

type Props = {
  isFirstStep: boolean,
  isLastStep: boolean,
  handleNext: func,
  handlePrev: func,
  handleStop: func,
  currentStep: Step,
  lastStep: Step,
};

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  lastStep,
}: Props) => (
  <View>
    <View style={styles.tooltipContainer}>
      {currentStep.tooltip ?
        <View style={styles.tooltipText}>{currentStep.tooltip}</View> :
        <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
      }
    </View>
    <View style={[styles.bottomBar]}>
      <StepNumber
        currentStepNumber={currentStep.order}
        lastStepNumber={lastStep.order}
      />
      <View style={styles.bottomBarButtons}>
        {
          !isLastStep ?
            <TouchableOpacity onPress={handleStop}>
              <Button style={[styles.buttonSkipText]}>Skip tour</Button>
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
  </View>
);

export default Tooltip;
