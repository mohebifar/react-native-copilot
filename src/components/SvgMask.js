// @flow
import React, { Component } from "react";
import { View, Animated, Easing, Dimensions, Text } from "react-native";
// import { Svg } from 'expo';
import Svg from "react-native-svg";
import AnimatedSvgPath from "./AnimatedPath";

import type { valueXY, Step } from "../types";

const windowDimensions = Dimensions.get("window");
const path = (size, position, canvasSize): string =>
  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
    position.y._value
  }H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${
    position.x._value
  }V${position.y._value}Z`;

type Props = {
  size: valueXY,
  position: valueXY,
  style: object | number | Array,
  easing: func,
  animationDuration: number,
  animated: boolean,
  backdropColor: string,
  step: Step,
  handleNext: Function,
  handlePrevious: Function
};

type State = {
  size: Animated.ValueXY,
  position: Animated.ValueXY,
  canvasSize: ?valueXY
};

class SvgMask extends Component<Props, State> {
  static defaultProps = {
    animationDuration: 300,
    easing: Easing.linear
  };

  constructor(props) {
    super(props);

    this.state = {
      canvasSize: {
        x: windowDimensions.width,
        y: windowDimensions.height
      },
      size: new Animated.ValueXY(props.size),
      position: new Animated.ValueXY(props.position)
    };

    this.state.position.addListener(this.animationListener);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.position !== nextProps.position ||
      this.props.size !== nextProps.size
    ) {
      this.animate(nextProps.size, nextProps.position);
    }
  }

  animationListener = (): void => {
    const d: string = path(
      this.state.size,
      this.state.position,
      this.state.canvasSize
    );
    if (this.mask) {
      this.mask.setNativeProps({ d });
    }
  };

  animate = (
    size: valueXY = this.props.size,
    position: valueXY = this.props.position
  ): void => {
    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(this.state.size, {
          toValue: size,
          duration: this.props.animationDuration,
          easing: this.props.easing
        }),
        Animated.timing(this.state.position, {
          toValue: position,
          duration: this.props.animationDuration,
          easing: this.props.easing
        })
      ]).start();
    } else {
      this.state.size.setValue(size);
      this.state.position.setValue(position);
    }
  };

  handleLayout = ({
    nativeEvent: {
      layout: { width, height }
    }
  }) => {
    this.setState({
      canvasSize: {
        x: width,
        y: height
      }
    });
  };

  render() {
    return (
      <View
        pointerEvents="box-none"
        style={this.props.style}
        onLayout={this.handleLayout}
      >
        {this.state.canvasSize ? (
          <Svg
            pointerEvents="none"
            width={this.state.canvasSize.x}
            height={this.state.canvasSize.y}
          >
            <AnimatedSvgPath
              ref={ref => {
                this.mask = ref;
              }}
              fill={this.props.backdropColor}
              fillRule="evenodd"
              strokeWidth={1}
              d={path(
                this.state.size,
                this.state.position,
                this.state.canvasSize
              )}
            />
            {this.props.step.overlayElement &&
              this.props.step.overlayElement(
                this.props.position,
                this.props.size,
                this.props.handleNext,
                this.props.handlePrevious
              )}
          </Svg>
        ) : null}
      </View>
    );
  }
}

export default SvgMask;
