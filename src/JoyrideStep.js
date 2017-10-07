// @flow
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import ConnectedJoyrideStep from './ConnectedJoyrideStep';

import type { JoyrideContext } from './types';

type Props = {
  name: string,
  order: number, // eslint-disable-line react/no-unused-prop-types
  text: string, // eslint-disable-line react/no-unused-prop-types
};

class JoyrideStep extends Component<Props> {
  static contextTypes = {
    _joyride: PropTypes.object,
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
      },
    );
  }
}

export default JoyrideStep;
