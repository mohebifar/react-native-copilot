import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import walkthroughable from './walkthroughable';

const WalkthroughableView = walkthroughable(View);
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableScrollView = walkthroughable(ScrollView);
const WalkthroughableTextInput = walkthroughable(TextInput);

const walkthroughableComponents = [
  WalkthroughableView,
  WalkthroughableText,
  WalkthroughableScrollView,
  WalkthroughableTextInput,
];

const nativeComponents = [
  View,
  Text,
  ScrollView,
  TextInput,
];

it('spreads the copilot prop object on the wrapped component', () => {
  const tree = renderer.create(
    <WalkthroughableView
      copilot={{ keyForNum: 1, keyForStr: 'hello' }}
    />,
  );

  const { props } = tree.root.findByType(View);

  expect(props.keyForNum).toBe(1);
  expect(props.keyForStr).toBe('hello');
});

it('spreads the copilot prop object on the wrapped component along with other flat props', () => {
  const tree = renderer.create(
    <WalkthroughableView
      copilot={{ keyForNum: 1, keyForStr: 'hello' }}
      otherProp="the other prop"
    />,
  );

  const { props } = tree.root.findByType(View);

  expect(props.keyForNum).toBe(1);
  expect(props.keyForStr).toBe('hello');
  expect(props.otherProp).toBe('the other prop');
});

it('spreads the copilot prop object on the wrapped component not overriding the root props', () => {
  const tree = renderer.create(
    <WalkthroughableView
      copilot={{ keyForNum: 1, keyForStr: 'hello' }}
      keyForNum={2}
    />,
  );

  const { props } = tree.root.findByType(View);

  expect(props.keyForNum).toBe(2);
  expect(props.keyForStr).toBe('hello');
});

it('works with all types of react native built-in components', () => {
  nativeComponents.forEach((Component, key) => {
    const WalkthroughableComponent = walkthroughableComponents[key];

    const tree = renderer.create(
      <WalkthroughableComponent
        copilot={{ keyForNum: 1, keyForStr: 'hello' }}
      />,
    );

    const { props } = tree.root.findByType(Component);

    expect(props.keyForNum).toBe(1);
    expect(props.keyForStr).toBe('hello');
  });
});
