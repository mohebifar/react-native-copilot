import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  copilot,
  CopilotStep,
  TourGuideZone,
  CopilotWrapper,
  Step,
  defaultSvgPath,
  TourGuideZoneByPosition,
} from './src'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
})

interface Props {
  copilotEvents: any
  start(stepNumber?: number): void
}

function App({ copilotEvents, start }: Props) {
  const handleStepChange = (step: Step) =>
    console.log(`Current step is: ${step.name}`)

  React.useEffect(() => {
    copilotEvents.on('stepChange', handleStepChange)

    return () => {
      copilotEvents.off('*')
    }
  }, [])
  const iconProps = { size: 40, color: '#888' }
  return (
    <>
      <View style={styles.container}>
        <TourGuideZone zone={1} isTourGuide>
          <CopilotWrapper>
            <Text style={styles.title}>
              {'Welcome to the demo of\n"React Native Copilot"'}
            </Text>
          </CopilotWrapper>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TourGuideZone zone={6} isTourGuide>
            <CopilotWrapper>
              <Image
                source={{
                  uri:
                    'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg',
                }}
                style={styles.profilePhoto}
              />
            </CopilotWrapper>
          </TourGuideZone>

          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => start(4)}>
            <Text style={styles.buttonText}>step 4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TourGuideZone zone={2} isTourGuide>
            <CopilotWrapper>
              <Ionicons name='ios-contact' {...iconProps} />
            </CopilotWrapper>
          </TourGuideZone>
          <Ionicons name='ios-chatbubbles' {...iconProps} />
          <Ionicons name='ios-globe' {...iconProps} />
          <TourGuideZone zone={5} isTourGuide>
            <CopilotWrapper>
              <Ionicons name='ios-navigate' {...iconProps} />
            </CopilotWrapper>
          </TourGuideZone>
          <TourGuideZone zone={3} isTourGuide>
            <CopilotWrapper>
              <Ionicons name='ios-rainy' {...iconProps} />
            </CopilotWrapper>
          </TourGuideZone>
        </View>
      </View>
      <TourGuideZoneByPosition
        zone={4}
        isTourGuide
        top={100}
        left={70}
        width={200}
        height={300}
      />
    </>
  )
}

export default copilot({
  animated: true,
  svgMaskPath: ({ size, position, canvasSize, currentStepNumber }) => {
    const {
      // @ts-ignore
      x: { _value: posX },
      // @ts-ignore
      y: { _value: posY },
    } = position
    const {
      // @ts-ignore
      x: { _value: sizeX },
      // @ts-ignore
      y: { _value: sizeY },
    } = size
    if (currentStepNumber === 2 || currentStepNumber === 3) {
      const circleRadius = Math.max(sizeX, sizeY) / 2
      return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${posX - sizeX / 8},${
        posY + sizeY / 2
      }Z a${circleRadius} ${circleRadius} 0 1 0 ${
        circleRadius * 2
      } 0 ${circleRadius} ${circleRadius} 0 1 0 -${circleRadius * 2} 0`
    } else {
      return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${posX},${posY}H${
        posX + sizeX
      }V${posY + sizeY}H${posX}V${posY}Z`
    }
  },
  hideArrow: true,
  androidStatusBarVisible: false,
})(App)
