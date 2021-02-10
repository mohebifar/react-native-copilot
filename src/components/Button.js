// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

const Button = ({ wrapperStyle, style, ...rest }) => (
  <View style={[styles.button, wrapperStyle]}>
    <Text style={[styles.buttonText, style]} {...rest} />
  </View>
);

export default Button;
