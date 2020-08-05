// @flow
import React, { Component } from 'react';
import { Animated, Easing, View, NativeModules, Modal, StatusBar, Platform } from 'react-native';
import Tooltip from './Tooltip';
import StepNumber from './StepNumber';
import styles, { MARGIN, ARROW_SIZE, STEP_NUMBER_DIAMETER, STEP_NUMBER_RADIUS } from './style';
import type { SvgMaskPathFn } from '../types';

type Props = {
  stop: () => void,
  next: () => void,
  prev: () => void,
  currentStepNumber: number,
  currentStep: ?Step,
  visible: boolean,
  isFirstStep: boolean,
  isLastStep: boolean,
  easing: ?func,
  animationDuration: ?number,
  tooltipComponent: ?React$Component,
  tooltipStyle?: Object,
  stepNumberComponent: ?React$Component,
  overlay: 'svg' | 'view',
  animated: boolean,
  androidStatusBarVisible: boolean,
  backdropColor: string,
  labels: Object,
  svgMaskPath?: SvgMaskPathFn,
  stopOnOutsideClick?: boolean,
  arrowColor?: string,
};

type State = {
  tooltip: Object,
  arrow: Object,
  animatedValues: Object,
  notAnimated: boolean,
  layout: ?{
    width: number,
    height: number,
  },
};

const noop = () => {};

class CopilotModal extends Component<Props, State> {
  static defaultProps = {
    easing: Easing.elastic(0.7),
    animationDuration: 400,
    tooltipComponent: Tooltip,
    tooltipStyle: {},
    stepNumberComponent: StepNumber,
    // If react-native-svg native module was avaialble, use svg as the default overlay component
    overlay: typeof NativeModules.RNSVGSvgViewManager !== 'undefined' ? 'svg' : 'view',
    // If animated was not specified, rely on the default overlay type
    animated: typeof NativeModules.RNSVGSvgViewManager !== 'undefined',
    androidStatusBarVisible: false,
    backdropColor: 'rgba(0, 0, 0, 0.4)',
    labels: {},
    stopOnOutsideClick: false,
    arrowColor: '#fff',
  };

