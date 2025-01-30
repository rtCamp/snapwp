# @snapwp/next

Next.js-specific utilities and frontend components for integrating with SnapWP and headless WordPress.

## Installation

Run the following command:

```bash
npm install @snapwp/next
```

## Usage

#### React Parser

The Parse component converts raw HTML strings into React components, replacing specific elements with custom Next.js components.

#### Key Features:

-   Replaces `<a>` tags with the custom [Link](#link-component) component for better navigation handling.
-   Replaces `<img>` tags with the [Image](#image-component) component, ensuring optimized image loading and attribute handling.
-   Extracts and applies styles using `getStyleObjectFromString`.
-   Determines image dimensions using `getImageSizeFromAttributes`.

#### Props:

-   `html`: A string containing HTML to be parsed and rendered as React elements.

This component ensures safe and optimized rendering of dynamic HTML content.

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

The Image component wraps Next.js' `<Image>` with additional functionality for handling WordPress media items dynamically. It supports automatic width and height calculations, fill mode for flexible layouts, and integration with SnapWP's configuration for optimized image loading. If fill is enabled, the image will adapt to its container while maintaining responsiveness.

#### Props:

-   `alt`: Alternative text for accessibility.
-   `className`: CSS class for styling.
-   `fill`: If true, the image fills the container.
-   `fetchPriority`: Controls browser image loading priority (high, low, auto).
-   `height`: Image height (optional, auto-calculated if not provided).
-   `image` : Media item containing the image details.
-   `priority`: Loads the image with higher priority.
-   `sizes`: Defines responsive image sizes for optimization.
-   `src`: Image URL.
-   `width`: Image width (optional, auto-calculated if not provided).

If the image source is external or missing proper dimensions, the component gracefully falls back to using a standard `<img>` tag.

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

The Link component handles both internal and external links. It automatically transforms WordPress links to match the frontend domain while preserving accessibility and SEO best practices.

#### Props:

-   `children`: The link text or elements.
-   `className`: CSS class for styling.
-   `href`: The destination URL.
-   `style`: Inline styles for customization.

If the link is external, the component renders a standard `<a>` tag. Otherwise, it leverages Next.js' `<Link>` for optimized client-side navigation.

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

The Script component is a flexible wrapper around Next.js' `<Script>`, allowing for controlled execution of scripts with additional inline data.

#### Props:

-   `after`: The inline code to be run after the asset is loaded..
-   `before`: The inline code to be run before the asset is loaded..
-   `extraData`: Extra information needed for the script
-   `handle`: A unique identifier for the script.
-   `loadingStrategy`: Determines how the script is loaded (ASYNC, DEFER).
-   `location`: Defines where the script should be loaded (header or footer).
-   `src`: The source of the asset.

This component ensures better script management, allowing inline execution before or after the main script while supporting external script sources.

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
