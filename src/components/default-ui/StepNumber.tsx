import React from "react";
import { View, Text } from "react-native";
import { type StepNumberProps } from "../../types";

import { styles } from "../style";

export const StepNumber = ({ currentStepNumber }: StepNumberProps) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
  </View>
);
