import { useCallback, useMemo, useReducer, useState } from "react";
import { type Step, type StepsMap } from "../types";

type Action =
  | {
      type: "register";
      step: Step;
    }
  | {
      type: "unregister";
      stepName: string;
    };

export const useStepsMap = () => {
  const [currentStep, setCurrentStepState] = useState<Step | undefined>(
    undefined
  );
  const [steps, dispatch] = useReducer((state: StepsMap, action: Action) => {
    switch (action.type) {
      case "register":
        return {
          ...state,
          [action.step.name]: action.step,
        };
      case "unregister": {
        const { [action.stepName]: _, ...rest } = state;
        return rest;
      }
      default:
        return state;
    }
  }, {});

  const orderedSteps = useMemo(
    () => Object.values(steps).sort((a, b) => a.order - b.order),
    [steps]
  );

  const stepIndex = useCallback(
    (step = currentStep) =>
      step
        ? orderedSteps.findIndex(
            (stepCandidate) => stepCandidate.order === step.order
          )
        : -1,
    [currentStep, orderedSteps]
  );

  const currentStepNumber = useMemo(
    (step = currentStep) => stepIndex(step) + 1,
    [currentStep, stepIndex]
  );

  const getFirstStep = useCallback(() => orderedSteps[0], [orderedSteps]);

  const getLastStep = useCallback(
    () => orderedSteps[orderedSteps.length - 1],
    [orderedSteps]
  );

  const getPrevStep = useCallback(
    (step = currentStep) => step && orderedSteps[stepIndex(step) - 1],
    [currentStep, stepIndex, orderedSteps]
  );

  const getNextStep = useCallback(
    (step = currentStep) => step && orderedSteps[stepIndex(step) + 1],
    [currentStep, stepIndex, orderedSteps]
  );

  const getNthStep = useCallback(
    (n: number) => orderedSteps[n - 1],
    [orderedSteps]
  );

  const isFirstStep = useMemo(
    () => currentStep === getFirstStep(),
    [currentStep, getFirstStep]
  );

  const isLastStep = useMemo(
    () => currentStep === getLastStep(),
    [currentStep, getLastStep]
  );

  const registerStep = useCallback((step: Step) => {
    dispatch({ type: "register", step });
  }, []);

  const unregisterStep = useCallback((stepName: string) => {
    dispatch({ type: "unregister", stepName });
  }, []);

  return {
    currentStepNumber,
    getFirstStep,
    getLastStep,
    getPrevStep,
    getNextStep,
    getNthStep,
    isFirstStep,
    isLastStep,
    currentStep,
    setCurrentStepState,
    steps,
    registerStep,
    unregisterStep,
  };
};
