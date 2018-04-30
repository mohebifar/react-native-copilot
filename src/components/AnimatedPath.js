import React, { Component } from 'react';

import { Animated } from 'react-native';
import { Path } from 'react-native-svg';

class SvgPathWrap extends Component {
  setNativeProps = (props) => {
    if (this._component) {
      this._component.setNativeProps(props);
    }
  }

  render() {
    return (
      <Path
        ref={(component) => { this._component = component; }}
        {...this.props}
      />
    );
  }
}

const AnimatedSvgPath = Animated.createAnimatedComponent(SvgPathWrap);

export default AnimatedSvgPath;
