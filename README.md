<h1 align="center">React Native Copilot</h1>

<div align="center">
  <p align="center">
    <a href="https://github.com/mohebifar/react-native-copilot/actions/workflows/release.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/mohebifar/react-native-copilot/release.yml?branch=master&style=flat-square" alt="Build Status" />
    </a>
    <a href="https://www.npmjs.com/package/react-native-copilot">
      <img src="https://img.shields.io/npm/v/react-native-copilot.svg?style=flat-square" alt="NPM Version" />
    </a>
    <a href="https://www.npmjs.com/package/react-native-copilot">
      <img src="https://img.shields.io/npm/dm/react-native-copilot.svg?style=flat-square" alt="NPM Downloads" />
    </a>
  </p>
</div>

<p align="center">
  Step-by-step walkthrough for your react native app!
</p>

<p align="center">
  <img src="https://media.giphy.com/media/65VKIzGWZmHiEgEBi7/giphy.gif" alt="React Native Copilot" />
</p>

<p align="center">
  <a href="https://expo.io/@mohebifar/copilot-example" >
    Demo
  </a>
</p>

## Installation

```
yarn add react-native-copilot

# or with npm:

npm install --save react-native-copilot
```

**Optional**: If you want to have the smooth SVG animation, you should install and link [`react-native-svg`](https://github.com/software-mansion/react-native-svg).

## Usage

Wrap the portion of your app that you want to use copilot with inside `<CopilotProvider>`:

```js
import { CopilotProvider } from "react-native-copilot";

const AppWithCopilot = () => {
  return (
    <CopilotProvider>
      <HomeScreen />
    </CopilotProvider>
  );
};
```

**NOTE**: The old way of using copilot with the `copilot()` HOC maker is deprecated in v3. It will continue to work but it's not recommended and may be removed in the future.

Before defining walkthrough steps for your react elements, you must make them `walkthroughable`. The easiest way to do that for built-in react native components, is using the `walkthroughable` HOC. Then you must wrap the element with `CopilotStep`.

```jsx
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";

const CopilotText = walkthroughable(Text);

const HomeScreen = () => {
  return (
    <View>
      <CopilotStep text="This is a hello world example!" order={1} name="hello">
        <CopilotText>Hello world!</CopilotText>
      </CopilotStep>
    </View>
  );
};
```

Every `CopilotStep` must have these props:

1. **name**: A unique name for the walkthrough step.
2. **order**: A positive number indicating the order of the step in the entire walkthrough.
3. **text**: The text shown as the description for the step.

Additionally, a step may set the **active** prop, a boolean that controls whether the step is used or skipped.

In order to start the tutorial, you can call the `start` function from the `useCopilot` hook:

```js
const HomeScreen = () => {
  return (
    <View>
      <Button title="Start tutorial" onPress={() => start()} />
    </View>
  );
};
```

If you are looking for a working example, please check out [this link](https://github.com/mohebifar/react-native-copilot/blob/master/example/App.js).

### Overlays and animation

The overlay in react-native-copilot is the component that draws the dark transparent over the screen. React-native-copilot comes with two overlay options: `view` and `svg`.

The `view` overlay uses 4 rectangles drawn around the target element using the `<View />` component. We don't recommend using animation with this overlay since it's sluggish on some devices specially on Android.

The `svg` overlay uses an SVG path component for drawing the overlay. It offers a nice and smooth animation but it depends on `react-native-svg`. If you are using expo, you can install it using:

```
expo install react-native-svg
```

Or if you are using react-native-cli:

```
yarn add react-native-svg

# or with npm

npm install --save react-native-svg

cd ios && pod install
```

You can specify the overlay by passing the `overlay` prop to the `<CopilotProvider />` component:

```js
<CopilotProvider overlay="svg" {/* or "view" */}>
  <App />
</CopilotProvider>
```

By default, if overlay is not explicitly specified, the `svg` overlay will be used if `react-native-svg` is installed, otherwise the `view` overlay will be used.

### Custom tooltip and step number UI components

You can customize the tooltip and the step number components by passing a component to the `CopilotProvider` component. If you are looking for an example tooltip component, take a look at [the default ui implementations](https://github.com/mohebifar/react-native-copilot/blob/master/src/components/default-ui).

```js
const TooltipComponent = () => {
  const {
    isFirstStep,
    isLastStep,
    handleNext,
    handleNth,
    handlePrev,
    handleStop,
    currentStep,
  } = useCopilot();

  return (
    // ...
  )
};


<CopilotProvider tooltipComponent={TooltipComponent} stepNumberComponent={StepComponent}>
  <App />
</CopilotProvider>
```

### Navigating through the tour

The above code snippet shows the functions passed to the tooltip. These are your primary navigation functions. Some notes on navigation:

- `handleNext` and `handlePrev` will move the mask from the current wrapped component immediately to the next.

- You can use `handleStop` in conjunction with `handleNth` to effectively "pause" a tour, allowing for user input, animations or any other interaction that shouldn't have the mask applied. Once you want to pick the tour back up, call `handleNth` on the next tour step.

Note that `handleNth` is 1-indexed, which is in line with what your step orders should look like.

### Custom tooltip styling

You can customize tooltip's wrapper style:

```js
const style = {
  backgroundColor: "#9FA8DA",
  borderRadius: 10,
  paddingTop: 5,
};

<CopilotProvider tooltipStyle={style}>
  <App />
</CopilotProvider>;
```

#### Manage tooltip width

By default, the tooltip width is calculated dynamically. You can make it fixed-size by overriding both `width` and `maxWidth`, check the example bellow:

```js
const MARGIN = 8;
const WIDTH = Dimensions.get("window").width - 2 * MARGIN;

<CopioltProvider tooltipStyle={{ width: WIDTH, maxWidth: WIDTH, left: MARGIN }}>
  <App />
</CopilotProvider>;
```

### Custom tooltip arrow color

You can customize the tooltip's arrow color:

```js
<CopilotProvider arrowColor="#9FA8DA">
  <App />
</CopilotProvider>
```

### Custom overlay color

You can customize the mask color - default is `rgba(0, 0, 0, 0.4)`, by passing a color string to the `CopilotProvider` component.

```js
<CopilotProvider backdropColor="rgba(50, 50, 100, 0.9)">
  <App />
</CopilotProvider>
```

### Custom svg mask Path

You can customize the mask svg path by passing a function to the `CopilotProvider` component.

```ts
function SvgMaskPathFn(args: {
  size: Animated.valueXY;
  position: Animated.valueXY;
  canvasSize: {
    x: number;
    y: number;
  };
  step: Step;
}): string;
```

Example with circle:

```js
const circleSvgPath = ({ position, canvasSize }) =>
  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;

<CopilotProvider svgMaskPath={circleSvgPath}>
  <App />
</CopilotProvider>;
```

Example with different overlay for specific step:

Give name prop for the step

```js
<CopilotStep text="This is a hello world example!" order={1} name="hello">
  <CopilotText>Hello world!</CopilotText>
</CopilotStep>
```

Now you can return different svg path depending on step name

```js
const customSvgPath = (args) => {
  if (args.step?.name === "hello") {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
  } else {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${position.x._value + size.x._value}V${
      position.y._value + size.y._value
    }H${position.x._value}V${position.y._value}Z`;
  }
};

<CopilotProvider svgMaskPath={customSvgPath}>
  <App />
</CopilotProvider>;
```

### Custom components as steps

The components wrapped inside `CopilotStep`, will receive a `copilot` prop with a mutable `ref` and `onLayou` which the outermost rendered element of the component or the element that you want the tooltip be shown around, must extend.

```js
import { CopilotStep } from "react-native-copilot";

const CustomComponent = ({ copilot }) => (
  <View {...copilot}>
    <Text>Hello world!</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <View>
      <CopilotStep text="This is a hello world example!" order={1} name="hello">
        <CustomComponent />
      </CopilotStep>
    </View>
  );
};
```

### Custom labels (for i18n)

You can localize labels:

```js
<CopilotProvider
  labels={{
    previous: "Vorheriger",
    next: "Nächster",
    skip: "Überspringen",
    finish: "Beenden"
  }}
