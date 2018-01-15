# React Native Copilot

[![Build Status](https://semaphoreci.com/api/v1/okgrow/react-native-co-pilot/branches/master/badge.svg)](https://semaphoreci.com/okgrow/react-native-co-pilot)

> Step-by-step walkthrough for your react native app

![React Native Copilot](https://img11.hostingpics.net/pics/384088ezgif164977b0fa3.gif)

[Demo](https://expo.io/@mohebifar/copilot-example)

## Installation
```
npm install --save @okgrow/react-native-copilot
```

## Usage
Use the `copilot()` higher order component for the screen component that you want to use copilot with:

```js
import { copilot } from '@okgrow/react-native-copilot';

class HomeScreen extends Component { /* ... */ }

export default copilot()(HomeScreen);
```

Before defining walkthrough steps for your react elements, you must make them `walkthroughable`. The easiest way to do that for built-in react native components, is using the `walkthroughable` HOC. Then you must wrap the element with `CopilotStep`.

```js
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

const CopilotText = walkthroughable(Text);

class HomeScreen {
  render() {
    return (
      <View>
        <CopilotStep text="This is a hello world example!" order={1} name="hello">
          <CopilotText>Hello world!</CopilotText>
        </CopilotStep>
      </View>
    );
  }
}
```

Every `CopilotStep` must have these props:

1. **name**: A unique name for the walkthrough step.
2. **order**: A positive number indicating the order of the step in the entire walkthrough.
3. **text**: The text shown as the description for the step.

### Custom components as steps
The components wrapped inside `CopilotStep`, will receive a `copilot` prop of type `Object` which the outermost rendered element of the component or the element that you want the tooltip be shown around, must extend.

```js
import { copilot, CopilotStep } from '@okgrow/react-native-copilot';

const CustomComponent = ({ copilot }) => <View {...copilot}><Text>Hello world!</Text></View>;

class HomeScreen {
  render() {
    return (
      <View>
        <CopilotStep text="This is a hello world example!" order={1} name="hello">
          <CustomComponent />
        </CopilotStep>
      </View>
    );
  }
}
```

## Contributing
Issues and Pull Requests are always welcome.

Please read OK GROW!'s global [contribution guidelines](https://okgrow.github.io/guides/docs/open-source-contributing.html).

If you are interested in becoming a maintainer, get in touch with us by sending an email or opening an issue. You should already have code merged into the project. Active contributors are encouraged to get in touch.

Please note that all interactions in @okgrow's repos should follow our [Code of Conduct](https://okgrow.github.io/guides/docs/open-source-code-of-conduct.html).

## License

[MIT](LICENSE) © 2017 OK GROW!, https://www.okgrow.com.
