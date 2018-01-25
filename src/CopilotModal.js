// @flow
import React, { Component } from "react";
import {
  Animated,
  Easing,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import Button from "./Button";
import styles, {
  MARGIN,
  STEP_NUMBER_DIAMETER,
  STEP_NUMBER_RADIUS
} from "./style";

type Props = {
  stop: () => void,
  next: () => void,
  prev: () => void,
  nextButton?: React$Element,
  prevButton?: React$Element,
  stopButton?: React$Element,
  finishButton?: React$Element,
  currentElementSize: number,
  currentStepNumber: number,
  currentStep: ?Step,
  visible: boolean,
  image: number,
  isFirstStep: boolean,
  isLastStep: boolean
};

type State = {
  tooltip: Object,
  arrow: Object,
  anim: Object,
  notAnimated: boolean,
  wrapperSize: number
};

class CopilotModal extends Component<Props, State> {
  static defaultProps = {
    nextButton: <Button>Next</Button>,
    prevButton: <Button>Previous</Button>,
    stopButton: <Button>Stop</Button>,
    finishButton: <Button>Finish</Button>
  };

  state = {
    tooltip: {},
    arrow: {},
    anim: {
      leftOverlayRightBoundary: new Animated.Value(0),
      rightOverlayLeftBoundary: new Animated.Value(0),
      verticalOverlayLeftBoundary: new Animated.Value(0),
      verticalOverlayRightBoundary: new Animated.Value(0),
      topOverlayBottomBoundary: new Animated.Value(0),
      bottomOverlayTopBoundary: new Animated.Value(0),
      top: new Animated.Value(0),
      stepNumberLeft: new Animated.Value(0)
    },
    animated: false,
    wrapperSize: 0
  };

  measure(): Promise {
    return new Promise((resolve, reject) => {
      this.wrapper.measure(
        (ox, oy, width, height, x, y) =>
          resolve({
            x,
            y,
            width,
            height
          }),
        reject
      );
    });
  }

  async animateMove(obj = {}): void {
    const duration = 300;
    let stepNumberLeft = obj.left - STEP_NUMBER_RADIUS;

    const layout = await this.measure();

    if (stepNumberLeft < 0) {
      stepNumberLeft = obj.left + obj.width - STEP_NUMBER_RADIUS;
      if (stepNumberLeft > layout.width - STEP_NUMBER_DIAMETER) {
        stepNumberLeft = layout.width - STEP_NUMBER_DIAMETER;
      }
    }

    const center = {
      x: obj.left + obj.width / 2,
      y: obj.top + obj.height / 2
    };

    const relativeToLeft = center.x;
    const relativeToTop = center.y;
    const relativeToBottom = Math.abs(center.y - layout.height);
    const relativeToRight = Math.abs(center.x - layout.width);

    const verticalPosition =
      relativeToBottom > relativeToTop ? "bottom" : "top";
    const horizontalPosition =
      relativeToLeft > relativeToRight ? "left" : "right";

    const tooltip = {};
    const arrow = {};

    if (verticalPosition === "bottom") {
      tooltip.top = obj.top + obj.height + MARGIN;
      arrow.borderBottomColor = "#fff";
      arrow.top = tooltip.top - (MARGIN + 3);
    } else {
      tooltip.bottom = layout.height - (obj.top + MARGIN);
      arrow.borderTopColor = "#fff";
      arrow.bottom = tooltip.bottom - (MARGIN + 3);
    }

    if (horizontalPosition === "left") {
      tooltip.right = Math.max(layout.width - (obj.left + obj.width), 0);
      tooltip.right =
        tooltip.right === 0 ? tooltip.right + MARGIN : tooltip.right;
      tooltip.maxWidth = layout.width - tooltip.right - MARGIN;
      arrow.right = tooltip.right + MARGIN;
    } else {
      tooltip.left = Math.max(obj.left, 0);
      tooltip.left = tooltip.left === 0 ? tooltip.left + MARGIN : tooltip.left;
      tooltip.maxWidth = layout.width - tooltip.left - MARGIN;
      arrow.left = tooltip.left + MARGIN;
    }

    const animate = {
      leftOverlayRightBoundary: layout.width - obj.left,
      rightOverlayLeftBoundary: obj.left + obj.width,
      verticalOverlayLeftBoundary: obj.left,
      verticalOverlayRightBoundary: layout.width - obj.left - obj.width,
      topOverlayBottomBoundary: layout.height - obj.top,
      bottomOverlayTopBoundary: obj.top + obj.height,
      top: obj.top,
      stepNumberLeft
    };

    if (this.state.animated) {
      Animated.parallel(
        Object.keys(animate).map(key =>
          Animated.timing(this.state.anim[key], {
            duration,
            toValue: animate[key],
            easing: Easing.linear
          })
        )
      ).start();
    } else {
      Object.keys(animate).forEach(key => {
        this.state.anim[key].setValue(animate[key]);
      });
    }

    this.setState({
      tooltip,
      arrow
      // FIXME: Animation is sluggish on Android
      // animated: true,
    });
  }

  componentDidMount() {
    //console.log('measure', this.wrapper);
  }

  render() {
    return this.props.visible ? (
      <View
        style={styles.container}
        ref={element => {
          this.wrapper = element;
        }}
        onLayout={() => {
          this.wrapper.measure((ox, oy, width, height, x, y) => {
            const wrapperMeasure = { ox, oy, width, height, x, y };
            this.setState({ wrapperSize: wrapperMeasure.height });
          });
        }}
      >
        <Animated.View
          style={[
            styles.overlayRectangle,
            { right: this.state.anim.leftOverlayRightBoundary }
          ]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            { left: this.state.anim.rightOverlayLeftBoundary }
          ]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              top: this.state.anim.bottomOverlayTopBoundary,
              left: this.state.anim.verticalOverlayLeftBoundary,
              right: this.state.anim.verticalOverlayRightBoundary
            }
          ]}
        />
        <Animated.View
          style={[
            styles.overlayRectangle,
            {
              bottom: this.state.anim.topOverlayBottomBoundary,
              left: this.state.anim.verticalOverlayLeftBoundary,
              right: this.state.anim.verticalOverlayRightBoundary
            }
          ]}
        />

        <Animated.View
          style={[
            styles.stepNumber,
            {
              left: this.state.anim.stepNumberLeft,
              top: Animated.add(this.state.anim.top, -STEP_NUMBER_RADIUS)
            }
          ]}
        >
          <Text style={[styles.stepNumberText]}>
            {this.props.currentStepNumber}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.arrow, this.state.arrow]} />
        <Animated.View
          style={[
            styles.tooltip,
            this.props.currentElementSize > this.state.wrapperSize / 2
              ? styles.topToolTip
              : styles.bottomToolTip
          ]}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image source={this.props.image} style={styles.image} />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                paddingBottom: 15
              }}
            >
              <View>
                <Text style={styles.tooltipText}>
                  {this.props.currentStep.text}
                </Text>
              </View>

              <View style={[styles.bottomBar]}>
                {!this.props.isLastStep ? (
                  <TouchableOpacity onPress={this.props.stop}>
                    {this.props.stopButton}
                  </TouchableOpacity>
                ) : null}
                {!this.props.isFirstStep ? (
                  <TouchableOpacity onPress={this.props.prev}>
                    {this.props.prevButton}
                  </TouchableOpacity>
                ) : null}
                {!this.props.isLastStep ? (
                  <TouchableOpacity onPress={this.props.next}>
                    {this.props.nextButton}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={this.props.stop}>
                    {this.props.finishButton}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    ) : null;
  }
}

export default CopilotModal;
