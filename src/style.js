// @flow
import { StyleSheet } from "react-native";

export const STEP_NUMBER_RADIUS: number = 14;
export const STEP_NUMBER_DIAMETER: number = STEP_NUMBER_RADIUS * 2;
export const ZINDEX: number = 100;
export const MARGIN: number = 13;
export const OFFSET_WIDTH: number = 4;

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: ZINDEX
  },
  arrow: {
    position: "absolute",
    borderColor: "transparent",
    borderWidth: 5
  },
  bottomToolTip: {
    bottom: 0
  },
  topToolTip: {
    top: 0
  },
  tooltip: {
    position: "absolute",
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 3,
    overflow: "hidden",
    width: "100%",
    height: 120
  },
  tooltipText: {},
  stepNumber: {
    position: "absolute",
    width: STEP_NUMBER_DIAMETER,
    height: STEP_NUMBER_DIAMETER,
    borderWidth: 2,
    borderRadius: STEP_NUMBER_RADIUS,
    borderColor: "#FFFFFF",
    backgroundColor: "#27ae60",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    zIndex: ZINDEX + 1
  },
  image: {
    width: 60,
    height: "100%"
  },
  stepNumberText: {
    fontSize: 10,
    backgroundColor: "transparent",
    color: "#FFFFFF"
  },
  button: {
    padding: 10
  },
  buttonText: {
    color: "#27ae60"
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  overlayRectangle: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
});
