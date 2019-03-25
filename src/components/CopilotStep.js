// @flow
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import ConnectedCopilotStep from './ConnectedCopilotStep';

import type { CopilotContext } from '../types';

type Props = {
  name: string,
  order: number, // eslint-disable-line react/no-unused-prop-types
  text: string, // eslint-disable-line react/no-unused-prop-types
};

class CopilotStep extends Component<Props> {
  static contextTypes = {
    _copilot: PropTypes.object,
  }

  context: {
    _copilot: CopilotContext,
  }

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
