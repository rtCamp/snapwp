# @snapwp/eslint-config

Sharable ESLint config for the Headless WordPress ecosystem. Extends [WordPress Coding Standards](https://github.com/WordPress/WordPress-Coding-Standards/blob/develop/README.md) with built-in TypeScript support.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

Run the following command:

```bash
npm install @snapwp/eslint-config --save-dev
```

## Usage

Add this to your project's `.eslintrc.js`:

```javascript
module.exports = {
	extends: [ '@snapwp/eslint-config' ],
};
```

For a real-world example, see the [configuration file in SnapWP's NextJS Starter example](https://github.com/rtCamp/snapwp/blob/develop/examples/nextjs/starter/.eslintrc.json).

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
