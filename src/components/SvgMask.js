// @flow
import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
// import { Svg } from 'expo';
import Svg from 'react-native-svg';
import AnimatedSvgPath from './AnimatedPath';

import type { valueXY } from '../types';

const windowDimensions = Dimensions.get('window');
// const path = (size, position, canvasSize): string => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;

const path = (size, position, canvasSize, r): string => {
  const minSize = Math.min(size.x._value, size.y._value)
  const radius = Math.max(Math.min(minSize / 2, r._value), 0)
  const lx = size.x._value - radius * 2
  const ly = size.y._value - radius * 2
  return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0Z\
M${position.x._value + size.x._value - lx - radius},${position.y._value} h${lx} a${radius},${radius} 0 0 1 ${radius},${radius}\
v${ly} a${radius},${radius} 0 0 1 -${radius},${radius}\
h-${lx} a${radius},${radius} 0 0 1 -${radius},-${radius}\
v-${ly} a${radius},${radius} 0 0 1 ${radius},-${radius} z`
}

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
  radius: Animated.Value,
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
      radius: new Animated.Value(props.radius)
    };

    this.state.position.addListener(this.animationListener);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position || this.props.size !== nextProps.size || this.props.radius !== nextProps.radius) {
      this.animate(nextProps.size, nextProps.position, nextProps.radius);
    }
  }

  animationListener = (): void => {
    const d: string = path(this.state.size, this.state.position, this.state.canvasSize, this.state.radius);
    if (this.mask) {
      this.mask.setNativeProps({ d });
    }
  };

  animate = (size: valueXY = this.props.size, position: valueXY = this.props.position, radius: Animated.Value = this.props.radius): void => {
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
        Animated.timing(this.state.radius, {
          toValue: radius,
          duration: this.props.animationDuration,
          easing: Easing.linear,
        }),
      ]).start();
    } else {
      this.state.size.setValue(size);
      this.state.position.setValue(position);
      this.state.radius.setValue(radius);
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
                <AnimatedSvgPath
                  ref={(ref) => { this.mask = ref; }}
                  fill={this.props.backdropColor}
                  fillRule="evenodd"
                  strokeWidth={1}
                  d={path(this.state.size, this.state.position, this.state.canvasSize, this.state.radius)}
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
