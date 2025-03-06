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

export type IconTypes = {
	faviconIcons: FormattedIcon[];
	appleIcons: FormattedIcon[];
	msApplicationTileIcon: Icon;
};

export type Icon = {
	sourceUrl: string;
	height: string;
	width: string;
};

export type FormattedIcon = {
	url: string;
	sizes: string;
};
