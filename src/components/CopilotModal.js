// @flow
import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Svg from 'react-native-svg';
import AnimatedSvgPath from './AnimatedPath';

import type { valueXY, svgMaskPath } from '../types';

const windowDimensions = Dimensions.get('window');
const defaultSvgPath = ({ size, position, canvasSize }): string => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;

type Props = {
  size: valueXY,
  position: valueXY,
  style: object | number | Array,
  easing: func,
  animationDuration: number,
  animated: boolean,
  backdropColor: string,
  svgMaskPath?: svgMaskPath,
  currentStepNumber?: number,
  onClick?: () => void,
};

type State = {
  size: Animated.ValueXY,
  position: Animated.ValueXY,
  opacity: Animated.Value,
  canvasSize: ?valueXY,
};

class SvgMask extends Component<Props, State> {
  static defaultProps = {
    animationDuration: 300,
    easing: Easing.linear,
    svgMaskPath: defaultSvgPath,
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
      opacity: new Animated.Value(this.props.currentStepNumber === 1 ? 1 : 1),
    };

    this.state.position.addListener(this.animationListener);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position || prevProps.size !== this.props.size) {
      this.animate(this.props.size, this.props.position);
    }
  }

  animationListener = (): void => {
    const path: string = this.props.svgMaskPath({
      size: this.state.size,
      position: this.state.position,
      canvasSize: this.state.canvasSize,
      currentStepNumber: this.props.currentStepNumber
    });
    const hasTwoPath = typeof path !== 'string'
    const d = !hasTwoPath ? path : path[0]
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
          useNativeDriver: true
        }),
        // Animated.timing(this.state.opacity, {
        //   toValue: 1,
        //   duration: this.props.animationDuration,
        //   easing: this.props.easing,
        //   useNativeDriver: true
        // })
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
    const path = this.props.svgMaskPath({
      size: this.state.size,
      position: this.state.position,
      canvasSize: this.state.canvasSize,
      currentStepNumber: this.props.currentStepNumber
    })
    const hasTwoPath = typeof path !== 'string'
    const path1 = !hasTwoPath ? path : path[0]
    const path2 = hasTwoPath ? path[1] : undefined
    return (
      <Animated.View
        style={[this.props.style, { opacity: this.state.opacity }]}
        onLayout={this.handleLayout}
        pointerEvents='none'
      >
        {
          this.state.canvasSize
            ? (
              <Svg pointerEvents="none" width={this.state.canvasSize.x} height={this.state.canvasSize.y}>
                <AnimatedSvgPath
                  ref={(ref) => { this.mask = ref; }}
                  fill={this.props.backdropColor}
                  strokeWidth={0}
                  fillRule="evenodd"
                  d={path1}
                  />
                  {path2 &&
                    <AnimatedSvgPath
                      fill={this.props.backdropColor}
                      fillRule="evenodd"
                      strokeWidth={0}
                      d={path2}
                    />
                  }
              </Svg>
            )
            : null
        }
      </Animated.View>
    );
  }
}

export default SvgMask;
