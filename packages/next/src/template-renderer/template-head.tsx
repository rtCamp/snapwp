import React, { Fragment } from 'react';
import { type TemplateHeadProps } from '@snapwp/core';

/**
 * Renders the head section with additional stylesheets for a template.
 *
 * @param props - The props for the component.
 * @param props.stylesheets - An array of additional stylesheets and inline styles.
 *
 * @return {Array<React.JSX.Element>|null} A head element containing the provided styles and links.
 */
export function TemplateHead( { stylesheets }: TemplateHeadProps ) {
	if ( ! stylesheets ) {
		return null;
	}

	return stylesheets.map( ( { before, src, handle, after } ) => {
		return (
			<Fragment key={ handle }>
				{ before && (
					<style
						key={ `${ handle }-before` }
						id={ `${ handle }-inline-css` }
						dangerouslySetInnerHTML={ {
							__html: before,
						} }
					/>
				) }
				{ src && (
					<link
						key={ handle }
						rel="stylesheet"
						href={ src }
						id={ handle || '' }
					/>
				) }
				{ after && (
					<style
						key={ `${ handle }-after` }
						id={ `${ handle }-inline-css` }
						dangerouslySetInnerHTML={ {
							__html: after,
						} }
					/>
				) }
			</Fragment>
		);
	} );
}
