import * as React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'

import styles from './style'

interface Props {
  wrapperStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  children?: any
}

const Button = ({ wrapperStyle, style, children, ...rest }: Props) => (
  <View style={[styles.button, wrapperStyle]}>
    <Text style={[styles.buttonText, style]} {...rest}>
      {children}
    </Text>
  </View>
)

export default Button
