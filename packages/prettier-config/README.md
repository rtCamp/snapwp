# @snapwp/prettier-config

Sharable Prettier config for the Headless WordPress ecosystem. Extends [@wordpress/prettier-config](https://github.com/WordPress/gutenberg/blob/trunk/packages/prettier-config/README.md).

## Installation

> [!NOTE]
> This package relies on the official [`wp-prettier` fork of Prettier](https://www.npmjs.com/package/wp-prettier) to ensure compatibility with WordPress coding standards.

Run the following command:

```bash
npm install prettier@npm:wp-prettier @snapwp/prettier-config --save-dev
```

## Usage

Add this to your `package.json`:

```json
{
	"prettier": "@snapwp/prettier-config"
}
```

Or in `.prettierrc.js`:

```javascript
module.exports = {
	...require( '@snapwp/prettier-config' ),
};
```

For a real-world example, see the [configuration file in SnapWP's NextJS Starter example](https://github.com/rtCamp/snapwp/blob/develop/examples/nextjs/starter/.prettierrc.cjs).

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
