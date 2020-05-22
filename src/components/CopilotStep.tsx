import * as React from 'react'
import PropTypes from 'prop-types'

import ConnectedCopilotStep from './ConnectedCopilotStep'
import { CopilotContext } from '../types'

interface Props {
  name: string
  order: number
  text: string
}

class CopilotStep extends React.Component<Props> {
  static contextTypes = {
    _copilot: PropTypes.object,
  }

  context: {
    _copilot: CopilotContext
  }

  render() {
    const currentStep = this.context._copilot.getCurrentStep()

    return React.createElement(ConnectedCopilotStep, {
      ...this.props,
      _copilot: this.context._copilot,
      visible: currentStep && currentStep.name === this.props.name,
    })
  }
}

export default CopilotStep
