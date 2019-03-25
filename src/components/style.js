// @flow
import { StyleSheet } from 'react-native';

export const STEP_NUMBER_RADIUS: number = 14;
export const STEP_NUMBER_DIAMETER: number = STEP_NUMBER_RADIUS * 2;
export const ZINDEX: number = 100;
export const MARGIN: number = 15;
export const OFFSET_WIDTH: number = 4;
export const ARROW_SIZE: number = 6;

export default StyleSheet.create({
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
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tooltipText: {
    color: '#596284',
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
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 2,
    // borderRadius: STEP_NUMBER_RADIUS,
    // borderColor: '#FFFFFF',
    // backgroundColor: '#27ae60',
  },
  stepNumberText: {
    // fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#2B6DEF',
    fontWeight: 'bold',
  },
  buttonSkipText: {
    color: '#8089A3',
  },
  bottomBar: {
    marginTop: 20,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBarButtons: {
    flexDirection: 'row',
    marginTop: -10,
    marginRight: -10,
    marginBottom: -10,
    marginLeft: -10,
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
