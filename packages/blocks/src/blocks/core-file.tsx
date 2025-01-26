import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Link } from '@snapwp/next';

const FALLBACK_DOWNLOAD_BUTTON_TEXT = 'Download';
const FALLBACK_ARIA_LABEL = 'PDF embed';

/**
 * Renders the core/file block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreFile( { attributes, renderedHtml }: any ) {
	const {
		displayPreview,
		downloadButtonText,
		fileId,
		fileName,
		href,
		previewHeight,
		showDownloadButton,
		style,
		textLinkHref,
		textLinkTarget,
	} = attributes || {};

	if ( ! href ) {
		return null;
	}

	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );

	const styleObject = getStylesFromAttributes( { style } );

	const ariaLabel = fileName || FALLBACK_ARIA_LABEL;
	const downloadText = downloadButtonText || FALLBACK_DOWNLOAD_BUTTON_TEXT;

	return (
		<div className={ classNames } style={ styleObject }>
			{ displayPreview && (
				<object
					className="wp-block-file__embed"
					data={ href }
					type="application/pdf"
					style={ {
						width: '100%',
						height: `${ previewHeight }px`,
					} }
					aria-label={ ariaLabel }
				/>
			) }
			{ fileName && (
				<Link
					id={ fileId || undefined }
					href={ textLinkHref || undefined }
					target={ textLinkTarget || undefined }
					rel={ textLinkTarget ? 'noreferrer noopener' : undefined }
				>
					{ fileName }
				</Link>
			) }
			{ showDownloadButton && (
				<Link
					href={ href }
					className="wp-block-file__button wp-element-button"
					download
					aria-describedby={ fileId || undefined }
				>
					{ downloadText }
				</Link>
			) }
		</div>
	);
}
