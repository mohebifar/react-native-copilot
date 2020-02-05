declare module '@okgrow/react-native-copilot' {
  import { Component, ComponentProps, ComponentType, ReactElement, ReactNode } from 'react';

  export type Step = {
    name: string;
    order: number;
    visible: boolean;
    target: ReactNode;
    text: string;
    wrapper: ReactNode;
  };

  export type CopilotTooltipProps = {
    isFirstStep: boolean;
    isLastStep: boolean;
    handleNext: () => void;
    handlePrev: () => void;
    handleStop: () => void;
    currentStep: Step;
  };

  export type CopilotStepNumberProps = {
    currentStepNumber: number;
  };

  /**
   * Options for the copilot HOC
   */
  export type CopilotOptions = {
    animated?: boolean; // Use animation between steps
    overlay?: 'svg' | 'view'; // The overlay in react-native copilot is the component that draws the dark transparent over the root component.
    tooltipComponent?: any; // You can customize the tooltip by passing a component here
    stepNumberComponent?: any; // You can customize the step number by passing a component here
    androidStatusBarVisible?: boolean; // Whether the Android status bar should be visible
    backdropColor?: string; // You can customize the mask color - default is rgba(0, 0, 0, 0.4)
    verticalOffset?: number; // In order to adjust vertical position
    stopOnOutsideClick?: boolean; // Whether the tutorial should stop after clicking outside the step component
  };

  /**
   * Props received by walkthroughable components
   *
   * The components wrapped inside CopilotStep, will receive a copilot prop of type Object which the outermost rendered element
   * of the component or the element that you want the tooltip be shown around, must extend.
   *
   * Example walkthroughable custom component:
   *
   * const CustomComponent = ({ copilot }) => <View {...copilot}><Text>Hello world!</Text></View>;
   */
  export type WalkthroughableProps = {
    copilot?: Object;
  };

  /**
   * Props received by the screen component that you want to use copilot with.
   * This is the component that starts the copilot and manages the step flow
   */
  export type CopilotWrappedComponentProps = {
    copilotEvents: any; // a function to help you with tracking of tutorial progress
    currentStep: Step;
    visible: boolean;
    start: () => void; // Use this function in the root component in order to trigger the tutorial
  } & ComponentProps<any>;

  /**
   * Props of the copilot step element
   */
  export type CopilotStepProps = {
    name: string; // A unique name for the walkthrough step
    order: number; // A positive number indicating the order of the step in the entire walkthrough
    text: string; // The text shown as the description for the step
    active?: boolean; // If set to false the step is ignored
  };

  /**
   * Higher order component for the screen component that you want to use copilot with
   */
  export function copilot<P extends object>(
    props: CopilotOptions
  ): (
    wrappedComponent: ComponentType<P>
  ) => ComponentType<P & CopilotWrappedComponentProps>;

  /**
   * Higher order component to make walthroughable any built-in react native component
   * For custom components please use WalkthroughableProps
   */
  export function walkthroughable<P extends object>(
    wrappedComponent: ComponentType<P>
  ): (props: WalkthroughableProps & ComponentProps<any>) => ReactElement;

  /**
   * Element that wraps a walkthroughable component (built-in or custom)
   */
  export class CopilotStep extends Component<CopilotStepProps> {}
}
    