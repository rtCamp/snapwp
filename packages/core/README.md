# @snapwp/core

Core utilities and shared functionality powering SnapWP's composeable framework for Headless WordPress.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

```bash
npm install @snapwp/core
```

## Usage

### Utils

```javascript
import { findElementAndGetClassNames } from '@snapwp/core';

const renderedHTML =
	'<div class="class1"><div class="class2" id="div-2"></div></div>';
const classNames = findElementAndGetClassNames( renderedHTML, '#div-2' ); // class2
```

```javascript
import { generateGraphqlUrl } from '@snapwp/core';

const url = generateGraphqlUrl( wpHomeUrl, graphqlEndpoint );
```

```javascript
import { getClassNamesFromString } from '@snapwp/core';

const htmlString = '<div class="class1 class2 class3"></div>';
const classNames = getClassNamesFromString( htmlString ); // [ class1, class2, class3 ]
```

```javascript
import { getColorClassName } from '@snapwp/core';

const colorClassName = getColorClassName( 'red', 'background' ); // has-red-background
```

### Config Manager

```javascript
import { getConfig } from '@snapwp/core/config';

const config = getConfig();
```

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
