import {
	CoreAudioAttributes,
	CoreButtonAttributes,
	CoreButtonsAttributes,
	CoreCodeAttributes,
	CoreColumnAttributes,
	CoreColumnsAttributes,
	CoreCoverAttributes,
	CoreDetailsAttributes,
	CoreFileAttributes,
	CoreGalleryAttributes,
	CoreGroupAttributes,
	CoreHeadingAttributes,
	CoreImageAttributes,
	CoreListAttributes,
	CoreListItemAttributes,
	CoreMediaTextAttributes,
	CoreParagraphAttributes,
	CorePreformattedAttributes,
	CorePullquoteAttributes,
	CoreQuoteAttributes,
	CoreSpacerAttributes,
	CoreTemplatePartAttributes,
	CoreVerseAttributes,
	CoreVideoAttributes,
} from '.';

export interface BlockTypeMap {
	CoreAudio: CoreAudioAttributes;
	CoreButton: CoreButtonAttributes;
	CoreButtons: CoreButtonsAttributes;
	CoreCode: CoreCodeAttributes;
	CoreColumn: CoreColumnAttributes;
	CoreColumns: CoreColumnsAttributes;
	CoreCover: CoreCoverAttributes;
	CoreDetails: CoreDetailsAttributes;
	CoreFile: CoreFileAttributes;
	CoreFreeform: {};
	CoreGallery: CoreGalleryAttributes;
	CoreGroup: CoreGroupAttributes;
	CoreHeading: CoreHeadingAttributes;
	CoreHtml: {};
	CoreImage: CoreImageAttributes;
	CoreList: CoreListAttributes;
	CoreListItem: CoreListItemAttributes;
	CoreMediaText: CoreMediaTextAttributes;
	CorePattern: {};
	CoreParagraph: CoreParagraphAttributes;
	CorePostContent: {};
	CorePreformatted: CorePreformattedAttributes;
	CorePullquote: CorePullquoteAttributes;
	CoreQuote: CoreQuoteAttributes;
	CoreSeparator: {};
	CoreSpacer: CoreSpacerAttributes;
	CoreTemplatePart: CoreTemplatePartAttributes;
	CoreVerse: CoreVerseAttributes;
	CoreVideo: CoreVideoAttributes;
	default: {};
}
