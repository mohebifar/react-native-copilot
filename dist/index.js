'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var reactNative = require('react-native');
var mitt = require('mitt');
var hoistStatics = require('hoist-non-react-statics');
var Svg = require('react-native-svg');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);
var hoistStatics__default = /*#__PURE__*/_interopDefaultLegacy(hoistStatics);
var Svg__default = /*#__PURE__*/_interopDefaultLegacy(Svg);

// @flow

const STEP_NUMBER_RADIUS = 14;
const STEP_NUMBER_DIAMETER = STEP_NUMBER_RADIUS * 2;
const ZINDEX = 100;
const MARGIN = 13;
const OFFSET_WIDTH = 4;
const ARROW_SIZE = 6;

var styles = reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: ZINDEX,
  },
  arrow: {
    position: 'absolute',
    borderColor: 'transparent',
    borderWidth: ARROW_SIZE,
  },
  tooltip: {
    position: 'absolute',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tooltipText: {

  },
  tooltipContainer: {
    flex: 1,
  },
  stepNumberContainer: {
    position: 'absolute',
    width: STEP_NUMBER_DIAMETER,
    height: STEP_NUMBER_DIAMETER,
    overflow: 'hidden',
    zIndex: ZINDEX + 1,
  },
  stepNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: STEP_NUMBER_RADIUS,
    borderColor: '#FFFFFF',
    backgroundColor: '#27ae60',
  },
  stepNumberText: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#27ae60',
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  overlayRectangle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  overlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

const _jsxFileName = "/Users/maxhudson/repos/react-native-copilot/src/components/Button.js";// @flow

const Button = ({ wrapperStyle, style, ...rest }) => (
  React__default['default'].createElement(reactNative.View, { style: [styles.button, wrapperStyle], __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 8}}
    , React__default['default'].createElement(reactNative.Text, { style: [styles.buttonText, style], ...rest, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 9}} )
  )
);

const _jsxFileName$1 = "/Users/maxhudson/repos/react-native-copilot/src/components/Tooltip.js";// @flow

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => (
  React__default['default'].createElement(reactNative.View, {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 18}}
    , React__default['default'].createElement(reactNative.View, { style: styles.tooltipContainer, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 19}}
      , React__default['default'].createElement(reactNative.Text, { testID: "stepDescription", style: styles.tooltipText, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 20}}, currentStep.text)
    )
    , React__default['default'].createElement(reactNative.View, { style: [styles.bottomBar], __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 22}}
      , 
        !isLastStep ?
          React__default['default'].createElement(reactNative.TouchableOpacity, { onPress: handleStop, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 25}}
            , React__default['default'].createElement(Button, {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 26}}, labels.skip || 'Skip')
          )
          : null
      
      , 
        !isFirstStep ?
          React__default['default'].createElement(reactNative.TouchableOpacity, { onPress: handlePrev, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 32}}
            , React__default['default'].createElement(Button, {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 33}}, labels.previous || 'Previous')
          )
          : null
      
      , 
        !isLastStep ?
          React__default['default'].createElement(reactNative.TouchableOpacity, { onPress: handleNext, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 39}}
            , React__default['default'].createElement(Button, {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 40}}, labels.next || 'Next')
          ) :
          React__default['default'].createElement(reactNative.TouchableOpacity, { onPress: handleStop, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 42}}
            , React__default['default'].createElement(Button, {__self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 43}}, labels.finish || 'Finish')
          )
      
    )
  )
);

const _jsxFileName$2 = "/Users/maxhudson/repos/react-native-copilot/src/components/AnimatedPath.js";
class SvgPathWrap extends React.Component {constructor(...args) { super(...args); SvgPathWrap.prototype.__init.call(this); }
  __init() {this.setNativeProps = (props) => {
    if (this._component) {
      this._component.setNativeProps(props);
    }
  };}

  render() {
    return (
      React__default['default'].createElement(Svg.Path, {
        ref: (component) => { this._component = component; },
        ...this.props, __self: this, __source: {fileName: _jsxFileName$2, lineNumber: 15}}
      )
    );
  }
}

