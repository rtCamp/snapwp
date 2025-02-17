# @snapwp/next

Next.js-specific utilities and frontend components for integrating with SnapWP and headless WordPress.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

Run the following command:

```bash
npm install @snapwp/next
```

## Usage

### `<Parse />`

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

### `<Image />`

The Image component wraps [Next.js' `Image`](https://nextjs.org/docs/api-reference/next/image) with additional functionality for handling WordPress media items dynamically. It supports automatic width and height calculations, fill mode for flexible layouts, and integration with SnapWP's configuration for optimized image loading.

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

### `<Link />`

The Link component wraps [Next.js' `Link`](https://nextjs.org/docs/api-reference/next/link) to map both internal and external links. Full-qualified links to the WordPress backend are automatically transformed into frontend-relative URLs.

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

### `<Script>`

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

### `<ScriptModule>`

The ScriptModule component loads a [WordPress-registered script module](https://developer.wordpress.org/reference/functions/wp_register_script_module/), along with its dependencies.

#### Props:

-   `extraData`: Extra information needed for the script.
-   `handle`: A unique identifier for the script.
-   `dependencies`: Dependencies required by the script module .
-   `src`: The source URL for the script module.

This component ensures that all dependencies are loaded asynchronously and before the main script loads.

```typescript
import ScriptModule from '@snapwp/next';

export default function ScriptModuleExample() {
    return (
        <div>
            <h1>Custom ScriptModule Component</h1>
            <ScriptModule
                src="https://example.com/main.js"
                handle="example-main-script"
                dependencies=[
                 {
                importType: 'static',
                connectedScriptModule: {
                    handle: '@module',
                    src: 'http://example.com/index.min.js'
                     }
                 }
                ]
             />
        </div>
    );
}
```

### `<Fonts />`

The Fonts component is used to correctly parse and output the [WordPress-generated font face data](https://developer.wordpress.org/reference/functions/wp_print_font_faces/).

#### Props:

-   `renderedFontFaces`: font face data as a string.

renderedFontFaces receives the list of @font-face CSS to load fonts (with URLs to font files)..

```typescript
import Fonts from '@snapwp/next';

const fontfaceString =
    "<style class='wp-fonts-local'>\n" +
     "@font-face{font-family:Manrope;font-style:normal;font-weight:200 800;font-display:fallback;src:url('http://example.com/font1.woff2') format('woff2');}\n" +
    "</style>\n"

export default function CustomFonts() {
    return (
        <Fonts renderedFontFaces={fontfaceString} />
    );
}
```

### Updating Global Styles

Global styles can be modified by passing the `getGlobalStyles` attribute to the `RootLayout` within the `src/app/layout.tsx` file of the frontend application.

`getGlobalStyles` takes an async callback function that returns an object containing global styles.

The default definition for `getGlobalStyles` function passed in `getGlobalStyles` attribute can be found in [@snapwp/query](../packages/query/README.md) package.

Type Definition of `getGlobalStyles`:

```typescript
type getGlobalStyles = () => Promise< GlobalHeadProps >;
```

Type definition of `GlobalHeadProps` can be found in [@snapwp/core](../packages/core/README.md) package.

### Updating Template Data

Template data can be modified by passing `getTemplateData` attribute to the `TemplateRenderer` within `src/app/[[...path]]/page.tsx` file of the frontend application.

`getTemplateData` takes an async callback to get template styles and content.

The default definition for `getTemplateData` function passed in `getTemplateData` attribute can be found in [@snapwp/query](../packages/query/README.md) package.

Type Definition of `getTemplateData`:

```typescript
type getTemplateData = ( uri: string ) => Promise< TemplateData >;
```

Type definition of `TemplateData` can be found in [@snapwp/core](../packages/core/README.md) package.


## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
