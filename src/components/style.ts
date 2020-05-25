import { StyleSheet } from 'react-native'

export const STEP_NUMBER_RADIUS: number = 14
export const STEP_NUMBER_DIAMETER: number = STEP_NUMBER_RADIUS * 2
export const Z_INDEX: number = 100
export const MARGIN: number = 13
export const OFFSET_WIDTH: number = 4
export const ARROW_SIZE: number = 6

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: Z_INDEX,
  },
  arrow: {
    position: 'absolute',
    borderColor: 'transparent',
    borderWidth: ARROW_SIZE,
  },
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 15,
    overflow: 'hidden',
    width: '100%',
    borderRadius: 16,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  tooltipText: {
    textAlign: 'center',
  },
  tooltipContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  stepNumberContainer: {
    position: 'absolute',
    width: STEP_NUMBER_DIAMETER,
    height: STEP_NUMBER_DIAMETER,
    overflow: 'hidden',
    zIndex: Z_INDEX + 1,
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
})
