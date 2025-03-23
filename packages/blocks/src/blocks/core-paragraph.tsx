import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CoreParagraph as CoreParagraphType,
	CoreParagraphProps,
} from '@snapwp/types';

/**
 * Renders the core/paragraph block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return {React.JSX.Element} The rendered block.
 */
const CoreParagraph: CoreParagraphType = ( {
	attributes,
}: CoreParagraphProps ) => {
	const {
		backgroundColor,
		content,
		cssClassName,
		direction,
		fontFamily,
		fontSize,
		style,
		textColor,
	} = attributes || {};

	const styleObject = getStylesFromAttributes( { style } ) || {};

	/**
	 * Add missing styles to the style object
	 *
	 * @todo once these are available via `styles` we can remove.
	 */
	if ( backgroundColor ) {
		styleObject.backgroundColor = backgroundColor;
	}
	if ( textColor ) {
		styleObject.color = textColor;
	}
	if ( fontSize ) {
		styleObject.fontSize = fontSize;
	}
	if ( fontFamily ) {
		styleObject.fontFamily = fontFamily;
	}

	return (
		<p
			className={ cssClassName || undefined }
			dir={ direction || undefined }
			{ ...( Object.keys( styleObject ).length > 0 && {
				style: styleObject,
			} ) }
		>
			{ !! content && <Parse html={ content } /> }
		</p>
	);
};

export default CoreParagraph;
