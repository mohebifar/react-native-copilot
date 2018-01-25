// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import CopilotModal from './CopilotModal';

import { getFirstStep, getLastStep, getStepNumber, getPrevStep, getNextStep } from './utilities';
import { OFFSET_WIDTH } from './style';

import type { Step, CopilotContext } from './types';

type State = {
  steps: { [string]: Step },
  currentStep: ?Step,
  visible: boolean,
  whereToScroll: number,
};

const copilot = ({
  nextButton,
  prevButton,
  stopButton,
  finishButton,
} = {}) =>
  (WrappedComponent) => {
    class Copilot extends Component<any, State> {
      state = {
        steps: {},
        currentStep: null,
        visible: false,
        whereToScroll: 0,
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

      startScroll = async (targetMeasure): void => {
        const whereToScroll = targetMeasure.y
          -(this.scrollViewMeasure.height
          - targetMeasure.height)/2;

        await this.setState({ whereToScroll: whereToScroll < 0 ? 0: whereToScroll });
        return this.scrollViewMeasure.oy > targetMeasure.y ?
           - targetMeasure.height/2 - whereToScroll : this.scrollViewMeasure.y
          + (this.scrollViewMeasure.height/2
          -  targetMeasure.height)
      }
      
      setCurrentStep = async (step: Step): void => {
        const targetMeasure = await step.target.measure();   

        const scrollViewHeight = this.scrollViewMeasure.height;
        const targetBottomY = targetMeasure.y + targetMeasure.height;
        let newTargetY;

        if (
          (scrollViewHeight < targetBottomY) || this.scrollViewMeasure.oy > targetMeasure.y
        ) {
          newTargetY = await this.startScroll(targetMeasure);
        }
        await this.setState({ currentStep: step });

        this.modal.animateMove({
          width: targetMeasure.width + OFFSET_WIDTH,
          height: targetMeasure.height + OFFSET_WIDTH,
          left: targetMeasure.x - (OFFSET_WIDTH / 2),
          top: (!Number.isNaN(parseFloat(newTargetY)) ? newTargetY : targetMeasure.y) - (OFFSET_WIDTH / 2),
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

      next = (): void => {
        this.setCurrentStep(this.getNextStep());
      }

      prev = (): void => {
        this.setCurrentStep(this.getPrevStep());
      }

      start = async (fromStep?: string, scrollViewMeasure?: Object): void => {
        this.scrollViewMeasure = scrollViewMeasure;
        const { steps } = this.state;

        const currentStep = fromStep
          ? steps.find(step => step.name === fromStep)
          : this.getFirstStep();

        await this.setCurrentStep(currentStep);
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
              whereToScroll={this.state.whereToScroll}
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
              nextButton={nextButton}
              prevButton={prevButton}
              stopButton={stopButton}
              finishButton={finishButton}
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
