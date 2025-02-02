import React, { type ButtonHTMLAttributes } from 'react';
import { cn, getStylesFromAttributes, replaceHostUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { Link, Parse } from '@snapwp/next';

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

	// Use Link component for anchor tags.
	const TagComponent = tagName === 'a' ? Link : TagName;

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const type =
		( buttonType as ButtonHTMLAttributes< HTMLButtonElement >[ 'type' ] ) ||
		undefined;

	const { homeUrl, nextUrl } = getConfig();

	const href = replaceHostUrl( url, homeUrl, nextUrl );

	return (
		<div className={ classNames }>
			<TagComponent
				{ ...( isButtonTag ? { type } : {} ) }
				href={ isButtonTag ? undefined : href ?? undefined }
				target={ isButtonTag ? undefined : linkTarget ?? undefined }
				rel={ isButtonTag ? undefined : rel ?? undefined }
				className={ linkClassName ?? undefined }
				style={ styleObject }
				title={ title ?? undefined }
			>
				{ !! text && <Parse html={ text } /> }
			</TagComponent>
		</div>
	);
}
