import React from "react";
import { Text, View } from "react-native";
import { styles } from "../style";
import type { StepNumberProps } from "../../types";

export const StepNumber = ({ currentStepNumber }: StepNumberProps) => {
  return (
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
  );
};
