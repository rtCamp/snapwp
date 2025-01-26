# @snapwp/next

Next.js-specific utilities and frontend components for integrating with SnapWP and headless WordPress.

## Installation

Run the following command:

```bash
npm install @snapwp/next
```

## Usage

#### React Parser

```typescript
import Parse from '@snapwp/next';

const htmlString = `
    <div>
        <a href="/about" style="color: blue;">About Us</a>
        <img src="/image.jpg" alt="Placeholder Image" />
    </div>
`;

export default function HtmlParserExample() {
    return <Parse html={htmlString} />;
}
```

#### Image Component

```typescript
import Image from '@snapwp/next';

export default function CustomImage() {
    return (
        <Image
          src="image-url.jpg"
          alt="Description of the image"
          height={200}
          width={300}
          className="image-class"
          style={{ borderRadius: '8px' }}
        />
    );
}

```

#### Link Component

```typescript
import Link from '@snapwp/next';

export default function CustomLink() {
    return (
        <Link href="https://example.com" className="link-class" style={{ color: 'blue' }}>
          Click here
        </Link>

    );
}
```

#### Script Component

```typescript
import Script from '@snapwp/next';

export default function ScriptExample() {
    return (
        <div>
            <h1>Custom Script Component</h1>
            <Script
                src="https://example.com/main.js"
                handle="example-main-script"
                loadingStrategy="ASYNC"
                location="header"
            />
        </div>
    );
}
```

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
