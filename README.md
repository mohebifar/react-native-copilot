# React Native Joyride

[![Build Status](https://semaphoreci.com/api/v1/mohebifar/react-native-joyride/branches/master/shields_badge.svg)](https://semaphoreci.com/mohebifar/react-native-joyride)
[![npm version](https://img.shields.io/npm/v/react-native-joyride.svg?style=flat-square)](https://www.npmjs.com/package/react-native-joyride)
[![npm downloads](https://img.shields.io/npm/dm/react-native-joyride.svg?style=flat-square)](https://www.npmjs.com/package/react-native-joyride)

> Step-by-step walkthrough for your react native app

![React Native Joyride](https://img11.hostingpics.net/pics/384088ezgif164977b0fa3.gif)

[Demo](https://expo.io/@mohebifar/joyride-example)

## Installation
```
npm install --save react-native-joyride
```

## Usage
Use the `joyride()` higher order component for the screen component that you want to use joyride with:

```js
import { joyride } from 'react-native-joyride';

class HomeScreen extends Component { /* ... */ }

export default joyride()(HomeScreen);
```

Before defining walkthrough steps for your react elements, you must make them `joyridable`. The easiest way to do that for built-in react native components, is using the `joyridable` HOC. Then you must wrap the element with `JoyrideStep`.

```js
import { joyride, joyridable, JoyrideStep } from 'react-native-joyride';

const JoyrideText = joyridable(Text);

class HomeScreen {
  render() {
    return (
      <View>
        <JoyrideStep text="This is a hello world example!" order={1} name="hello">
          <JoyrideText>Hello world!</JoyrideText>
        </JoyrideStep>
      </View>
    );
  }
}
```

Every `JoyrideStep` must have these props:

1. **name**: A unique name for the walkthrough step.
2. **order**: A positive number indicating the order of the step in the entire walkthrough.
3. **text**: The text shown as the description for the step.

### Custom components as steps
The components wrapped inside `JoyrideStep`, will receive a `joyride` prop of type `Object` which the outermost rendered element of the component or the element that you want the tooltip be shown around, must extend.

```js
import { joyride, JoyrideStep } from 'react-native-joyride';

const CustomComponent = ({ joyride }) => <View {...joyride}><Text>Hello world!</Text></View>;

class HomeScreen {
  render() {
    return (
      <View>
        <JoyrideStep text="This is a hello world example!" order={1} name="hello">
          <CustomComponent />
        </JoyrideStep>
      </View>
    );
  }
}
```

## Name
The name was inspired by "[React Joyride](https://github.com/gilbarbara/react-joyride)".

## Contributing
Issues and Pull Requests are always welcome.

Please read OK Grow's global [contribution guidelines](https://github.com/okgrow/guides/blob/master/open-source/contributing.md).

If you are interested in becoming a maintainer, get in touch with us by sending an email or opening an issue. You should already have code merged into the project. Active contributors are encouraged to get in touch.

Please note that all interactions in @okgrow's repos should follow our [Code of Conduct](https://github.com/okgrow/guides/blob/master/open-source/CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 2017 OK GROW!, https://www.okgrow.com.
