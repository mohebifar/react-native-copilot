// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Easing,
  Dimensions,
  I18nManager,
  TouchableOpacity
} from 'react-native';
import Svg from 'react-native-svg';
import AnimatedSvgPath from './AnimatedPath';

const windowDimensions = Dimensions.get('window');
const defaultSvgPath = ({ size, position, canvasSize }) => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;

const rtl = I18nManager.isRTL;
const start = rtl ? 'right' : 'left';
const end = rtl ? 'left' : 'right';

class SvgMask extends Component {
  static defaultProps = {
    animationDuration: 300,
    easing: Easing.linear,
    svgMaskPath: defaultSvgPath,
  };

  static contextTypes = {
    _copilot: PropTypes.object,
  }

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

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position || prevProps.size !== this.props.size) {
      this.animate(this.props.size, this.props.position);
    }
  }

  animationListener = () => {
    const d = this.props.svgMaskPath({
      size: this.state.size,
      position: this.state.position,
      canvasSize: this.state.canvasSize,
      step: this.props.currentStep,
    });
    if (this.mask) {
      this.mask.setNativeProps({ d });
    }
  };

  animate = (size = this.props.size, position = this.props.position) => {
    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(this.state.size, {
          toValue: size,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.position, {
          toValue: position,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: false,
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
    const { onPress } = this.context._copilot.getCurrentStep().target.props; // @symbolic

    return (
      <View
        style={this.props.style}
        onLayout={this.handleLayout}
        onStartShouldSetResponder={this.props.onClick}
      >
        {
          this.state.canvasSize
            ? (
              <Svg pointerEvents="none" width={this.state.canvasSize.x} height={this.state.canvasSize.y}>
                <AnimatedSvgPath
                  ref={(ref) => { this.mask = ref; }}
                  fill={this.props.backdropColor}
                  fillRule="evenodd"
                  strokeWidth={1}
                  d={this.props.svgMaskPath({
                    size: this.state.size,
                    position: this.state.position,
                    canvasSize: this.state.canvasSize,
                    step: this.props.currentStep,
                  })}
                />
              </Svg>
            )
            : null
        }
        {onPress && (<TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'red',
            [start]: this.props.position.x,
            [end]: (this.props.layout.width - (this.props.size.x + this.props.position.x)),
            top: this.props.position.y,
            width: this.props.size.x,
            height: this.props.size.y,
          }}
          onPress={() => {
            onPress();

            this.props.handleStop(); // @symbolic
          }}
        />)}
      </View>
    );
  }
}

export default SvgMask;
