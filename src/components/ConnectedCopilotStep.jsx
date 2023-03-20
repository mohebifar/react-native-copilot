// @flow
import React, { Component } from "react";
import { View } from "react-native";

import type { CopilotContext } from "../types";

type Props = {
  name: string,
  text: string,
  order: number,
  active?: boolean,
  _copilot: CopilotContext,
  children: React$Node,
};

class ConnectedCopilotStep extends Component<Props> {
  wrapper: ?React$ElementRef<typeof View>;

  static defaultProps: { active: true } = {
    active: true,
  };

  componentDidMount() {
    if (this.props.active) {
      this.register();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
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
    });
  }

  unregister() {
    this.props._copilot.unregisterStep(this.props.name);
  }

  measure() {
    if (typeof __TEST__ !== "undefined" && __TEST__) {
      return new Promise((resolve) =>
        resolve({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
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
                height,
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
      ref: (wrapper) => {
        this.wrapper = wrapper;
      },
      onLayout: () => {}, // Android hack
    };

    return React.cloneElement(this.props.children, { copilot });
  }
}

export default ConnectedCopilotStep;
