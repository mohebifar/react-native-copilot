// @flow
import React, { Component } from 'react';

import { View, Animated } from 'react-native';
import styles from './style';

import type { valueXY } from '../types';

type Props = {
  size: valueXY,
  position: valueXY,
  layout: {
    width: number,
    height: number,
  },
  style: object | number | Array,
  easing: func,
  animationDuration: number,
  animated: boolean,
  backdropColor: string,
};

type State = {
  size: Animated.ValueXY,
  position: Animated.ValueXY,
  canvasSize: valueXY,
};

class ViewMask extends Component<Props, State> {
  state = {
    size: new Animated.ValueXY({ x: 0, y: 0 }),
    position: new Animated.ValueXY({ x: 0, y: 0 }),
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position || this.props.size !== nextProps.size) {
      this.animate(nextProps.size, nextProps.position);
    }
  }

  animate = (size: valueXY = this.props.size, position: valueXY = this.props.position): void => {
    if (this.state.animated) {
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
      this.setState({ animated: this.props.animated });
    }
  }

  render() {
    const { size, position } = this.state;
    const width = this.props.layout ? this.props.layout.width : 500;
    const height = this.props.layout ? this.props.layout.height : 500;

    const leftOverlayRight = Animated.add(width, Animated.multiply(position.x, -1));
    const rightOverlayLeft = Animated.add(size.x, position.x);
    const bottomOverlayTopBoundary = Animated.add(size.y, position.y);
    const topOverlayBottomBoundary = Animated.add(height, Animated.multiply(-1, position.y));
    const verticalOverlayLeftBoundary = position.x;
    const verticalOverlayRightBoundary = Animated.add(
      width, Animated.multiply(-1, rightOverlayLeft),
    );

    return (
      <View style={this.props.style}>
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              right: leftOverlayRight,
              backgroundColor: this.props.backdropColor,
            }]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              left: rightOverlayLeft,
              backgroundColor: this.props.backdropColor,
            }]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              top: bottomOverlayTopBoundary,
              left: verticalOverlayLeftBoundary,
              right: verticalOverlayRightBoundary,
              backgroundColor: this.props.backdropColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              bottom: topOverlayBottomBoundary,
              left: verticalOverlayLeftBoundary,
              right: verticalOverlayRightBoundary,
              backgroundColor: this.props.backdropColor,
            },
          ]}
        />
      </View>
    );
  }
}


export default ViewMask;
