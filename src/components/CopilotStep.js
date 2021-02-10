// @flow
import { Component, createElement } from 'react';

import ConnectedCopilotStep from './ConnectedCopilotStep';

class CopilotStep extends Component {
  render() {
    const currentStep = this.context._copilot.getCurrentStep();

    return createElement(
      ConnectedCopilotStep,
      {
        ...this.props,
        _copilot: this.context._copilot,
        visible: currentStep && currentStep.name === this.props.name,
      },
    );
  }
}

export default CopilotStep;
