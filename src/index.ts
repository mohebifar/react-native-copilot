import { StepNumber } from "./components/default-ui/StepNumber";
import { Tooltip } from "./components/default-ui/Tooltip";
export { walkthroughable } from "./hocs/walkthroughable";
export { CopilotStep } from "./components/CopilotStep";
export { CopilotProvider, useCopilot } from "./contexts/CopilotProvider";
export type { CopilotOptions as CopilotProps, TooltipProps } from "./types";

export const DefaultUI = {
  StepNumber,
  Tooltip,
};
