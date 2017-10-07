import * as utilities from './utilities';

describe('getFirstStep', () => {
  test('empty steps array', () => {
    const firstStep = utilities.getFirstStep([]);
    expect(firstStep).toBe(null);
  });

  test('non-empty array', () => {
    const steps = [
      { name: 'Step1', order: 0 },
      { name: 'Step2', order: 1 },
      { name: 'Step3', order: 2 },
    ];

    const firstStep = utilities.getFirstStep(steps);
    expect(firstStep).toBe(steps[0]);
  });

  test('using step.order instead of array index', () => {
    const steps = [
      { name: 'Step3', order: 2 },
      { name: 'Step1', order: 0 },
      { name: 'Step2', order: 1 },
    ];

    const firstStep = utilities.getFirstStep(steps);
    expect(firstStep).toBe(steps[1]);
  });

  test('shuffled orders', () => {
    const steps = [
      { name: 'Step3', order: 203 },
      { name: 'Step1', order: 100 },
      { name: 'Step2', order: 150 },
    ];

    const firstStep = utilities.getFirstStep(steps);
    expect(firstStep).toBe(steps[1]);
  });
});

describe('getLastStep', () => {
  test('empty steps array', () => {
    const lastStep = utilities.getLastStep([]);
    expect(lastStep).toBe(null);
  });

  test('non-empty array', () => {
    const steps = [
      { name: 'Step1', order: 0 },
      { name: 'Step2', order: 1 },
      { name: 'Step3', order: 2 },
    ];

    const lastStep = utilities.getLastStep(steps);
    expect(lastStep).toBe(steps[2]);
  });

  test('using step.order instead of array index', () => {
    const steps = [
      { name: 'Step3', order: 2 },
      { name: 'Step1', order: 0 },
      { name: 'Step2', order: 1 },
    ];

    const lastStep = utilities.getLastStep(steps);
    expect(lastStep).toBe(steps[0]);
  });

  test('shuffled orders', () => {
    const steps = [
      { name: 'Step3', order: 203 },
      { name: 'Step1', order: 100 },
      { name: 'Step2', order: 150 },
    ];

    const lastStep = utilities.getLastStep(steps);
    expect(lastStep).toBe(steps[0]);
  });
});

describe('getStepNumber', () => {
  test('empty steps array', () => {
    const stepNumber = utilities.getStepNumber([], undefined);
    expect(stepNumber).toBe(undefined);
  });

  test('non-empty steps array', () => {
    const steps = [
      { name: 'Step1', order: 1 },
      { name: 'Step2', order: 2 },
      { name: 'Step3', order: 3 },
    ];

    expect(utilities.getStepNumber(steps, steps[0])).toBe(1);
    expect(utilities.getStepNumber(steps, steps[1])).toBe(2);
    expect(utilities.getStepNumber(steps, steps[2])).toBe(3);
  });

  test('non-sequential step orders', () => {
    const steps = [
      { name: 'Step2', order: 400 },
      { name: 'Step3', order: 670 },
      { name: 'Step1', order: 140 },
    ];

    expect(utilities.getStepNumber(steps, steps[0])).toBe(2);
    expect(utilities.getStepNumber(steps, steps[1])).toBe(3);
    expect(utilities.getStepNumber(steps, steps[2])).toBe(1);
  });
});

describe('getPrevStep', () => {
  test('empty steps array', () => {
    const prevStep = utilities.getPrevStep([], null);
    expect(prevStep).toBe(null);
  });

  test('non-empty steps array', () => {
    const steps = [
      { name: 'Step1', order: 1 },
      { name: 'Step2', order: 2 },
      { name: 'Step3', order: 3 },
    ];

    expect(utilities.getPrevStep(steps, steps[0])).toBe(null);
    expect(utilities.getPrevStep(steps, steps[1])).toBe(steps[0]);
    expect(utilities.getPrevStep(steps, steps[2])).toBe(steps[1]);
  });

  test('non-sequential step orders', () => {
    const steps = [
      { name: 'Step2', order: 400 },
      { name: 'Step3', order: 670 },
      { name: 'Step1', order: 140 },
    ];

    expect(utilities.getPrevStep(steps, steps[0])).toBe(steps[2]);
    expect(utilities.getPrevStep(steps, steps[1])).toBe(steps[0]);
    expect(utilities.getPrevStep(steps, steps[2])).toBe(null);
  });
});

describe('getNextStep', () => {
  test('empty steps array', () => {
    const nextStep = utilities.getNextStep([], null);
    expect(nextStep).toBe(null);
  });

  test('non-empty steps array', () => {
    const steps = [
      { name: 'Step1', order: 1 },
      { name: 'Step2', order: 2 },
      { name: 'Step3', order: 3 },
    ];

    expect(utilities.getNextStep(steps, steps[0])).toBe(steps[1]);
    expect(utilities.getNextStep(steps, steps[1])).toBe(steps[2]);
    // expect(utilities.getNextStep(steps, steps[2])).toBe(null);
  });

  test('non-sequential step orders', () => {
    const steps = [
      { name: 'Step2', order: 400 },
      { name: 'Step3', order: 670 },
      { name: 'Step1', order: 140 },
    ];

    expect(utilities.getNextStep(steps, steps[0])).toBe(steps[1]);
    // expect(utilities.getNextStep(steps, steps[1])).toBe(null);
    expect(utilities.getNextStep(steps, steps[2])).toBe(steps[0]);
  });
});
