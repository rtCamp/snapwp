import React, { type ButtonHTMLAttributes } from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';
import { Link, Parse } from '@snapwp/next';
import type {
	CoreButton as CoreButtonType,
	CoreButtonProps,
} from '@snapwp/types';

/**
 * Renders the core/button block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
const CoreButton: CoreButtonType = ( { attributes }: CoreButtonProps ) => {
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
		// No need to convert URL to internal URL as the Link component handles it.
		return (
			<div className={ classNames }>
				<Link
					href={ url }
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
};

export default CoreButton;
