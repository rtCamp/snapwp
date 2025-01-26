import React, { ButtonHTMLAttributes } from 'react';
import { cn, getStylesFromAttributes, replaceHostUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';

/**
 * Renders the core/button block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreButton( { attributes }: any ) {
	const {
		buttonType,
		cssClassName,
		linkClassName,
		linkTarget,
		rel,
		style,
		tagName,
		text,
		title,
		url,
	} = attributes || {};

	const TagName = tagName || 'a';
	const isButtonTag = TagName === 'button';

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const type =
		( buttonType as ButtonHTMLAttributes< HTMLButtonElement >[ 'type' ] ) ||
		undefined;

	const { homeUrl, nextUrl } = getConfig();

	const href = replaceHostUrl( url, homeUrl, nextUrl );

	//@todo use Link component from @snapwp/core or from next/link
	return (
		<div className={ classNames }>
			<TagName
				{ ...( isButtonTag ? { type } : {} ) }
				href={ isButtonTag ? undefined : href ?? undefined }
				target={ isButtonTag ? undefined : linkTarget ?? undefined }
				rel={ isButtonTag ? undefined : rel ?? undefined }
				className={ linkClassName ?? undefined }
				style={ styleObject }
				title={ title ?? undefined }
			>
				{ text }
			</TagName>
		</div>
	);
}
