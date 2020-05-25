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
import { ValueXY, SVGMaskPath, Step } from '../types'
import { getFirstPath, getSecondPath, svgMaskPathMorph } from '../utilities'

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
  currentStep?: Step
  easing?: (value: number) => number
  onClick?(event: GestureResponderEvent): boolean
}

interface State {
  size: ValueXY
  position: ValueXY
  previousSize?: ValueXY
  previousPosition?: ValueXY
  previousStepNumber?: number
  opacity: Animated.Value
  animation: Animated.Value
  canvasSize?: ValueXY
  previousPath: string
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
      size: props.size,
      position: props.position,
      opacity: new Animated.Value(0),
      animation: new Animated.Value(0),
      previousSize: undefined,
      previousPosition: undefined,
      previousStepNumber: undefined,
      previousPath: `M${windowDimensions.width / 2} ${
        windowDimensions.height / 2
      } h 1 v 1 h -1 Z`,
    }

    this.listenerID = this.state.animation.addListener(this.animationListener)
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.position !== this.props.position ||
      prevProps.size !== this.props.size
    ) {
      this.animate()
    }
  }

  componentWillUnmount() {
    if (this.listenerID) {
      this.state.animation.removeListener(this.listenerID)
    }
  }

  getPath = () => {
    const previousPath = this.state.previousPath
    const nextPath = this.props.svgMaskPath!({
      size: this.props.size,
      position: this.props.position,
      canvasSize: this.state.canvasSize!,
      currentStepNumber: this.props.currentStepNumber!,
    })
    const path = svgMaskPathMorph({
      animation: this.state.animation as any,
      previousPath: getFirstPath(previousPath),
      nextPath: getFirstPath(nextPath),
      to: {
        position: this.props.position,
        size: this.props.size,
        shape: this.props.currentStep?.shape,
      },
    })
    return [getFirstPath(path), getSecondPath(path)]
  }

  animationListener = (): void => {
    const d = this.getPath()[0]
    if (this.mask) {
      this.mask.setNativeProps({ d })
    }
  }

  animate = () => {
    const animations = [
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: this.props.animationDuration,
        easing: this.props.easing,
        useNativeDriver: true,
      }),
    ]
    // @ts-ignore
    if (this.state.opacity._value !== 1) {
      animations.push(
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: true,
        }),
      )
    }
    Animated.parallel(animations, { stopTogether: false }).start((result) => {
      if (result.finished) {
        this.setState(
          {
            previousPosition: this.props.position,
            previousSize: this.props.size,
            previousStepNumber: this.props.currentStepNumber,
            previousPath: this.getPath()[0]!,
          },
          () => {
            // @ts-ignore
            if (this.state.animation._value === 1) {
              this.state.animation.setValue(0)
            }
          },
        )
      }
    })
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
