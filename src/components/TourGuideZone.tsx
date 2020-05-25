import * as React from 'react'
import CopilotStep from './CopilotStep'
import { Shape } from '../types'

interface TourGuideZoneProps {
  zone: number
  isTourGuide?: boolean
  shape?: Shape
  children: React.ReactNode
}

export const TourGuideZone = ({
  isTourGuide,
  zone,
  children,
  shape,
}: TourGuideZoneProps) => {
  if (!isTourGuide) {
    return <>{children}</>
  }

  return (
    <CopilotStep text={`${zone}`} order={zone} name={`${zone}`} shape={shape}>
      {children}
    </CopilotStep>
  )
}
