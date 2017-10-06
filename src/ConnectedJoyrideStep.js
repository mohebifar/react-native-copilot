import React, { Component } from 'react';
import PropTypes from 'prop-types';

import type { JoyrideContext } from './types';

class ConnectedJoyrideStep extends Component {
  props: {
    name: string,
    text: string,
    order: number,
    _joyride: JoyrideContext,
  }

  componentDidMount() {
    this.props._joyride.registerStep(
      {
        name: this.props.name,
        text: this.props.text,
        order: this.props.order,
        target: this,
        wrapper: this.wrapper,
      }
    );
  }

  componentWillUnmount() {
    this.props._joyride.unregisterStep(this.props.name);
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
            (ox, oy, width, height, x, y) => resolve({ x, y, width, height }),
            reject
          );
        } else {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    });
  }

  render() {
    const joyride = {
      ref: wrapper => { this.wrapper = wrapper; },
      onLayout: () => { }, // Android hack
    };

    return React.cloneElement(this.props.children, { joyride });
  }
}

export default ConnectedJoyrideStep;
