export interface GeneralSettingsProps {
	generalSettings?: {
		siteIcon?: {
			mediaItemUrl?: string | null;
			mediaDetails?: {
				sizes?: Array< {
					width?: string | null;
					height?: string | null;
					sourceUrl?: string | null;
				} | null > | null;
			} | null;
		} | null;
	} | null;
}
