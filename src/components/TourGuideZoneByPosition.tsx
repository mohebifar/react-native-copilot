import * as React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { TourGuideZone } from './TourGuideZone'
import { CopilotWrapper } from './CopilotWrapper'

interface TourGuideZoneByPositionProps {
  zone: number
  isTourGuide?: boolean
  top?: number
  left?: number
  right?: number
  bottom?: number
  width?: number
  height?: number
  containerStyle?: StyleProp<ViewStyle>
}

export const TourGuideZoneByPosition = ({
  isTourGuide,
  zone,
  width,
  height,
  top,
  left,
  right,
  bottom,
  containerStyle,
}: TourGuideZoneByPositionProps) => {
  if (!isTourGuide) {
    return null
  }

  return (
    <View
      pointerEvents='none'
      style={[StyleSheet.absoluteFillObject, containerStyle]}
    >
      <TourGuideZone zone={zone} isTourGuide>
        <CopilotWrapper
          style={{
            height,
            width,
            top,
            right,
            bottom,
            left,
          }}
        />
      </TourGuideZone>
    </View>
  )
}