>
```

### Adjust vertical position

In order to adjust vertical position pass `verticalOffset` to the `CopilotProvider` component.

```js
<CopilotProvider verticalOffset={36}>
```

### Triggering the tutorial

Use `const {start} = useCopilot()` to trigger the tutorial. You can either invoke it with a touch event or in `useEffect` to start after the comopnent mounts. Note that the component and all its descendants must be mounted before starting the tutorial since the `CopilotStep`s need to be registered first.

### Usage inside a ScrollView

Pass the ScrollView reference as the second argument to the `start()` function.
eg `start(undefined, scrollViewRef)`

```js
import { ScrollView } from "react-native";

class HomeScreen {
  componentDidMount() {
    // Starting the tutorial and passing the scrollview reference.
    this.props.start(false, this.scrollView);
  }

  componentWillUnmount() {
    // Don't forget to disable event handlers to prevent errors
    this.props.copilotEvents.off("stop");
  }

  render() {
    <ScrollView ref={(ref) => (this.scrollView = ref)}>// ...</ScrollView>;
  }
}
```

### Listening to the events

`useCopilot` provides a `copilotEvents` function prop to allow you to track the progress of the tutorial. It utilizes [mitt](https://github.com/developit/mitt) under the hood.

List of available events is:

- `start` — Copilot tutorial has started.
- `stop` — Copilot tutorial has ended or skipped.
- `stepChange` — Next step is triggered. Passes [`Step`](https://github.com/mohebifar/react-native-copilot/blob/master/src/types.js#L2) instance as event handler argument.

**Example:**

```js
import { useCopilot } from "react-native-copilot";

const HomeScreen = () => {
  const { copilotEvents } = useCopilot();

  useEffect(() => {
    const listener = () => {
      // Copilot tutorial finished!
    };

    copilotEvents.on("stop", listener);

    return () => {
      copilotEvents.off("stop", listener)
    };
  }, []);

  return (
    // ...
  );
}
```

## Contributing

Issues and Pull Requests are always welcome.

If you are interested in becoming a maintainer, get in touch with us by sending an email or opening an issue. You should already have code merged into the project. Active contributors are encouraged to get in touch.

Creation of this project was sponsored by OK GROW!
