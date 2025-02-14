import React, { type ButtonHTMLAttributes } from 'react';
import { cn, getStylesFromAttributes, replaceHostUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { Link, Parse } from '@snapwp/next';
import { CoreButtonProps } from '@snapwp/types';

/**
 * Renders the core/button block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreButton( { attributes }: CoreButtonProps ) {
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

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const { homeUrl, nextUrl } = getConfig();
	const commonProps = {
		className: linkClassName ?? undefined,
		style: styleObject,
		title: title ?? undefined,
	};

	if ( tagName === 'button' ) {
		return (
			<div className={ classNames }>
				<button
					type={
						buttonType as ButtonHTMLAttributes< HTMLButtonElement >[ 'type' ]
					}
					{ ...commonProps }
				>
					{ !! text && <Parse html={ text } /> }
				</button>
			</div>
		);
	}

	if ( url ) {
		const href = replaceHostUrl( url, homeUrl, nextUrl );
		return (
			<div className={ classNames }>
				<Link
					href={ href }
					target={ linkTarget ?? undefined }
					rel={ rel ?? undefined }
					{ ...commonProps }
				>
					{ !! text && <Parse html={ text } /> }
				</Link>
			</div>
		);
	}

	return (
		<div className={ classNames }>
			<a { ...commonProps }>{ !! text && <Parse html={ text } /> }</a>
		</div>
	);
}
