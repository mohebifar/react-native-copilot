// @flow
import React, { Component } from "react";

import type { CopilotContext, OverLayElement } from "../types";

type Props = {
  name: string,
  text: string,
  order: number,
  overlayElement?: OverLayElement,
  active?: boolean,
  _copilot: CopilotContext,
  children: React$Element
};

class ConnectedCopilotStep extends Component<Props> {
  static defaultProps = {
    active: true
  };

  componentDidMount() {
    if (this.props.active) {
      this.register();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.register();
      } else {
        this.unregister();
      }
    }
  }

  componentWillUnmount() {
    this.unregister();
  }

  setNativeProps(obj) {
    this.wrapper.setNativeProps(obj);
  }

  register() {
    this.props._copilot.registerStep({
      name: this.props.name,
      text: this.props.text,
      order: this.props.order,
      target: this,
      wrapper: this.wrapper,
      ...(this.props.overlayElement && {
        overlayElement: this.props.overlayElement
      })
    });
  }

  unregister() {
    this.props._copilot.unregisterStep(this.props.name);
  }

  measure() {
    if (typeof __TEST__ !== "undefined" && __TEST__) {
      // eslint-disable-line no-undef
      return new Promise(resolve =>
        resolve({
          x: 0,
          y: 0,
          width: 0,
          height: 0
        })
      );
    }

    return new Promise((resolve, reject) => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (this.wrapper && this.wrapper.measure) {
          this.wrapper.measure(
            (ox, oy, width, height, x, y) =>
              resolve({
                x,
                y,
                width,
                height
              }),
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
    const copilot = {
      ref: wrapper => {
        this.wrapper = wrapper;
      },
      onLayout: () => {} // Android hack
    };

    return React.cloneElement(this.props.children, { copilot });
  }
}

export default ConnectedCopilotStep;