  state = {
    tooltip: {},
    arrow: {},
    animatedValues: {
      top: new Animated.Value(0),
      stepNumberLeft: new Animated.Value(0),
    },
    animated: false,
    containerVisible: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible === true && this.props.visible === false) {
      this.reset();
    }
  }

  layout = {
    width: 0,
    height: 0,
  }

  handleLayoutChange = ({ nativeEvent: { layout } }) => {
    this.layout = layout;
  }

  measure(): Promise {
    if (typeof __TEST__ !== 'undefined' && __TEST__) { // eslint-disable-line no-undef
      return new Promise(resolve => resolve({
        x: 0, y: 0, width: 0, height: 0,
      }));
    }


    return new Promise((resolve) => {
      const setLayout = () => {
        if (this.layout.width !== 0) {
          resolve(this.layout);
        } else {
          requestAnimationFrame(setLayout);
        }
      };
      setLayout();
    });
  }

  async _animateMove(obj = {}): void {
    const layout = await this.measure();
    if (!this.props.androidStatusBarVisible && Platform.OS === 'android') {
      obj.top -= StatusBar.currentHeight; // eslint-disable-line no-param-reassign
    }

    let stepNumberLeft = obj.left - STEP_NUMBER_RADIUS;

    if (stepNumberLeft < 0) {
      stepNumberLeft = (obj.left + obj.width) - STEP_NUMBER_RADIUS;
      if (stepNumberLeft > layout.width - STEP_NUMBER_DIAMETER) {
        stepNumberLeft = layout.width - STEP_NUMBER_DIAMETER;
      }
    }

    const center = {
      x: obj.left + (obj.width / 2),
      y: obj.top + (obj.height / 2),
    };

    const relativeToLeft = center.x;
    const relativeToTop = center.y;
    const relativeToBottom = Math.abs(center.y - layout.height);
    const relativeToRight = Math.abs(center.x - layout.width);

    const verticalPosition = relativeToBottom > relativeToTop ? 'bottom' : 'top';
    const horizontalPosition = relativeToLeft > relativeToRight ? 'left' : 'right';

    const tooltip = {};
    const arrow = {};

    if (verticalPosition === 'bottom') {
      tooltip.top = obj.top + obj.height + MARGIN;
      arrow.borderBottomColor = this.props.arrowColor;
      arrow.top = tooltip.top - (ARROW_SIZE * 2);
    } else {
      tooltip.bottom = layout.height - (obj.top - MARGIN);
      arrow.borderTopColor = this.props.arrowColor;
      arrow.bottom = tooltip.bottom - (ARROW_SIZE * 2);
    }

    if (horizontalPosition === 'left') {
      tooltip.right = Math.max(layout.width - (obj.left + obj.width), 0);
      tooltip.right = tooltip.right === 0 ? tooltip.right + MARGIN : tooltip.right;
      tooltip.maxWidth = layout.width - tooltip.right - MARGIN;
      arrow.right = tooltip.right + MARGIN;
    } else {
      tooltip.left = Math.max(obj.left, 0);
      tooltip.left = tooltip.left === 0 ? tooltip.left + MARGIN : tooltip.left;
      tooltip.maxWidth = layout.width - tooltip.left - MARGIN;
      arrow.left = tooltip.left + MARGIN;
    }

    const animate = {
      top: obj.top,
      stepNumberLeft,
    };

    if (this.state.animated) {
      Animated
        .parallel(Object.keys(animate)
          .map(key => Animated.timing(this.state.animatedValues[key], {
            toValue: animate[key],
            duration: this.props.animationDuration,
            easing: this.props.easing,
            useNativeDriver: false,
          })))
        .start();
    } else {
      Object.keys(animate).forEach((key) => {
        this.state.animatedValues[key].setValue(animate[key]);
      });
    }

    this.setState({
      tooltip,
      arrow,
      layout,
      animated: this.props.animated,
      size: {
        x: obj.width,
        y: obj.height,
      },
      position: {
        x: Math.floor(Math.max(obj.left, 0)),
        y: Math.floor(Math.max(obj.top, 0)),
      },
    });
  }

  animateMove(obj = {}): void {
    return new Promise((resolve) => {
      this.setState(
        { containerVisible: true },
        () => requestAnimationFrame(async () => {
          await this._animateMove(obj);
          resolve();
        }),
      );
    });
  }

  reset(): void {
    this.setState({
      animated: false,
      containerVisible: false,
      layout: undefined,
    });
  }

  handleNext = () => {
    this.props.next();
  }

  handlePrev = () => {
    this.props.prev();
  }

  handleStop = () => {
    this.reset();
    this.props.stop();
  }

  handleMaskClick = () => {
    if (this.props.stopOnOutsideClick) {
      this.handleStop();
    }
  };

  renderMask() {
    /* eslint-disable global-require */
    const MaskComponent = this.props.overlay === 'svg'
      ? require('./SvgMask').default
      : require('./ViewMask').default;
    /* eslint-enable */
    return (
      <MaskComponent
        animated={this.props.animated}
        layout={this.state.layout}
        style={styles.overlayContainer}
        size={this.state.size}
        position={this.state.position}
        easing={this.props.easing}
        animationDuration={this.props.animationDuration}
        backdropColor={this.props.backdropColor}
        svgMaskPath={this.props.svgMaskPath}
        onClick={this.handleMaskClick}
      />
    );
  }

  renderTooltip() {
    const {
      tooltipComponent: TooltipComponent,
      stepNumberComponent: StepNumberComponent,
    } = this.props;

    return [
      <Animated.View
        key="stepNumber"
        style={[
          styles.stepNumberContainer,
          {
            left: this.state.animatedValues.stepNumberLeft,
            top: Animated.add(this.state.animatedValues.top, -STEP_NUMBER_RADIUS),
          },
        ]}
      >
        <StepNumberComponent
          isFirstStep={this.props.isFirstStep}
          isLastStep={this.props.isLastStep}
          currentStep={this.props.currentStep}
          currentStepNumber={this.props.currentStepNumber}
        />
      </Animated.View>,
      <Animated.View key="arrow" style={[styles.arrow, this.state.arrow]} />,
      <Animated.View key="tooltip" style={[styles.tooltip, this.state.tooltip, this.props.tooltipStyle]}>
        <TooltipComponent
          isFirstStep={this.props.isFirstStep}
          isLastStep={this.props.isLastStep}
          currentStep={this.props.currentStep}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          handleStop={this.handleStop}
          labels={this.props.labels}
        />
      </Animated.View>,
    ];
  }

  render() {
    const containerVisible = this.state.containerVisible || this.props.visible;
    const contentVisible = this.state.layout && containerVisible;

    return (
      <Modal
        animationType="none"
        visible={containerVisible}
        onRequestClose={noop}
        transparent
        supportedOrientations={['portrait', 'landscape']}
      >
        <View
          style={styles.container}
          onLayout={this.handleLayoutChange}
        >
          {contentVisible && this.renderMask()}
          {contentVisible && this.renderTooltip()}
        </View>
      </Modal>
    );
  }
}

export default CopilotModal;
