import { Seo } from './seo-manager';

if ( ! Seo.isInitialized ) {
	Seo.initialize();
}

// Rexports for simpler interface
export const getSiteMetadata = Seo.getSiteMetadata;
export const getTemplateMetadata = Seo.getTemplateMetadata;
