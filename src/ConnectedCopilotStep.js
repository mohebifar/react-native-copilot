// @flow
import React, { Component } from 'react';

import type { CopilotContext } from './types';

type Props = {
  name: string,
  text: string,
  order: number,
  _copilot: CopilotContext,
  children: React$Element
};

class ConnectedCopilotStep extends Component<Props> {
  componentDidMount() {
    this.props._copilot.registerStep({
      name: this.props.name,
      text: this.props.text,
      order: this.props.order,
      target: this,
      wrapper: this.wrapper,
    });
  }

  componentWillUnmount() {
    this.props._copilot.unregisterStep(this.props.name);
  }

  setNativeProps(obj) {
    this.wrapper.setNativeProps(obj);
  }

  measure() {
    return new Promise((resolve, reject) => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (this.wrapper.measure) {
          this.wrapper.measure(
            (ox, oy, width, height, x, y) => resolve({
              x, y, width, height,
            }),
            reject,
          );
        } else {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    });
  }

  render() {
    const copilot = {
      ref: (wrapper) => { this.wrapper = wrapper; },
      onLayout: () => { }, // Android hack
    };

    return React.cloneElement(this.props.children, { copilot });
  }
}

export default ConnectedCopilotStep;
