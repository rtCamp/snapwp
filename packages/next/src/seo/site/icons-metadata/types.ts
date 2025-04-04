export interface IconsMetaData {
	faviconIcons: FormattedIconData[];
	appleIcons: FormattedIconData[] | undefined;
	msApplicationTileIcon: IconData | undefined;
}

export interface IconData {
	sourceUrl: string;
	height: string;
	width: string;
}

export interface FormattedIconData {
	url: string;
	sizes: string;
}
