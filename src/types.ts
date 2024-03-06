import type { Emitter } from "mitt";
import type {
  Animated,
  LayoutRectangle,
  NativeMethods,
  ScrollView,
  ViewStyle,
} from "react-native";

export type WalktroughedComponent = NativeMethods & React.ComponentType<any>;

export interface Step {
  name: string;
  order: number;
  visible: boolean;
  wrapperRef: React.RefObject<NativeMethods>;
  measure: () => Promise<LayoutRectangle>;
  text: string;
}

export interface CopilotContext {
  registerStep: (step: Step) => void;
  unregisterStep: (name: string) => void;
  getCurrentStep: () => Step | undefined;
}

export interface ValueXY {
  x: number;
  y: number;
}

export type SvgMaskPathFunction = (args: {
  size: Animated.ValueXY;
  position: Animated.ValueXY;
  canvasSize: ValueXY;
  step: Step;
}) => string;

export type StepsMap = Record<string, Step>;

export type EasingFunction = (value: number) => number;

export type Labels = Partial<
  Record<"skip" | "previous" | "next" | "finish", string>
>;

export interface TooltipProps {
  labels: Labels;
  handleStop: () => void;
  handleNext: () => void;
  handleNth: (n: number) => void;
  handlePrev: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  currentStep: Step;
}

export interface MaskProps {
  size: ValueXY;
  position: ValueXY;
  style: ViewStyle;
  easing?: EasingFunction;
  animationDuration: number;
  animated: boolean;
  backdropColor: string;
  svgMaskPath?: SvgMaskPathFunction;
  layout: {
    width: number;
    height: number;
  };
  onClick?: () => any;
  currentStep: Step;
}

export interface CopilotOptions {
  easing?: ((value: number) => number) | undefined;
  overlay?: "svg" | "view";
  animationDuration?: number;
  tooltipComponent?: React.ComponentType<TooltipProps>;
  tooltipStyle?: ViewStyle;
  stepNumberComponent?: React.ComponentType<any>;
  animated?: boolean;
  labels?: Labels;
  androidStatusBarVisible?: boolean;
  svgMaskPath?: SvgMaskPathFunction;
  verticalOffset?: number;
  arrowColor?: string;
  arrowSize?: number;
  margin?: number;
  stopOnOutsideClick?: boolean;
  backdropColor?: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Events = {
  start: undefined;
  stop: undefined;
  stepChange: Step | undefined;
};

export interface CopilotContextType {
  registerStep: (step: Step) => void;
  unregisterStep: (stepName: string) => void;
  currentStep: Step | undefined;
  start: (
    fromStep?: string,
    suppliedScrollView?: ScrollView | null
  ) => Promise<void>;
  stop: () => Promise<void>;
  goToNext: () => Promise<void>;
  goToNth: (n: number) => Promise<void>;
  goToPrev: () => Promise<void>;
  visible: boolean;
  copilotEvents: Emitter<Events>;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepNumber: number;
}

export interface StepNumberProps {
  currentStepNumber: number;
}
