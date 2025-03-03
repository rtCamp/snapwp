import type {
	CoreAudio,
	CoreButton,
	CoreButtons,
	CoreCode,
	CoreColumn,
	CoreColumns,
	CoreCover,
	CoreDetails,
	CoreFile,
	CoreFreeform,
	CoreGallery,
	CoreGroup,
	CoreHeading,
	CoreHtml,
	CoreImage,
	CoreList,
	CoreListItem,
	CoreMediaText,
	CoreParagraph,
	CorePattern,
	CorePostContent,
	CorePreformatted,
	CorePullquote,
	CoreQuote,
	CoreSeparator,
	CoreSpacer,
	CoreTemplatePart,
	CoreVerse,
	CoreVideo,
	Default,
} from '@/blocks/props';

type componentProps =
	| CoreAudio
	| CoreButton
	| CoreButtons
	| CoreCode
	| CoreColumn
	| CoreColumns
	| CoreCover
	| CoreDetails
	| CoreFile
	| CoreFreeform
	| CoreGallery
	| CoreGroup
	| CoreHeading
	| CoreHtml
	| CoreImage
	| CoreList
	| CoreListItem
	| CoreMediaText
	| CorePattern
	| CoreParagraph
	| CorePostContent
	| CorePreformatted
	| CorePullquote
	| CoreQuote
	| CoreSeparator
	| CoreSpacer
	| CoreTemplatePart
	| CoreVerse
	| CoreVideo
	| Default;

export type BlockDefinitions = {
	[ key: string ]: componentProps | undefined | null;
	default: componentProps | undefined | null;
};
