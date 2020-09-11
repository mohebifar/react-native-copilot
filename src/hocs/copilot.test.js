// @flow
import React from 'react';
import { View, Modal } from 'react-native';
import renderer from 'react-test-renderer';
import { copilot, walkthroughable, CopilotStep } from '../index';
import CopilotModal from '../components/CopilotModal';
import ViewMask from '../components/ViewMask';
import SvgMask from '../components/SvgMask';

const WalkthroughableView = walkthroughable(View);

type SampleComponentProps = {
  secondStepActive?: boolean
};

const SampleComponent = ({ secondStepActive }: SampleComponentProps) => (
  <View>
    <CopilotStep order={0} name="step-1" text="This is the description for the first step">
      <WalkthroughableView />
    </CopilotStep>
    <CopilotStep order={1} name="step-2" active={secondStepActive} text="This is the description for the second step">
      <WalkthroughableView />
    </CopilotStep>
    <CopilotStep order={3} name="step-3" text="This is the description for the third step">
      <WalkthroughableView />
    </CopilotStep>
  </View>
);

SampleComponent.defaultProps = {
  secondStepActive: true,
};

it('only renders the component within a wrapper as long as tutorial has not been started', () => {
  const CopilotComponent = copilot()(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  const modal = tree.root.findByType(CopilotModal).findByType(Modal);

  expect(modal.props.visible).toBeFalsy();
});

it('renders the modal once the tutorial is started', async () => {
  const CopilotComponent = copilot()(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();

  const modal = tree.root.findByType(CopilotModal).findByType(Modal);

  expect(modal.props.visible).toBeTruthy();
});

it('renders <ViewMask /> when the overlay is `view`', async () => {
  const CopilotComponent = copilot({
    overlay: 'view',
  })(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();

  const maskComponent = tree.root.findByType(ViewMask);

  expect(maskComponent).toBeDefined();
});

it.skip('renders <SvgMask /> when the overlay is `svg`', async () => {
  const CopilotComponent = copilot({
    overlay: 'svg',
  })(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();

  const maskComponent = tree.root.findByType(SvgMask);

  expect(maskComponent).toBeDefined();
});

it('updates the tooltip text when navigating through the steps', async () => {
  const CopilotComponent = copilot()(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();

  const textComponent = tree.root.findByProps({
    testID: 'stepDescription',
  });

  expect(textComponent.props.children).toBe('This is the description for the first step');

  await tree.root.instance.next();

  expect(textComponent.props.children).toBe('This is the description for the second step');

  await tree.root.instance.next();

  expect(textComponent.props.children).toBe('This is the description for the third step');

  await tree.root.instance.prev();

  expect(textComponent.props.children).toBe('This is the description for the second step');
});

it('hides the tutorial tooltip once the tutorial is finished', async () => {
  const CopilotComponent = copilot()(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  const modal = tree.root.findByType(CopilotModal).findByType(Modal);

  expect(modal.props.visible).toBeFalsy();

  await tree.root.findByType(SampleComponent).props.start();

  expect(modal.props.visible).toBeTruthy();

  await tree.root.instance.stop();

  expect(modal.props.visible).toBeFalsy();
});

it('shows the custom tooltip component if specified', async () => {
  const TooltipComponent = () => (
    <View />
  );

  const CopilotComponent = copilot({
    tooltipComponent: TooltipComponent,
  })(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();
  const tooltip = tree.root.findByType(TooltipComponent);

  expect(tooltip).toBeDefined();
  expect(tooltip.props).toHaveProperty('currentStep');
  expect(tooltip.props).toHaveProperty('handlePrev');
  expect(tooltip.props).toHaveProperty('handleNext');
  expect(tooltip.props).toHaveProperty('handleStop');
  expect(tooltip.props).toHaveProperty('isFirstStep');
  expect(tooltip.props).toHaveProperty('isLastStep');
  expect(tooltip.props.currentStep).toHaveProperty('name');
  expect(tooltip.props.currentStep).toHaveProperty('order');
  expect(tooltip.props.currentStep).toHaveProperty('text');
});

it('skips a step if disabled', async () => {
  const CopilotComponent = copilot()(SampleComponent);

  const tree = renderer.create(<CopilotComponent secondStepActive={false} />);
  await tree.root.findByType(SampleComponent).props.start();

  const textComponent = tree.root.findByProps({
    testID: 'stepDescription',
  });

  expect(textComponent.props.children).toBe('This is the description for the first step');

  await tree.root.instance.next();

  expect(textComponent.props.children).not.toBe('This is the description for the second step');
  expect(textComponent.props.children).toBe('This is the description for the third step');

  await tree.root.instance.prev();

  expect(textComponent.props.children).toBe('This is the description for the first step');
});

it('allows to manage tooltip width', async () => {
  const MyTooltipComponent = () => (
    <View style={{ flex: 1 }} />
  );
  const customStyle = {
    width: 123,
    maxWidth: 321,
  };
  const CopilotComponent = copilot({
    tooltipComponent: MyTooltipComponent,
    tooltipStyle: customStyle,
  })(SampleComponent);

  const tree = renderer.create(<CopilotComponent />);
  await tree.root.findByType(SampleComponent).props.start();

  const tooltipWrapper = tree.root.findByType(CopilotModal)
    .findByType(MyTooltipComponent)
    .parent;

  expect(tooltipWrapper.props.style)
    .toMatchObject(customStyle);
});
