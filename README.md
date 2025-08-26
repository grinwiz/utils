# @grinwiz/utils

A collection of utility functions designed to simplify development in JavaScript and Node.js projects.

## Features

- Conditional logic helpers
- String manipulation utilities
- Date and time helpers powered by `moment` and `moment-timezone`
- Throwable parser for improved error diagnostics
- Currency string formatter

## Installation

You can install `@grinwiz/utils` via npm:

```sh
npm install @grinwiz/utils
```

or using yarn:

```sh
yarn add @grinwiz/utils
```

## Usage

```
const {
  isTrue,
  generateRandomString,
  throwIf
} = require('@grinwiz/utils');

// Conditionals
console.log(isTrue('yes')); // true

// Helpers
const id = generateRandomString(10);
console.log(id); // e.g., "a8s9dk2lqp"

// ThrowIf
const name = "";
throwIf.emptyString(name, "name cannot be empty"); // this will throw error with message
```

## Dependencies

- [moment](https://www.npmjs.com/package/moment)
- [moment-timezone](https://www.npmjs.com/package/moment-timezone)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/grinwiz/utils)
- [npm Package](https://www.npmjs.com/package/@grinwiz/utils)