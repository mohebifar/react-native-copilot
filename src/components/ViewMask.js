// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, I18nManager, TouchableOpacity } from 'react-native';
import styles from './style';

const rtl = I18nManager.isRTL;
const start = rtl ? 'right' : 'left';
const end = rtl ? 'left' : 'right';

class ViewMask extends Component {
  static contextTypes = {
    _copilot: PropTypes.object,
  }

  state = {
    size: new Animated.ValueXY({ x: 0, y: 0 }),
    position: new Animated.ValueXY({ x: 0, y: 0 }),
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position || this.props.size !== nextProps.size) {
      this.animate(nextProps.size, nextProps.position);
    }
  }

  animate = (size = this.props.size, position = this.props.position) => {
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
    const { onPress } = this.context._copilot.getCurrentStep().target.props; // @symbolic
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
              [end]: leftOverlayRight,
            }]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              [start]: rightOverlayLeft,
            }]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              top: bottomOverlayTopBoundary,
              [start]: verticalOverlayLeftBoundary,
              [end]: verticalOverlayRightBoundary,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              bottom: topOverlayBottomBoundary,
              [start]: verticalOverlayLeftBoundary,
              [end]: verticalOverlayRightBoundary,
            },
          ]}
        />
        {onPress && (<TouchableOpacity
          style={{
            backgroundColor: 'transparent',
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


export default ViewMask;
