# Change Log

## 3.3.2

### Patch Changes

- d14d956: Expose totalStepsNumber via useCopilot

## 3.3.1

### Patch Changes

- 05b3a47: Fix a type error in walkthroughable

## 3.3.0

### Minor Changes

- 3e5d3cc: Fix the issue with missing module file specified in package json

## 3.2.1

### Patch Changes

- 3a6dd5a: Fix malformed field crash and add more config (arrowSize and margin)

## 3.2.0

### Minor Changes

- 0d8362a: Remove Tooltip and StepNumber passed props in favor of useCopilot context
  Un-register the step after name change and re-register with the new name
  Add tests for CopilotStep

## 3.1.0

### Minor Changes

- 312fba4: Expose more functions through the public API

  Expose `stop`, `goToNext`, `goToNth`, and `goToPrev` through the `useCopilot` hook
  Export `DefaultUI` from the module's entry to access the default Tooltip and StepNumber components

## 3.0.1

### Patch Changes

- 3a0f6e0: Migrate to TS and add CopilotProvider

## 3.0.0

### Major Changes

- f2b45c7: Migrate to TS and deprecate HOC

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2017-06-05
