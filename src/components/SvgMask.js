// @flow
import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
// import { Svg } from 'expo';
import Svg, { Path, RadialGradient, Defs, Stop } from 'react-native-svg';
import AnimatedSvgPath from './AnimatedPath';
import AnimatedRect from './AnimatedRect';

import type { valueXY } from '../types';

const windowDimensions = Dimensions.get('window');
// const path = (size, position, canvasSize): string => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;
const extraSpacing = 20
const extraSize = 40
const path = (size, position, canvasSize): string => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value - extraSpacing},${position.y._value - extraSpacing}H${position.x._value - extraSpacing + size.x._value + extraSize}V${position.y._value - extraSpacing + size.y._value + extraSize}H${position.x._value - extraSpacing}V${position.y._value - extraSpacing}Z`;

type Props = {
  size: valueXY,
  position: valueXY,
  style: object | number | Array,
  easing: func,
  animationDuration: number,
  animated: boolean,
  backdropColor: string,
};

type State = {
  size: Animated.ValueXY,
  position: Animated.ValueXY,
  canvasSize: ?valueXY,
};

class SvgMask extends Component<Props, State> {
  static defaultProps = {
    animationDuration: 300,
    easing: Easing.linear,
  };

  constructor(props) {
    super(props);

    this.state = {
      canvasSize: {
        x: windowDimensions.width,
        y: windowDimensions.height,
      },
      size: new Animated.ValueXY(props.size),
      position: new Animated.ValueXY(props.position),
    };

    this.state.position.addListener(this.animationListener);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position || this.props.size !== nextProps.size) {
      this.animate(nextProps.size, nextProps.position);
    }
  }

  animationListener = (): void => {
    const d: string = path(this.state.size, this.state.position, this.state.canvasSize);
    if (this.mask) {
      this.mask.setNativeProps({ d });
    }
  };

  animate = (size: valueXY = this.props.size, position: valueXY = this.props.position): void => {
    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(this.state.size, {
          toValue: size,
          duration: this.props.animationDuration,
          easing: this.props.easing,
        }),
        Animated.timing(this.state.position, {
          toValue: position,
          duration: this.props.animationDuration,
          easing: this.props.easing,
        }),
      ]).start();
    } else {
      this.state.size.setValue(size);
      this.state.position.setValue(position);
    }
  }

  handleLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.setState({
      canvasSize: {
        x: width,
        y: height,
      },
    });
  }

  render() {
    return (
      <View pointerEvents="box-none" style={this.props.style} onLayout={this.handleLayout}>
        {
          this.state.canvasSize
            ? (
              <Svg pointerEvents="none" width={this.state.canvasSize.x} height={this.state.canvasSize.y}>
                <Defs>
                  <RadialGradient
                    id="grad"
                  >
                    <Stop
                      offset="0"
                      stopColor="white"
                      stopOpacity="0"
                    />
                    <Stop
                      offset="0.4"
                      stopColor="white"
                      stopOpacity="0"
                    />
                    {/* <Stop
                      offset="0.8"
                      stopColor={this.props.backdropColor}
                      stopOpacity="0.4"
                    /> */}
                    <Stop
                      offset="0.9"
                      stopColor={this.props.backdropColor}
                      stopOpacity="0.5"
                    />
                    <Stop
                      offset="1"
                      stopColor={this.props.backdropColor}
                      stopOpacity="0.5"
                    />
                  </RadialGradient>
                </Defs>
                <Path
                  ref={(ref) => { this.mask = ref; }}
                  fill={this.props.backdropColor}
                  fillRule="evenodd"
                  strokeWidth={0}
                  d={path(this.state.size, this.state.position, this.state.canvasSize)}
                />
                <AnimatedRect
                  x={this.state.position.x._value - extraSpacing}
                  y={this.state.position.y._value - extraSpacing}
                  width={this.state.size.x._value + extraSize}
                  height={this.state.size.y._value + extraSize}
                  fill="url(#grad)"
                />
              </Svg>
            )
            : null
        }
      </View>
    );
  }
}

export default SvgMask;
