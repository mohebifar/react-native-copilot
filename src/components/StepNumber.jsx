// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

type Props = {
  currentStepNumber: number,
};

function StepNumber({ currentStepNumber }: Props) {
  return (
    <View style={styles.stepNumber}>
      <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
    </View>
  );
}

export default StepNumber;
