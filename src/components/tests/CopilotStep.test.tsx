import "@testing-library/jest-native/extend-expect";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import {
  CopilotProvider,
  type useCopilot,
} from "../../contexts/CopilotProvider";
import { CopilotStep } from "../CopilotStep";

jest.mock("../../contexts/CopilotProvider", () => ({
  ...jest.requireActual("../../contexts/CopilotProvider"),
  useCopilot: jest
    .fn()
    .mockImplementation(
      () => jest.requireActual("../../contexts/CopilotProvider").useCopilot
    ),
}));

const actualUseCopilot = jest.requireActual("../../contexts/CopilotProvider")
  .useCopilot as typeof useCopilot;

const mockUseCopilot = jest.requireMock("../../contexts/CopilotProvider")
  .useCopilot as jest.Mock<ReturnType<typeof useCopilot>>;

describe("CopilotStep", () => {
  beforeEach(() => {
    mockUseCopilot.mockClear().mockImplementation(actualUseCopilot);
  });

  test("passes the copilot prop to the child component", async () => {
    const WrappedComponent = () => null;

    render(
      <CopilotProvider>
        <CopilotStep name="Test" order={0} text="Hello">
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );
    const wrappedComponentElement = screen.UNSAFE_getByType(WrappedComponent);

    expect(wrappedComponentElement.props).toMatchObject({
      copilot: {
        onLayout: expect.any(Function),
        ref: expect.any(Object),
      },
    });
  });

  test("registers the step", async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();

    mockUseCopilot.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <CopilotProvider>
        <>
          <CopilotStep name="Step 1" order={0} text="Hello! This is step 1!">
            <WrappedComponent />
          </CopilotStep>
          <CopilotStep name="Step 2" order={1} text="And this is step 2">
            <WrappedComponent />
          </CopilotStep>
        </>
      </CopilotProvider>
    );

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: "Step 1",
      text: "Hello! This is step 1!",
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: "Step 2",
      text: "And this is step 2",
      order: 1,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });

  test("re-registers the step after text update", async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();

    mockUseCopilot.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <CopilotProvider>
        <CopilotStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );

    screen.rerender(
      <CopilotProvider>
        <CopilotStep
          name="Step 1"
          order={0}
          text="Hello! This is the same step with updated text!"
        >
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: "Step 1",
      text: "Hello! This is the same step with updated text!",
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });

  test("unregisters the step after unmount", async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();
    const unregisterStepSpy = jest.fn();

    mockUseCopilot.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    render(
      <CopilotProvider>
        <CopilotStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );

    // Remove the step from the tree
    screen.rerender(<CopilotProvider />);

    expect(unregisterStepSpy).toHaveBeenCalledWith("Step 1");
  });

  test("unregisters the step after name change and re-registers with the new name", async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();
    const unregisterStepSpy = jest.fn();

    mockUseCopilot.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    const stepText = "Hello! This is step 1!";

    render(
      <CopilotProvider>
        <CopilotStep name="Step 1" order={0} text={stepText}>
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );

    screen.rerender(
      <CopilotProvider>
        <CopilotStep name="Step 1 Updated Name" order={0} text={stepText}>
          <WrappedComponent />
        </CopilotStep>
      </CopilotProvider>
    );

    expect(unregisterStepSpy).toHaveBeenCalledWith("Step 1");

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: "Step 1 Updated Name",
      text: stepText,
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });
});
