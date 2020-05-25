import * as React from 'react'

interface Props {
  copilot?: any
}

const walkthroughable = (WrappedComponent: any) => ({
  copilot,
  ...props
}: Props) => <WrappedComponent {...copilot} {...props} />

export default walkthroughable
