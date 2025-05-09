import { LightboxOverlay } from './lightbox-overlay';
import type { ReactNode } from 'react';

/**
 * Renders the footer section.
 * Holds manual injections like the lightbox until we can turn it into a portal.
 *
 * @return A footer.
 */
export function TemplateFooter(): ReactNode {
	return (
		<>
			{ /* @todo: Check if we can patch this with either the portal or the @wordpress/hooks implementation. */ }
			<LightboxOverlay />
		</>
	);
}
