import * as React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

interface CopilotWrapperProps {
  copilot?: any
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}
export const CopilotWrapper = ({
  copilot,
  children,
  style,
}: CopilotWrapperProps) => (
  <View style={style} {...copilot}>
    {children}
  </View>
)
