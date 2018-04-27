// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import CopilotModal from './components/CopilotModal';
import { OFFSET_WIDTH } from './components/style';

import { getFirstStep, getLastStep, getStepNumber, getPrevStep, getNextStep } from './utilities';

import type { Step, CopilotContext } from './types';

type State = {
  steps: { [string]: Step },
  currentStep: ?Step,
  visible: boolean,
};

const copilot = ({
  overlay,
  tooltipComponent,
  animated,
} = {}) =>
  (WrappedComponent) => {
    class Copilot extends Component<any, State> {
      state = {
        steps: {},
        currentStep: null,
        visible: false,
      };

      getChildContext(): { _copilot: CopilotContext } {
        return {
          _copilot: {
            registerStep: this.registerStep,
            unregisterStep: this.unregisterStep,
            getCurrentStep: () => this.state.currentStep,
          },
        };
      }

      getStepNumber = (step: ?Step = this.state.currentStep): number =>
        getStepNumber(this.state.steps, step);

      getFirstStep = (): ?Step => getFirstStep(this.state.steps);

      getLastStep = (): ?Step => getLastStep(this.state.steps);

      getPrevStep = (step: ?Step = this.state.currentStep): ?Step =>
        getPrevStep(this.state.steps, step);

      getNextStep = (step: ?Step = this.state.currentStep): ?Step =>
        getNextStep(this.state.steps, step);

      setCurrentStep = async (step: Step): void => {
        await this.setState({ currentStep: step });

        const size = await this.state.currentStep.target.measure();

        this.modal.animateMove({
          width: size.width + OFFSET_WIDTH,
          height: size.height + OFFSET_WIDTH,
          left: size.x - (OFFSET_WIDTH / 2),
          top: size.y - (OFFSET_WIDTH / 2),
        });
      }

      setVisibility = (visible: boolean): void => {
        this.setState({ visible });
      }

      isFirstStep = (): boolean => this.state.currentStep === this.getFirstStep();

      isLastStep = (): boolean => this.state.currentStep === this.getLastStep();

      registerStep = (step: Step): void => {
        this.setState(({ steps }) => ({
          steps: {
            ...steps,
            [step.name]: step,
          },
        }));
      }

      unregisterStep = (stepName: string): void => {
        this.setState(({ steps }) => ({
          steps: Object.entries(steps)
            .filter(([key]) => key !== stepName)
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}),
        }));
      }

      next = async (): void => {
        await this.setCurrentStep(this.getNextStep());
      }

      prev = async (): void => {
        await this.setCurrentStep(this.getPrevStep());
      }

      start = (fromStep?: string): void => {
        const { steps } = this.state;

        const currentStep = fromStep
          ? steps.find(step => step.name === fromStep)
          : this.getFirstStep();

        this.setCurrentStep(currentStep);
        this.setVisibility(true);
      }

      stop = (): void => {
        this.setVisibility(false);
      }

      render() {
        return (
          <View style={{ flex: 1 }}>
            <WrappedComponent
              {...this.props}
              start={this.start}
              currentStep={this.state.currentStep}
              visible={this.state.visible}
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
              tooltipComponent={tooltipComponent}
              overlay={overlay}
              animated={animated}
              ref={(modal) => { this.modal = modal; }}
            />
          </View>
        );
      }
    }

    Copilot.childContextTypes = {
      _copilot: PropTypes.object.isRequired,
    };

    return Copilot;
  };

export default copilot;
