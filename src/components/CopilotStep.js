// @flow
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import ConnectedCopilotStep from './ConnectedCopilotStep';

class CopilotStep extends Component {
  static contextTypes = {_copilot: PropTypes.object};

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
