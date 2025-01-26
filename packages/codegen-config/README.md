# @snapwp/codegen-config

Sharable [GraphQL Codegen](https://the-guild.dev/graphql/codegen) config for the Headless WordPress ecosystem.

## Installation

Run the following command:

```bash
npm install @snapwp/codegen-config --save-dev
```

## Usage

The package provides a base configuration for [`@graphql-codegen/client-preset`](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client) that can be extended in your project:

```typescript
import baseConfig from '@snapwp/codegen-config';

export default {
	...baseConfig,
	// Add your project-specific configuration here, e.g.
	schema: 'https://my-wordpress-site.com/graphql',

	// Or use object destructuring to override specific properties
	generates: {
		// E.g. to change the output directory:
		'src/_graphql-types': baseConfig.generates[ 'src/__generated' ],

		// Or e.g. to overload client-preset options:
		'src/__generated': {
			...baseConfig.generates[ 'src/__generated' ],
			presetConfig: {
				...baseConfig.generates[ 'src/__generated' ].presetConfig,
				enumsAsTypes: false,
			},
		},
	},
};
```

For a real-world example, see the [configuration file in SnapWP's NextJS Starter example](https://github.com/rtCamp/snapwp/blob/develop/examples/nextjs/starter/codegen.ts).

## Development

-   `npm run build`: Build the package.
-   `npm run dev`: Watch for changes and rebuild.
-   `npm run clean`: Clean build artifacts.

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
