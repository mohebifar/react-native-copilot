import * as React from 'react'
import PropTypes from 'prop-types'

import ConnectedCopilotStep from './ConnectedCopilotStep'
import { CopilotContext, Shape } from '../types'

interface Props {
  name: string
  order: number
  text: string
  shape?: Shape
  active?: boolean
}

class CopilotStep extends React.Component<Props> {
  static contextTypes = {
    _copilot: PropTypes.object,
  }

  context: {
    _copilot: CopilotContext
  }

  render() {
    return (
      <ConnectedCopilotStep
        {...{ ...this.props, _copilot: this.context._copilot }}
      />
    )
  }
}

export default CopilotStep
