import { useEffect, useRef, useState } from "react";

/**
 * A hook like useState that allows you to use await the setter
 */
export const useStateWithAwait = <T = any>(
  initialState: T
): [T, (newValue: T) => Promise<void>] => {
  const endPending = useRef(() => {});
  const newDesiredValue = useRef(initialState);

  const [state, setState] = useState(initialState);

  const setStateWithAwait = async (newState: T) => {
    const pending = new Promise<void>((resolve) => {
      endPending.current = resolve;
    });
    newDesiredValue.current = newState;
    setState(newState);
    await pending;
  };

  useEffect(() => {
    if (state === newDesiredValue.current) {
      endPending.current();
    }
  }, [state]);

  return [state, setStateWithAwait];
};
