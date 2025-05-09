import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Link, Parse } from '@snapwp/next';
import type { CoreFile as CoreFileType, CoreFileProps } from '@snapwp/types';
import type { ReactNode } from 'react';

const FALLBACK_DOWNLOAD_BUTTON_TEXT = 'Download';
const FALLBACK_ARIA_LABEL = 'PDF embed';

/**
 * Renders the core/file block.
 *
 * @param {Object}                        props              The props for the block component.
 * @param {CoreFileProps['attributes']}   props.attributes   Block attributes.
 * @param {CoreFileProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreFile: CoreFileType = ( {
	attributes,
	renderedHtml,
}: CoreFileProps ): ReactNode => {
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
		<div
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
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
			{ fileName && textLinkHref && (
				<Link
					id={ fileId }
					href={ textLinkHref }
					target={ textLinkTarget }
					rel={ textLinkTarget ? 'noreferrer noopener' : undefined }
				>
					{ !! fileName && <Parse html={ fileName } /> }
				</Link>
			) }
			{ showDownloadButton && (
				<Link
					href={ href }
					className="wp-block-file__button wp-element-button"
					download
					aria-describedby={ fileId || undefined }
				>
					{ !! downloadText && <Parse html={ downloadText } /> }
				</Link>
			) }
		</div>
	);
};
