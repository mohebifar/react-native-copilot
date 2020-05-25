import * as React from 'react'

import { CopilotContext, Shape } from '../types'

declare var __TEST__: boolean

interface Props {
  name: string
  text: string
  order: number
  active?: boolean
  shape?: Shape
  _copilot: CopilotContext
  children?: any
}

class ConnectedCopilotStep extends React.Component<Props> {
  static defaultProps = {
    active: true,
  }
  wrapper: any
  componentDidMount() {
    if (this.props.active) {
      this.register()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        this.register()
      } else {
        this.unregister()
      }
    }
  }

  componentWillUnmount() {
    this.unregister()
  }

  setNativeProps(obj: any) {
    this.wrapper.setNativeProps(obj)
  }

  register() {
    if (this.props._copilot) {
      this.props._copilot.registerStep({
        name: this.props.name,
        text: this.props.text,
        order: this.props.order,
        target: this,
        wrapper: this.wrapper,
        shape: this.props.shape,
      })
    } else {
      console.warn('_copilot undefined')
    }
  }

  unregister() {
    this.props._copilot.unregisterStep(this.props.name)
  }

  measure() {
    if (typeof __TEST__ !== 'undefined' && __TEST__) {
      return new Promise((resolve) =>
        resolve({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        }),
      )
    }

    return new Promise((resolve, reject) => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (this.wrapper && this.wrapper.measure) {
          this.wrapper.measure(
            (
              _ox: number,
              _oy: number,
              width: number,
              height: number,
              x: number,
              y: number,
            ) =>
              resolve({
                x,
                y,
                width,
                height,
              }),
            reject,
          )
        } else {
          requestAnimationFrame(measure)
        }
      }

      requestAnimationFrame(measure)
    })
  }

  render() {
    const copilot = {
      ref: (wrapper: any) => {
        this.wrapper = wrapper
      },
      onLayout: () => {}, // Android hack
    }

    return React.cloneElement(this.props.children, { copilot })
  }
}

export default ConnectedCopilotStep
