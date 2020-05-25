import * as React from 'react'
import CopilotStep from './CopilotStep'

interface TourGuideZoneProps {
  zone: number
  isTourGuide?: boolean
  children: React.ReactNode
}

export const TourGuideZone = ({
  isTourGuide,
  zone,
  children,
}: TourGuideZoneProps) => {
  if (!isTourGuide) {
    return <>{children}</>
  }

  return (
    <CopilotStep text={`${zone}`} order={zone} name={`${zone}`}>
      {children}
    </CopilotStep>
  )
}
