# Overloading WordPress Behavior

SnapWP takes an additive approach to headless WordPress development, where WordPress is used as the default source of truth, and developers can granularly override just the parts they need.

This tutorial explains how to overload default WordPress behavior using SnapWP, focusing on customizing blocks, creating custom frontend routes, and `html-react-parser` component mapping.

## Overloading Blocks

SnapWP allows you to customize the rendering of individual WordPress blocks. This is useful for modifying the default appearance or behavior of a block to better suit your design.

> [!TIP]
> When using WordPress [Block Themes](https://wordpress.org/documentation/article/block-themes/), pretty much _everything_ is a block.
>
> That means you can use this approach to target patterns (e.g., a "Latest Posts" widget), template parts (e.g., a site header or footer), or even an entire template.

### 1. Identifying the Block

First, identify the block you want to overload. Each block has a unique name (e.g., `CoreParagraph`, `CoreImage`). You can find this name in the block's data when fetched via WPGraphQL.

### 2. Creating a Custom Component

Create a new React component to represent your custom block rendering. This component will receive the block's attributes as props.

```javascript
import React from 'react';

function MyCustomParagraph( { attributes } ) {
	return (
		<div className="my-custom-paragraph">
			<p>{ attributes.content }</p> { /* Access block attributes */ }
			{ /* Add any additional JSX or logic here */ }
			<span className="custom-attribution"> - My Custom Rendering</span>
		</div>
	);
}

export default MyCustomParagraph;
```

### 3. Mapping the Block

Map your custom component to the block in your SnapWP configuration.

```tsx
import { TemplateRenderer } from '@snapwp/next';
import MyCustomParagraph from './components/MyCustomParagraph';
import { EditorBlocksRenderer } from '@snapwp/blocks';

const blockDefinitions = {
	CoreParagraph: MyCustomParagraph, // Overload CoreParagraph
	CoreImage: null, // Use default rendering for CoreImage
};

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => (
				<EditorBlocksRenderer
					editorBlocks={ editorBlocks }
					blockDefinitions={ blockDefinitions }
				/>
			) }
		</TemplateRenderer>
	);
}
```

Now, whenever a `core/paragraph` block is encountered, your `MyCustomParagraph` component will be used to render it. Any other blocks will use the default rendering unless you provide a custom component in `blockDefinitions`. Setting the value to `null` will use the [default block rendering](#default-block-rendering).

---

## Overloading Template Parts

SnapWP allows you to customize **Template Parts**, such as headers, footers, etc, by mapping them to custom React components. This is useful for modifying the structure, design, or behavior of key site areas while keeping WordPress as the content source.

> [!TIP]
> Template Parts are reusable block structures in WordPress [Block Themes](https://wordpress.org/documentation/article/block-themes/).
> Common examples include:
>
> -   The **Header** ( slug `"header"`)
> -   The **Footer** ( slug `"footer"`)

### 1. Identifying the Template Part

Each **Template Part** has a unique `slug` (e.g., `"header"`, `"footer"`). You can retrieve this information via the attributes present in the props.

### 2. Creating a Custom Component

Create a new React component to modify the rendering of a specific Template Part.

```tsx
import React from 'react';
import { BlockData, cn, getClassNamesFromString } from '@snapwp/core';

export default function MyCustomFooter( {
	renderedHtml,
	attributes,
}: BlockData ) {
	const safeAttributes = attributes || {}; // Ensure attributes are not undefined.
	const { templatePartTagName } = safeAttributes;

	const TagName = templatePartTagName || 'footer';

	// Extract class names from rendered HTML.
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString, 'custom-footer' );

	return (
		<TagName className={ classNames }>
			<p className="footer-note">This is a custom footer!</p>
		</TagName>
	);
}
```

### 3. Mapping the Template Part

Map this custom component in the **SnapWP blockDefinitions** so it only applies to the `"footer"` template part.

```tsx
import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import MyCustomFooter from '../../components/MyCustomFooter';

const blockDefinitions = {
	CoreTemplatePart: ( props ) => {
		if ( props.attributes.slug === 'footer' ) {
			return <MyCustomFooter { ...props } />;
		}
		return null; // Default rendering for other template parts.
	},
};

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => (
				<EditorBlocksRenderer
					editorBlocks={ editorBlocks }
					blockDefinitions={ blockDefinitions }
				/>
			) }
		</TemplateRenderer>
	);
}
```

---

## Overloading [html-react-parser](https://www.npmjs.com/package/html-react-parser) Options

SnapWP allows you to pass custom options to [**react-parser**](../packages/next/src/react-parser/index.tsx) Component which internally uses html-react-parser. This is useful when you want to overload default options of html-react-parser.

### 1. Creating a Custom Component with options

Create a new Custom Component to overload the default options of [react-parser](../packages/next/src/react-parser/index.tsx).

MyCustomReactParser.tsx

```tsx
import React from 'react';
import {
	Element,
	type DOMNode,
	type HTMLReactParserOptions,
} from 'html-react-parser';
import { CustomImage } from '@/CustomImage'; // custom image component defined in your project
/**
 *  Using typescript type guard to check if a DOMNode is an Element.
 * Ref : https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-784073240
 * @param domNode The DOM element
 * @return parser options
 */
const isElement = ( domNode: DOMNode ): domNode is Element => {
	const isTag = domNode.type === 'tag';
	const hasAttributes = ( domNode as Element ).attribs !== undefined;

	return isTag && hasAttributes;
};

export const customParserOptions: HTMLReactParserOptions = {
	replace: ( domNode ) => {
		if ( isElement( domNode ) ) {
			const { attribs, children, name, type } = domNode;
			const { class: className, style, ...attributes } = attribs;
			const { href } = attribs;

			if ( type === 'tag' && name === 'img' ) {
				return (
					<CustomImage
						{ ...attributes }
						src={ attribs.src }
						alt={ attribs.alt || '' }
						height={ height }
						width={ width }
						className={ className }
						style={ styleObject }
						image={ imageAttributes }
						//adding custom id
						id="overriding id"
					/>
				);
			}

			return undefined;
		}

		return undefined;
	},
};
```

### 2. Use react-parser as fallback

Make any default block component null to use react-parser as fallback component

src/app/[[...path]]/page.tsx

```tsx
import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';

const blockDefinitions = {
	CoreImage: null, // To use react parser.
};

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => (
				<EditorBlocksRenderer
					editorBlocks={ editorBlocks }
					blockDefinitions={ blockDefinitions }
				/>
			) }
		</TemplateRenderer>
	);
}
```

### 3. Pass customParserOptions to overload

snapwp.config.ts

```tsx
import type { SnapWPConfig } from '@snapwp/core/config';
import { customParserOptions } from './src/MyCustomReactParser';

const config: SnapWPConfig = {
	/* passing custom options to overload default react-parser options  */
	parserOptions: customParserOptions,
};

export default config;
```

---

## Creating Custom Frontend Routes

This tutorial explains how to create custom frontend routes in your SnapWP-powered Next.js application using the App Router.

1. In the `app` directory, at the same level as the `[[...path]]` directory, create a directory with the name of the route.
2. Inside the directory, create a `page.tsx` file. Inside `page.tsx`, you can create a standard Next.js page component. These custom pages have access to your global styles and theme styles (defined in your `theme.json` and global CSS).

```tsx
import styles from './styles.module.css'; // Import local styles if needed

export default function Page() {
	return (
		<div className={ styles.container }>
			{ /* Use local styles if needed */ }
			<h1 className="wp-block-heading has-text-align-center has-x-large-font-size">
				This is a test override page
			</h1>
			<p className="has-text-align-center">
				This page has access to global styles and theme.json styles.
			</p>
		</div>
	);
}
```

### Styling

-   **Local Styles**: Use CSS Modules (as shown with `styles.module.css`) or any other CSS-in-JS solution for component-specific styling.
-   **Global and Theme Styles**: Classes like `wp-block-heading`, `has-text-align-center`, and `has-x-large-font-size` (likely from your WordPress `theme.json` and/or global CSS) are automatically available.

## Default Block Rendering

This tutorial covers how SnapWP uses the `Parse` component to render HTML content. The `Parse` component converts HTML strings into React components, which is essential for displaying default WordPress blocks.

### Using `Parse`

The `Parse` component takes an HTML string (`renderedHtml`) and converts it into React components. Here's a basic example:

```tsx
import React from 'react';
import { Parse } from '@snapwp/next';
import { type BlockData } from '@snapwp/core';

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 * @return The rendered default block.
 */
export default function Default( { renderedHtml }: BlockData ) {
	return <Parse html={ renderedHtml || '' } />;
}
```
