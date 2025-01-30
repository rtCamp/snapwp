# @snapwp/blocks

A React component library for rendering and hydrating [WordPress Blocks](https://wordpress.org/blocks/) from their block data.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

```bash
npm install @snapwp/blocks
```

## Features

-   **Additive DX**: Just include or extend the Block Components you need, and fallback to default rendering for the rest.
-   **Custom Block Definitions**: Override components on a block-level, or even entire patterns, template parts, and templates.
-   **Fallback Rendering**: Uses `html-react-parser` to let you transform your WordPress data on even an HTML element level.
-   **Comprehensive Support**: Includes an ever-growing list of strongly-typed Block Components that can be used to recreate or enhance the block HTML markup.

When combined with a headless WordPress framework like SnapWP, this library offers parity with many modern WordPress features out of the box.

## Usage

### Basic Rendering

```jsx
<EditorBlocksRenderer
	editorBlocks={ editorBlocks } // Array of blocks to render
	blockDefinitions={ blockDefinitions } // Optional custom block definitions
/>
```

## Override Block Definitions

```jsx
const blockDefinitions = {
	CoreParagraph: CustomCoreParagraph,
};

<EditorBlocksRenderer
	editorBlocks={ editorBlocks }
	blockDefinitions={ blockDefinitions }
/>;
```

## Included Block Components

These components provide developer-friendly APIs for rendering core WordPress blocks. If a WordPress block does not have a corresponding component, it will fallback to the `Default` block component, which uses `html-react-parser` under the hood.

| Type               | Component        |
| ------------------ | ---------------- |
| core-audio         | CoreAudio        |
| core-button        | CoreButton       |
| core-buttons       | CoreButtons      |
| core-code          | CoreCode         |
| core-column        | CoreColumn       |
| core-columns       | CoreColumns      |
| core-cover         | CoreCover        |
| core-details       | CoreDetails      |
| core-file          | CoreFile         |
| core-freeform      | CoreFreeform     |
| core-gallery       | CoreGallery      |
| core-group         | CoreGroup        |
| core-heading       | CoreHeading      |
| core-html          | CoreHtml         |
| core-image         | CoreImage        |
| core-list          | CoreList         |
| core-list-item     | CoreListItem     |
| core-media-text    | CoreMediaText    |
| core-paragraph     | CoreParagraph    |
| core-post-content  | CorePostContent  |
| core-preformatted  | CorePreformatted |
| core-pullquote     | CorePullquote    |
| core-quote         | CoreQuote        |
| core-separator     | CoreSeparator    |
| core-spacer        | CoreSpacer       |
| core-template-part | CoreTemplatePart |
| core-verse         | CoreVerse        |
| core-video         | CoreVideo        |
| default            | Default          |

## (Currently) Unsupported

Work is ongoing for full feature parity with Gutenberg. The following functionality is coming soon:

-   Duotone Filters
-   Image Lightboxes
-   @todo

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