const AnimatedSvgPath = reactNative.Animated.createAnimatedComponent(SvgPathWrap);

const _jsxFileName$3 = "/Users/maxhudson/repos/react-native-copilot/src/components/SvgMask.js";// @flow

const windowDimensions = reactNative.Dimensions.get('window');
const defaultSvgPath = ({ size, position, canvasSize }) => `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;

const rtl = reactNative.I18nManager.isRTL;
const start = rtl ? 'right' : 'left';
const end = rtl ? 'left' : 'right';

class SvgMask extends React.Component {
  static __initStatic() {this.defaultProps = {
    animationDuration: 300,
    easing: reactNative.Easing.linear,
    svgMaskPath: defaultSvgPath,
  };}

  static __initStatic2() {this.contextTypes = {
    _copilot: PropTypes__default['default'].object,
  };}

  constructor(props) {
    super(props);SvgMask.prototype.__init.call(this);SvgMask.prototype.__init2.call(this);SvgMask.prototype.__init3.call(this);
    this.state = {
      canvasSize: {
        x: windowDimensions.width,
        y: windowDimensions.height,
      },
      size: new reactNative.Animated.ValueXY(props.size),
      position: new reactNative.Animated.ValueXY(props.position),
    };

    this.state.position.addListener(this.animationListener);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position || prevProps.size !== this.props.size) {
      this.animate(this.props.size, this.props.position);
    }
  }

  __init() {this.animationListener = () => {
    const d = this.props.svgMaskPath({
      size: this.state.size,
      position: this.state.position,
      canvasSize: this.state.canvasSize,
      step: this.props.currentStep,
    });
    if (this.mask) {
      this.mask.setNativeProps({ d });
    }
  };}

  __init2() {this.animate = (size = this.props.size, position = this.props.position) => {
    if (this.props.animated) {
      reactNative.Animated.parallel([
        reactNative.Animated.timing(this.state.size, {
          toValue: size,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: false,
        }),
        reactNative.Animated.timing(this.state.position, {
          toValue: position,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      this.state.size.setValue(size);
      this.state.position.setValue(position);
    }
  };}

  __init3() {this.handleLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.setState({
      canvasSize: {
        x: width,
        y: height,
      },
    });
  };}

  render() {
    const { onPress } = this.context._copilot.getCurrentStep().target.props; // @symbolic

    return (
      React__default['default'].createElement(reactNative.View, {
        style: this.props.style,
        onLayout: this.handleLayout,
        onStartShouldSetResponder: this.props.onClick, __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 101}}
      
        , 
          this.state.canvasSize
            ? (
              React__default['default'].createElement(Svg__default['default'], { pointerEvents: "none", width: this.state.canvasSize.x, height: this.state.canvasSize.y, __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 109}}
                , React__default['default'].createElement(AnimatedSvgPath, {
                  ref: (ref) => { this.mask = ref; },
                  fill: this.props.backdropColor,
                  fillRule: "evenodd",
                  strokeWidth: 1,
                  d: this.props.svgMaskPath({
                    size: this.state.size,
                    position: this.state.position,
                    canvasSize: this.state.canvasSize,
                    step: this.props.currentStep,
                  }), __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 110}}
                )
              )
            )
            : null
        
        , onPress && (React__default['default'].createElement(reactNative.TouchableOpacity, {
          style: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'red',
            [start]: this.props.position.x,
            [end]: (this.props.layout.width - (this.props.size.x + this.props.position.x)),
            top: this.props.position.y,
            width: this.props.size.x,
            height: this.props.size.y,
          },
          onPress: () => {
            onPress();

            this.props.handleStop(); // @symbolic
          }, __self: this, __source: {fileName: _jsxFileName$3, lineNumber: 126}}
        ))
      )
    );
  }
} SvgMask.__initStatic(); SvgMask.__initStatic2();

const _jsxFileName$4 = "/Users/maxhudson/repos/react-native-copilot/src/components/ViewMask.js";// @flow

const rtl$1 = reactNative.I18nManager.isRTL;
const start$1 = rtl$1 ? 'right' : 'left';
const end$1 = rtl$1 ? 'left' : 'right';

class ViewMask extends React.Component {constructor(...args) { super(...args); ViewMask.prototype.__init.call(this);ViewMask.prototype.__init2.call(this); }
  static __initStatic() {this.contextTypes = {
    _copilot: PropTypes__default['default'].object,
  };}

  __init() {this.state = {
    size: new reactNative.Animated.ValueXY({ x: 0, y: 0 }),
    position: new reactNative.Animated.ValueXY({ x: 0, y: 0 }),
  };}

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position || this.props.size !== nextProps.size) {
      this.animate(nextProps.size, nextProps.position);
    }
  }

  __init2() {this.animate = (size = this.props.size, position = this.props.position) => {
    if (this.state.animated) {
      reactNative.Animated.parallel([
        reactNative.Animated.timing(this.state.size, {
          toValue: size,
          duration: this.props.animationDuration,
          easing: this.props.easing,
        }),
        reactNative.Animated.timing(this.state.position, {
          toValue: position,
          duration: this.props.animationDuration,
          easing: this.props.easing,
        }),
      ]).start();
    } else {
      this.state.size.setValue(size);
      this.state.position.setValue(position);
      this.setState({ animated: this.props.animated });
    }
  };}

  render() {
    const { onPress } = this.context._copilot.getCurrentStep().target.props; // @symbolic
    const { size, position } = this.state;
    const width = this.props.layout ? this.props.layout.width : 500;
    const height = this.props.layout ? this.props.layout.height : 500;

    const leftOverlayRight = reactNative.Animated.add(width, reactNative.Animated.multiply(position.x, -1));
    const rightOverlayLeft = reactNative.Animated.add(size.x, position.x);
    const bottomOverlayTopBoundary = reactNative.Animated.add(size.y, position.y);
    const topOverlayBottomBoundary = reactNative.Animated.add(height, reactNative.Animated.multiply(-1, position.y));
    const verticalOverlayLeftBoundary = position.x;
    const verticalOverlayRightBoundary = reactNative.Animated.add(
      width, reactNative.Animated.multiply(-1, rightOverlayLeft),
    );

    return (
      React__default['default'].createElement(reactNative.View, { style: this.props.style, __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 64}}
        , React__default['default'].createElement(reactNative.Animated.View, {
          style: [
            styles.overlayRectangle,
            {
              [end$1]: leftOverlayRight,
            }], __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 65}}
        )
        , React__default['default'].createElement(reactNative.Animated.View, {
          style: [
            styles.overlayRectangle,
            {
              [start$1]: rightOverlayLeft,
            }], __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 72}}
        )
        , React__default['default'].createElement(reactNative.Animated.View, {
          style: [
            styles.overlayRectangle,
            {
              top: bottomOverlayTopBoundary,
              [start$1]: verticalOverlayLeftBoundary,
              [end$1]: verticalOverlayRightBoundary,
            },
          ], __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 79}}
        )
        , React__default['default'].createElement(reactNative.Animated.View, {
          style: [
            styles.overlayRectangle,
            {
              bottom: topOverlayBottomBoundary,
              [start$1]: verticalOverlayLeftBoundary,
              [end$1]: verticalOverlayRightBoundary,
            },
          ], __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 89}}
        )
        , onPress && (React__default['default'].createElement(reactNative.TouchableOpacity, {
          style: {
            backgroundColor: 'transparent',
            [start$1]: this.props.position.x,
            [end$1]: (this.props.layout.width - (this.props.size.x + this.props.position.x)),
            top: this.props.position.y,
            width: this.props.size.x,
            height: this.props.size.y,
          },
          onPress: () => {
            onPress();

            this.props.handleStop(); // @symbolic
          }, __self: this, __source: {fileName: _jsxFileName$4, lineNumber: 99}}
        ))
      )
    );
  }
} ViewMask.__initStatic();

const _jsxFileName$5 = "/Users/maxhudson/repos/react-native-copilot/src/components/StepNumber.js";// @flow

const StepNumber = ({
  currentStepNumber,
}) => (
  React__default['default'].createElement(reactNative.View, { style: styles.stepNumber, __self: undefined, __source: {fileName: _jsxFileName$5, lineNumber: 10}}
    , React__default['default'].createElement(reactNative.Text, { style: [styles.stepNumberText], __self: undefined, __source: {fileName: _jsxFileName$5, lineNumber: 11}}, currentStepNumber)
  )
);

const _jsxFileName$6 = "/Users/maxhudson/repos/react-native-copilot/src/components/CopilotModal.js";
const noop = () => {};

class CopilotModal extends React.Component {constructor(...args) { super(...args); CopilotModal.prototype.__init.call(this);CopilotModal.prototype.__init2.call(this);CopilotModal.prototype.__init3.call(this);CopilotModal.prototype.__init4.call(this);CopilotModal.prototype.__init5.call(this);CopilotModal.prototype.__init6.call(this);CopilotModal.prototype.__init7.call(this); }
  static __initStatic() {this.defaultProps = {
    easing: reactNative.Easing.elastic(0.7),
    animationDuration: 400,
    tooltipComponent: Tooltip,
    tooltipStyle: {},
    stepNumberComponent: StepNumber,
    // If react-native-svg native module was avaialble, use svg as the default overlay component
    overlay: typeof reactNative.NativeModules.RNSVGSvgViewManager !== 'undefined' ? 'svg' : 'view',
    // If animated was not specified, rely on the default overlay type
    animated: typeof reactNative.NativeModules.RNSVGSvgViewManager !== 'undefined',
    androidStatusBarVisible: false,
    backdropColor: 'rgba(0, 0, 0, 0.4)',
    labels: {},
    stopOnOutsideClick: false,
    arrowColor: '#fff',
  };}

  __init() {this.state = {
    tooltip: {},
    arrow: {},
    animatedValues: {
      top: new reactNative.Animated.Value(0),
      stepNumberLeft: new reactNative.Animated.Value(0),
    },
    animated: false,
    containerVisible: false,
  };}

  componentDidUpdate(prevProps) {
    if (prevProps.visible === true && this.props.visible === false) {
      this.reset();
    }
  }

  __init2() {this.layout = {
    width: 0,
    height: 0,
  };}

  __init3() {this.handleLayoutChange = ({ nativeEvent: { layout } }) => {
    this.layout = layout;
  };}

  measure() {
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

  async _animateMove(obj = {}) {
    const layout = await this.measure();
    if (!this.props.androidStatusBarVisible && reactNative.Platform.OS === 'android') {
      obj.top -= reactNative.StatusBar.currentHeight; // eslint-disable-line no-param-reassign
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
      reactNative.Animated
        .parallel(Object.keys(animate)
          .map(key => reactNative.Animated.timing(this.state.animatedValues[key], {
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

  animateMove(obj = {}) {
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

  reset() {
    this.setState({
      animated: false,
      containerVisible: false,
      layout: undefined,
    });
  }

  __init4() {this.handleNext = () => {
    this.props.next();
  };}

  __init5() {this.handlePrev = () => {
    this.props.prev();
  };}

  __init6() {this.handleStop = () => {
    //@symbolic
    if (global.copilotOptions && global.copilotOptions.onDone) global.copilotOptions.onDone();

    global.copilotIsActive = false;

    this.reset();
    this.props.stop();
  };}

  __init7() {this.handleMaskClick = () => {
    if (this.props.stopOnOutsideClick) {
      this.handleStop();
    }
  };}

  renderMask() {
    /* eslint-disable global-require */
    const MaskComponent = this.props.overlay === 'svg'
      ? SvgMask
      : ViewMask;
    /* eslint-enable */
    return (
      React__default['default'].createElement(MaskComponent, {
        animated: this.props.animated,
        layout: this.state.layout,
        style: styles.overlayContainer,
        size: this.state.size,
        position: this.state.position,
        easing: this.props.easing,
        animationDuration: this.props.animationDuration,
        backdropColor: this.props.backdropColor,
        svgMaskPath: this.props.svgMaskPath,
        onClick: this.handleMaskClick,
        currentStep: this.props.currentStep,
        handleStop: this.handleStop, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 216}}
      )
    );
  }

  renderTooltip() {
    const {
      tooltipComponent: TooltipComponent,
      stepNumberComponent: StepNumberComponent,
    } = this.props;

    return [
      React__default['default'].createElement(reactNative.Animated.View, {
        key: "stepNumber",
        style: [
          styles.stepNumberContainer,
          {
            left: this.state.animatedValues.stepNumberLeft,
            top: reactNative.Animated.add(this.state.animatedValues.top, -STEP_NUMBER_RADIUS),
          },
        ], __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 240}}
      
        , React__default['default'].createElement(StepNumberComponent, {
          isFirstStep: this.props.isFirstStep,
          isLastStep: this.props.isLastStep,
          currentStep: this.props.currentStep,
          currentStepNumber: this.props.currentStepNumber, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 250}}
        )
      ),
      React__default['default'].createElement(reactNative.Animated.View, { key: "arrow", style: [styles.arrow, this.state.arrow], __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 257}} ),
      React__default['default'].createElement(reactNative.Animated.View, { key: "tooltip", style: [styles.tooltip, this.state.tooltip, this.props.tooltipStyle], __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 258}}
        , React__default['default'].createElement(TooltipComponent, {
          isFirstStep: this.props.isFirstStep,
          isLastStep: this.props.isLastStep,
          currentStep: this.props.currentStep,
          handleNext: this.handleNext,
          handlePrev: this.handlePrev,
          handleStop: this.handleStop,
          labels: this.props.labels, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 259}}
        )
      ),
    ];
  }

  render() {
    const containerVisible = this.state.containerVisible || this.props.visible;
    const contentVisible = this.state.layout && containerVisible;

    return (
      React__default['default'].createElement(reactNative.Modal, {
        animationType: "none",
        visible: containerVisible,
        onRequestClose: noop,
        transparent: true,
        supportedOrientations: ['portrait', 'landscape'], __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 277}}
      
        , React__default['default'].createElement(reactNative.View, {
          style: styles.container,
          onLayout: this.handleLayoutChange, __self: this, __source: {fileName: _jsxFileName$6, lineNumber: 284}}
        
          , contentVisible && this.renderMask()
          , contentVisible && this.renderTooltip()
        )
      )
    );
  }
} CopilotModal.__initStatic();

// @flow

const getFirstStep = (steps) => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null);

const getLastStep = (steps) => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

const getStepNumber = (steps, step) => step
  && Object
    .values(steps)
    .filter(_step => _step.order <= step.order).length;

const getPrevStep = (steps, step) => Object
  .values(steps)
  .filter(_step => _step.order < step.order)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

const getNextStep = (steps, step) => Object
  .values(steps)
  .filter(_step => _step.order > step.order)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null) || step;

const _jsxFileName$7 = "/Users/maxhudson/repos/react-native-copilot/src/hocs/copilot.js";// @flow

/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120;

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
  arrowColor,
} = {}) =>
  (WrappedComponent) => {
    class Copilot extends React.Component {constructor(...args) { super(...args); Copilot.prototype.__init.call(this);Copilot.prototype.__init2.call(this);Copilot.prototype.__init3.call(this);Copilot.prototype.__init4.call(this);Copilot.prototype.__init5.call(this);Copilot.prototype.__init6.call(this);Copilot.prototype.__init7.call(this);Copilot.prototype.__init8.call(this);Copilot.prototype.__init9.call(this);Copilot.prototype.__init10.call(this);Copilot.prototype.__init11.call(this);Copilot.prototype.__init12.call(this);Copilot.prototype.__init13.call(this);Copilot.prototype.__init14.call(this);Copilot.prototype.__init15.call(this);Copilot.prototype.__init16.call(this);Copilot.prototype.__init17.call(this);Copilot.prototype.__init18.call(this);Copilot.prototype.__init19.call(this); }
      __init() {this.state = {
        steps: {},
        currentStep: null,
        visible: false,
        scrollView: null,
      };}

      getChildContext() {
        return {
          _copilot: {
            registerStep: this.registerStep,
            unregisterStep: this.unregisterStep,
            getCurrentStep: () => this.state.currentStep,
          },
        };
      }

      componentDidMount() {
        this.mounted = true;
      }

      componentWillUnmount() {
        this.mounted = false;
      }

      __init2() {this.getStepNumber = (step = this.state.currentStep) =>
        getStepNumber(this.state.steps, step);}

      __init3() {this.getFirstStep = () => getFirstStep(this.state.steps);}

      __init4() {this.getLastStep = () => getLastStep(this.state.steps);}

      __init5() {this.getPrevStep = (step = this.state.currentStep) =>
        getPrevStep(this.state.steps, step);}

      __init6() {this.getNextStep = (step = this.state.currentStep) =>
        getNextStep(this.state.steps, step);}

      __init7() {this.setCurrentStep = async (step, move = true) => {
        await this.setState({ currentStep });
        this.eventEmitter.emit('stepChange', step);

        if (this.state.scrollView) {
          const { scrollView } = this.state;
          await this.state.currentStep.wrapper.measureLayout(
            reactNative.findNodeHandle(scrollView), (x, y, w, h) => {
              const yOffsett = y > 0 ? y - (h / 2) : 0;
              scrollView.scrollTo({ y: yOffsett, animated: false });
            });
        }
        setTimeout(() => {
          if (move) {
            this.moveToCurrentStep();
          }
        }, this.state.scrollView ? 100 : 0);
      };}

      __init8() {this.setVisibility = (visible) => new Promise((resolve) => {
        reactNative.LayoutAnimation.configureNext({...reactNative.LayoutAnimation.Presets.easeInEaseOut});

        this.setState({ visible }, () => resolve());
      });}

      __init9() {this.startTries = 0;}

      __init10() {this.mounted = false;}

      __init11() {this.eventEmitter = mitt__default['default']();}

      __init12() {this.isFirstStep = () => this.state.currentStep === this.getFirstStep();}

      __init13() {this.isLastStep = () => this.state.currentStep === this.getLastStep();}

      __init14() {this.registerStep = (step) => {
        this.setState(({ steps }) => ({
          steps: {
            ...steps,
            [step.name]: step,
          },
        }));
      };}

      __init15() {this.unregisterStep = (stepName) => {
        if (!this.mounted) {
          return;
        }
        this.setState(({ steps }) => ({
          steps: Object.entries(steps)
            .filter(([key]) => key !== stepName)
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}),
        }));
      };}

      __init16() {this.next = async () => {
        reactNative.LayoutAnimation.configureNext({...reactNative.LayoutAnimation.Presets.easeInEaseOut});

        await this.setCurrentStep(this.getNextStep());
      };}

      __init17() {this.prev = async () => {
        reactNative.LayoutAnimation.configureNext({...reactNative.LayoutAnimation.Presets.easeInEaseOut});

        await this.setCurrentStep(this.getPrevStep());
      };}

      __init18() {this.start = async (fromStep, scrollView) => {
        const { steps } = this.state;

        if (!this.state.scrollView) {
          this.setState({ scrollView });
        }

        const currentStep = fromStep
          ? steps[fromStep]
          : this.getFirstStep();

        if (this.startTries > MAX_START_TRIES) {
          this.startTries = 0;
          return;
        }

        if (!currentStep) {
          this.startTries += 1;
          requestAnimationFrame(() => this.start(fromStep));
        } else {
          this.eventEmitter.emit('start');
          await this.setCurrentStep(currentStep);
          await this.moveToCurrentStep();
          await this.setVisibility(true);
          this.startTries = 0;
        }
      };}

      __init19() {this.stop = async () => {
        await this.setVisibility(false);
        this.eventEmitter.emit('stop');
      };}

      async moveToCurrentStep() {
        const size = await this.state.currentStep.target.measure();

        await this.modal.animateMove({
          width: size.width + OFFSET_WIDTH,
          height: size.height + OFFSET_WIDTH,
          left: size.x - (OFFSET_WIDTH / 2),
          top: (size.y - (OFFSET_WIDTH / 2)) + verticalOffset,
        });
      }

      render() {
        return (
          React__default['default'].createElement(reactNative.View, { style: wrapperStyle || { flex: 1 }, __self: this, __source: {fileName: _jsxFileName$7, lineNumber: 188}}
            , React__default['default'].createElement(WrappedComponent, {
              ...this.props,
              start: this.start,
              currentStep: this.state.currentStep,
              visible: this.state.visible,
              copilotEvents: this.eventEmitter, __self: this, __source: {fileName: _jsxFileName$7, lineNumber: 189}}
            )
            , React__default['default'].createElement(CopilotModal, {
              next: this.next,
              prev: this.prev,
              stop: this.stop,
              visible: this.state.visible,
              isFirstStep: this.isFirstStep(),
              isLastStep: this.isLastStep(),
              currentStepNumber: this.getStepNumber(),
              currentStep: this.state.currentStep,
              labels: labels,
              stepNumberComponent: stepNumberComponent,
              tooltipComponent: tooltipComponent,
              tooltipStyle: tooltipStyle,
              overlay: overlay,
              animated: animated,
              androidStatusBarVisible: androidStatusBarVisible,
              backdropColor: backdropColor,
              svgMaskPath: svgMaskPath,
              stopOnOutsideClick: stopOnOutsideClick,
              arrowColor: arrowColor,
              ref: (modal) => { this.modal = modal; }, __self: this, __source: {fileName: _jsxFileName$7, lineNumber: 196}}
            )
          )
        );
      }
    }

    Copilot.childContextTypes = {
      _copilot: PropTypes__default['default'].object.isRequired,
    };

    return hoistStatics__default['default'](Copilot, WrappedComponent);
  };

const _jsxFileName$8 = "/Users/maxhudson/repos/react-native-copilot/src/hocs/walkthroughable.js";// @flow

const walkthroughable = () => {
  return class WrappedComponent extends React__default['default'].Component {
    render() {
      var { copilot, ...props } = this.props;

      return (React__default['default'].createElement(WrappedComponent, { ...copilot, ...props, __self: this, __source: {fileName: _jsxFileName$8, lineNumber: 9}} ));
    }
  }
};

// @flow

class ConnectedCopilotStep extends React.Component {
  static __initStatic() {this.defaultProps = {
    active: true,
  };}

  componentDidMount() {
    if (this.props.active) {
      this.register();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        this.register();
      } else {
        this.unregister();
      }
    }
  }

  componentWillUnmount() {
    this.unregister();
  }

  setNativeProps(obj) {
    this.wrapper.setNativeProps(obj);
  }

  register() {
    this.props._copilot.registerStep({
      name: this.props.name,
      text: this.props.text,
      order: this.props.order,
      target: this,
      wrapper: this.wrapper,
    });
  }

  unregister() {
    this.props._copilot.unregisterStep(this.props.name);
  }

  measure() {
    if (typeof __TEST__ !== 'undefined' && __TEST__) { // eslint-disable-line no-undef
      return new Promise(resolve => resolve({
        x: 0, y: 0, width: 0, height: 0,
      }));
    }

    return new Promise((resolve, reject) => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (this.wrapper && this.wrapper.measure) {
          this.wrapper.measure(
            (ox, oy, width, height, x, y) => resolve({
              x, y, width, height,
            }),
            reject,
          );
        } else {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    });
  }

  render() {
    const copilot = {
      ref: (wrapper) => { this.wrapper = wrapper; },
      onLayout: () => { }, // Android hack
    };

    return React__default['default'].cloneElement(this.props.children, { copilot });
  }
} ConnectedCopilotStep.__initStatic();

// @flow

class CopilotStep extends React.Component {
  render() {
    const currentStep = this.context._copilot.getCurrentStep();

    return React.createElement(
      ConnectedCopilotStep,
      {
        ...this.props,
        _copilot: this.context._copilot,
        visible: currentStep && currentStep.name === this.props.name,
      },
    );
  }
}

exports.CopilotStep = CopilotStep;
exports.copilot = copilot;
exports.walkthroughable = walkthroughable;
