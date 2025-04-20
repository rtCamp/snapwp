import { Seo } from './seo-manager';

if ( ! Seo.isInitialized ) {
	Seo.initialize();
}

// Rexports for simpler interface
export const getLayoutMetadata = Seo.getLayoutMetadata;
export const getPageMetadata = Seo.getPageMetadata;
