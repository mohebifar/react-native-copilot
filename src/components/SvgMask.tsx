import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  Dimensions,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native'
import Svg from 'react-native-svg'

import { AnimatedSvgPath } from './AnimatedPath'
import { ValueXY, SVGMaskPath } from '../types'

const windowDimensions = Dimensions.get('window')

export const defaultSvgPath = ({ size, position, canvasSize }: any): string =>
  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
    position.y._value
  }H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${
    position.x._value
  }V${position.y._value}Z`

interface Props {
  size: ValueXY
  position: ValueXY
  style: StyleProp<ViewStyle>
  animationDuration: number
  animated: boolean
  backdropColor: string
  svgMaskPath?: SVGMaskPath
  currentStepNumber?: number
  easing?: (value: number) => number
  onClick?(event: GestureResponderEvent): boolean
}

interface State {
  size: Animated.ValueXY
  position: Animated.ValueXY
  opacity: Animated.Value
  animation: Animated.Value
  canvasSize?: ValueXY
}

class SvgMask extends Component<Props, State> {
  static defaultProps = {
    animationDuration: 300,
    easing: Easing.linear,
    svgMaskPath: defaultSvgPath,
    size: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  }

  listenerID: any
  mask: any

  constructor(props: Props) {
    super(props)

    this.state = {
      canvasSize: {
        x: windowDimensions.width,
        y: windowDimensions.height,
      },
      size: new Animated.ValueXY(props.size),
      position: new Animated.ValueXY(props.position),
      opacity: new Animated.Value(this.props.currentStepNumber === 1 ? 0 : 1),
      animation: new Animated.Value(0),
    }

    this.listenerID = this.state.animation.addListener(this.animationListener)
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.position !== this.props.position ||
      prevProps.size !== this.props.size
    ) {
      this.animate(this.props.size, this.props.position)
    }
  }

  componentWillUnmount() {
    if (this.listenerID) {
      this.state.animation.removeListener(this.listenerID)
    }
  }

  getPath = () => {
    const path = this.props.svgMaskPath!({
      animation: this.state.animation,
      size: this.state.size,
      position: this.state.position,
      canvasSize: this.state.canvasSize!,
      currentStepNumber: this.props.currentStepNumber!,
    })
    const hasTwoPath = typeof path !== 'string'
    const path1 = !hasTwoPath ? path : path[0]
    const path2 = hasTwoPath ? path[1] : undefined
    return [path1, path2]
  }

  animationListener = (): void => {
    const d = this.getPath()[0]
    if (this.mask) {
      this.mask.setNativeProps({ d })
    }
  }

  animate = (size = this.props.size, position = this.props.position) => {
    this.state.animation.setValue(0)
    Animated.parallel(
      [
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: true,
        }),
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
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: false,
        }),
      ],
      { stopTogether: false },
    ).start()
  }

  handleLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    this.setState({
      canvasSize: {
        x: width,
        y: height,
      },
    })
  }

  render() {
    if (!this.state.canvasSize) {
      return null
    }

    const [path1, path2] = this.getPath()
    return (
      <View
        style={this.props.style}
        onLayout={this.handleLayout}
        pointerEvents='none'
      >
        <Svg
          pointerEvents='none'
          width={this.state.canvasSize.x}
          height={this.state.canvasSize.y}
        >
          <AnimatedSvgPath
            ref={(ref: any) => {
              this.mask = ref
            }}
            fill={this.props.backdropColor}
            strokeWidth={0}
            fillRule='evenodd'
            d={path1}
            opacity={this.state.opacity}
          />
          {path2 && (
            <AnimatedSvgPath
              fill={this.props.backdropColor}
              fillRule='evenodd'
              strokeWidth={0}
              d={path2}
              opacity={this.state.opacity}
            />
          )}
        </Svg>
      </View>
    )
  }
}

export default SvgMask
