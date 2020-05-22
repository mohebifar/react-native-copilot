import * as React from 'react'
import PropTypes from 'prop-types'

import { findNodeHandle, View, ScrollView } from 'react-native'

import mitt from 'mitt'
import hoistStatics from 'hoist-non-react-statics'

import CopilotModal from '../components/CopilotModal'
import { OFFSET_WIDTH } from '../components/style'

import {
  getFirstStep,
  getLastStep,
  getStepNumber,
  getPrevStep,
  getNextStep,
} from '../utilities'

import { Step, CopilotContext } from '../types'

/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120

interface State {
  steps: { [key: string]: Step }
  currentStep?: Step
  visible: boolean
  androidStatusBarVisible?: boolean
  backdropColor?: string
  scrollView?: React.RefObject<ScrollView>
  stopOnOutsideClick?: boolean
}

const copilot = ({
  overlay,
  tooltipComponent,
  tooltipStyle,
  stepNumberComponent,
  animated,
  labels,
  androidStatusBarVisible,
  backdropColor,
  stopOnOutsideClick = false,
  svgMaskPath,
  verticalOffset = 0,
  wrapperStyle,
  hideArrow,
} = {}) => (WrappedComponent) => {
  class Copilot extends React.Component<any, State> {
    state = {
      steps: {},
      currentStep: undefined,
      visible: false,
      scrollView: undefined,
    }

    getChildContext(): { _copilot: CopilotContext } {
      return {
        _copilot: {
          registerStep: this.registerStep,
          unregisterStep: this.unregisterStep,
          getCurrentStep: () => this.state.currentStep,
        },
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    getStepNumber = (step: Step | undefined = this.state.currentStep): number =>
      getStepNumber(this.state.steps, step)

    getFirstStep = (): Step | undefined => getFirstStep(this.state.steps)

    getLastStep = (): Step | undefined => getLastStep(this.state.steps)

    getPrevStep = (
      step: Step | undefined = this.state.currentStep,
    ): Step | undefined => getPrevStep(this.state.steps, step)

    getNextStep = (
      step: Step | undefined = this.state.currentStep,
    ): Step | undefined => getNextStep(this.state.steps, step)

    setCurrentStep = async (
      step: Step,
      move: boolean = true,
    ): Promise<void> => {
      this.setState({ currentStep: step })
      this.eventEmitter.emit('stepChange', step)

      if (this.state.scrollView) {
        const { scrollView } = this.state
        await this.state.currentStep!.wrapper.measureLayout(
          findNodeHandle(scrollView),
          (x, y, w, h) => {
            const yOffsett = y > 0 ? y - h / 2 : 0
            scrollView.scrollTo({ y: yOffsett, animated: false })
          },
        )
      }
      setTimeout(
        () => {
          if (move) {
            this.moveToCurrentStep()
          }
        },
        this.state.scrollView ? 100 : 0,
      )
    }

    setVisibility = (visible: boolean): void =>
      new Promise((resolve) => {
        this.setState({ visible }, () => resolve())
      })

    startTries = 0

    mounted = false

    eventEmitter = mitt()

    isFirstStep = (): boolean => this.state.currentStep === this.getFirstStep()

    isLastStep = (): boolean => this.state.currentStep === this.getLastStep()

    registerStep = (step: Step): void => {
      this.setState(({ steps }) => ({
        steps: {
          ...steps,
          [step.name]: step,
        },
      }))
    }

    unregisterStep = (stepName: string): void => {
      if (!this.mounted) {
        return
      }
      this.setState(({ steps }) => ({
        steps: Object.entries(steps)
          .filter(([key]) => key !== stepName)
          .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}),
      }))
    }

    next = async (): void => {
      await this.setCurrentStep(this.getNextStep())
    }

    prev = async (): void => {
      await this.setCurrentStep(this.getPrevStep())
    }

    start = async (fromStep?: string, scrollView?: React.RefObject): void => {
      const { steps } = this.state

      if (!this.state.scrollView) {
        this.setState({ scrollView })
      }

      const currentStep = fromStep ? steps[fromStep] : this.getFirstStep()

      if (this.startTries > MAX_START_TRIES) {
        this.startTries = 0
        return
      }

      if (!currentStep) {
        this.startTries += 1
        requestAnimationFrame(() => this.start(fromStep))
      } else {
        this.eventEmitter.emit('start')
        await this.setCurrentStep(currentStep)
        await this.moveToCurrentStep()
        await this.setVisibility(true)
        this.startTries = 0
      }
    }

    stop = async (): void => {
      await this.setVisibility(false)
      this.eventEmitter.emit('stop')
    }

    async moveToCurrentStep(): void {
      const size = await this.state.currentStep.target.measure()

      await this.modal.animateMove({
        width: size.width + OFFSET_WIDTH,
        height: size.height + OFFSET_WIDTH,
        left: size.x - OFFSET_WIDTH / 2,
        top: size.y - OFFSET_WIDTH / 2 + verticalOffset,
      })
    }

    render() {
      return (
        <View style={wrapperStyle || { flex: 1 }}>
          <WrappedComponent
            {...this.props}
            start={this.start}
            stop={this.stop}
            currentStep={this.state.currentStep}
            visible={this.state.visible}
            copilotEvents={this.eventEmitter}
          />
          <CopilotModal
            next={this.next}
            prev={this.prev}
            stop={this.stop}
            visible={this.state.visible}
            isFirstStep={this.isFirstStep()}
            isLastStep={this.isLastStep()}
            currentStepNumber={this.getStepNumber()}
            currentStep={this.state.currentStep}
            labels={labels}
            stepNumberComponent={stepNumberComponent}
            tooltipComponent={tooltipComponent}
            tooltipStyle={tooltipStyle}
            overlay={overlay}
            animated={animated}
            androidStatusBarVisible={androidStatusBarVisible}
            backdropColor={backdropColor}
            svgMaskPath={svgMaskPath}
            stopOnOutsideClick={stopOnOutsideClick}
            ref={(modal) => {
              this.modal = modal
            }}
            hideArrow={hideArrow}
          />
        </View>
      )
    }
  }

  Copilot.childContextTypes = {
    _copilot: PropTypes.object.isRequired,
  }

  return hoistStatics(Copilot, WrappedComponent)
}

export default copilot
