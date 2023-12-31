/* eslint-disable react/prop-types */
import React from "react";
import { View, Button, Text } from "react-native";

export const Tooltip = ({
  labels,
  handleStop,
  handleNext,
  handlePrev,
  isLastStep,
  isFirstStep,
  currentStep,
}) => {
  return (
    <View>
      <View>
        <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          This is a custom tooltip!
        </Text>
        <Text testID="stepDescription">{currentStep?.text}</Text>
      </View>
      <View>
        {!isLastStep ? (
          <Button onPress={handleStop} title={labels.skip} />
        ) : null}
        {!isFirstStep ? (
          <Button onPress={handlePrev} title={labels.previous} />
        ) : null}
        {!isLastStep ? (
          <Button onPress={handleNext} title={labels.next} />
        ) : (
          <Button onPress={handleStop} title={labels.finish} />
        )}
      </View>
    </View>
  );
};
