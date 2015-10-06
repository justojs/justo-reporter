[![Build Status](https://travis-ci.org/justojs/justo-reporter.svg)](https://travis-ci.org/justojs/justo-reporter)

Result reporter library.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-reporter
```

1. [Reporters](#reporters)
2. [Writers](#writers)

## Reporters

A **reporter** is an object to notify task results. A reporter can have zero, one
or several writers. Where a **writer** is an object to write task results, i.e.,
for the console.

The library implements two classes: `Reporter` and `Reporters`.

### Reporter class

It represents a reporter.

#### Properties

- `name` (String). Reporter name. Default: default.
- `enabled` (Boolean). Is the reporter enabled? Default: true.
  When a reporter is disabled, it doesn't notify the results.

#### Methods

- `report(Result)`. Notify a task result to its writers.
  If the reporter is disabled, the writers won't be notified.
- `add(Writer)`. Add a writer to notify.
- `add(Writer[])`. Add several writers.

#### Constructors

- `constructor()`. Create the reporter with the default values.
- `constructor(name : String)`. Create the reporter with the name given.
- `constructor(name : String, opts : Object)`. Create the reporter with the
  name and options given.
  Options:
  - `enabled`  (Boolean). Is the reporter enabled?
  - `display` (Object). What results to display?
    - `initializers` (Boolean). Default: true.
    - `finalizers` (Boolean). Default: true.
    - `suites` (Boolean). Default: true.
    - `multitasks` (Boolean). Default: true.
    - `simpleTasks` (Boolean). Default: true.
    - `subtasks` (Boolean). Default: true.
    - `ignored` (Boolean). Default: true.
    - `passed` (Boolean). Default: true.
    - `failed` (Boolean). Default: true.

### Reporters class

A collection of reporters.

#### Properties

The same as the `Array` class.

#### Methods

The same as the `Array` class and:

- `add(Reporter)`. Add a reporter.
- `add(Reporter[])`. Add several reporters.
- `report(Result)`. Notify a task result.
  This method calls the `Reporter.report()` method.

#### Constructors

- `constructor()`

## Writers

A **writer** is an object to write task results.
Right now, the library contains the following classes: `Writer`,
`ConsoleWriter` and `ColoredConsoleWriter`.

### Writer class

Abstract class for the writers.

#### Properties

None.

#### Methods

- `write(Result)`. Write the task result. Abstract method.

#### Constructors

- `constructor()`

### writers.ConsoleWriter

A writer to write the task results into the console.

#### Properties

- `passed.text` (String). Text to display when the task has passed.
- `failed.text` (String). Text to display when the task result has failed.
- `ignored.text` (String). Text to display when the task result has been ignored.

#### Methods

- `write(Result)`. Write the task result.

#### Constructors

- `constructor()`. Initiates the writer with the default options.
- `constructor(opts : Object)`. With the options given:
  - `passed` (String).
  - `failed` (String).
  - `ignored` (String).

### writers.ColoredConsoleWriter

A writer to write the task results colored into the console.

#### Properties

- `passed` (Object):
  - `text` (String). Text to display.
  - `color` (String). Color.
- `failed` (Object):
  - `text` (String).
  - `color` (String).
- `ignored` (Object):
  - `text` (String).
  - `color` (String).

#### Methods

- `write(Result)`. Write the task result.

#### Constructors

- `constructor()`. Initiates the writer with the default options.
- `constructor(opts : Object)`. With the options given:
  - `passed` (Object): `text` and/or `color`.
  - `failed` (Object).
  - `ignored` (Object).

### writers namespace

The abstract `Writer` class is in the package root. But the writer implementations
are into the `writers` namespace.

Example:

```
const Writer = require("justo-reporter").Writer;
const ConsoleWriter = require("justo-reporter").writers.ConsoleWriter;
```
