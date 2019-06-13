Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@eanota 
2
13
868 142 mohebifar/react-native-copilot
 Code  Issues 32  Pull requests 10  Projects 0  Wiki  Security  Insights
react-native-copilot/src/components/CopilotModal.js
@iamsoorena iamsoorena Fix unresolved left/right values for Tooltip Component
dab9793 on Sep 2, 2018
@mohebifar @ohtangza @iamsoorena @arrygoo @danielang
331 lines (291 sloc)  8.48 KB
  
// @flow
import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  NativeModules,
  Modal,
  StatusBar,
  Platform,
  I18nManager,
} from 'react-native';
import Tooltip from './Tooltip';
import StepNumber from './StepNumber';
import styles, { MARGIN, ARROW_SIZE, STEP_NUMBER_DIAMETER, STEP_NUMBER_RADIUS } from './style';

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
  stepNumberComponent: ?React$Component,
  overlay: 'svg' | 'view',
  animated: boolean,
  androidStatusBarVisible: boolean,
  backdropColor: string,
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

const rtl = I18nManager.isRTL;
const start = rtl ? 'right' : 'left';
const end = rtl ? 'left' : 'right';

class CopilotModal extends Component<Props, State> {
  static defaultProps = {
    easing: Easing.elastic(0.7),
    animationDuration: 400,
    tooltipComponent: Tooltip,
    stepNumberComponent: StepNumber,
    // If react-native-svg native module was avaialble, use svg as the default overlay component
    overlay: typeof NativeModules.RNSVGSvgViewManager !== 'undefined' ? 'svg' : 'view',
    // If animated was not specified, rely on the default overlay type
    animated: typeof NativeModules.RNSVGSvgViewManager !== 'undefined',
    androidStatusBarVisible: false,
    backdropColor: 'rgba(0, 0, 0, 0.4)'
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

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.visible === true && nextProps.visible === false) {
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

    let stepNumberLeft;

    const edgeCase = (stepLeft) => {
      if (stepLeft > layout.width - STEP_NUMBER_DIAMETER) {
        return layout.width - STEP_NUMBER_DIAMETER;
      }
      return stepLeft;
    };

    if (!rtl) {
      stepNumberLeft = obj.left - STEP_NUMBER_RADIUS;

      if (stepNumberLeft < 0) {
        stepNumberLeft = (obj.left + obj.width) - STEP_NUMBER_RADIUS;
        stepNumberLeft = edgeCase(stepNumberLeft);
      }
    } else {
      stepNumberLeft = (obj.left + obj.width) - STEP_NUMBER_RADIUS;
      if (stepNumberLeft > layout.width) {
        stepNumberLeft = obj.left - STEP_NUMBER_RADIUS;
        stepNumberLeft = edgeCase(stepNumberLeft);
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
      arrow.borderBottomColor = '#fff';
      arrow.top = tooltip.top - (ARROW_SIZE * 2);
    } else {
      tooltip.bottom = layout.height - (obj.top - MARGIN);
      arrow.borderTopColor = '#fff';
      arrow.bottom = tooltip.bottom - (ARROW_SIZE * 2);
    }

    if (horizontalPosition === 'left') {
      tooltip[end] = Math.max(layout.width - (obj.left + obj.width), 0);
      tooltip[end] = tooltip[end] === 0 ? tooltip[end] + MARGIN : tooltip[end];
      tooltip.maxWidth = layout.width - tooltip[end] - MARGIN;
      arrow[end] = tooltip[end] + MARGIN;
    } else {
      tooltip[start] = Math.max(obj.left, 0);
      tooltip[start] = tooltip.left === 0 ? tooltip[start] + MARGIN : tooltip[start];
      tooltip.maxWidth = layout.width - tooltip[start] - MARGIN;
      arrow[start] = tooltip[start] + MARGIN;
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
            [start]: this.state.animatedValues.stepNumberLeft,
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
      <Animated.View key="tooltip" style={[styles.tooltip, this.state.tooltip]}>
        <TooltipComponent
          isFirstStep={this.props.isFirstStep}
          isLastStep={this.props.isLastStep}
          currentStep={this.props.currentStep}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          handleStop={this.handleStop}
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
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
