import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import ConnectedJoyrideStep from './ConnectedJoyrideStep';

import type { JoyrideContext } from './types';

class JoyrideStep extends Component {
  props: {
    name: string,
    order: number,
    text: string,
  }

  context: {
    _joyride: JoyrideContext,
  }

  render() {
    const currentStep = this.context._joyride.getCurrentStep();

    return createElement(
      ConnectedJoyrideStep,
      {
        ...this.props,
        _joyride: this.context._joyride,
        visible: currentStep && currentStep.name === this.props.name,
      }
    );
  }
}

JoyrideStep.contextTypes = {
  _joyride: PropTypes.object,
};

export default JoyrideStep;
