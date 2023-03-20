// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

type Props = {
  wrapperStyle: Object | number | Array,
  style: Object | number | Array,
  rest: Object | number | Array,
};

function Button({ wrapperStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.button, wrapperStyle]}>
      <Text style={[styles.buttonText, style]} {...rest} />
    </View>
  );
}

export default Button;
