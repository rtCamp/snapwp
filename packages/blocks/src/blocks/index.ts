import { BlockData } from '..';
import CoreAudio, { CoreAudioAttributes } from './core-audio';
import CoreButton, { CoreButtonAttributes } from './core-button';
import CoreButtons, { CoreButtonsAttributes } from './core-buttons';
import CoreCode, { CoreCodeAttributes } from './core-code';
import CoreColumn, { CoreColumnAttributes } from './core-column';
import CoreColumns, { CoreColumnsAttributes } from './core-columns';
import CoreCover, { CoreCoverAttributes } from './core-cover';
import CoreDetails, { CoreDetailsAttributes } from './core-details';
import CoreFile, { CoreFileAttributes } from './core-file';
import CoreFreeform from './core-freeform';
import CoreGallery, { CoreGalleryAttributes } from './core-gallery';
import CoreGroup, { CoreGroupAttributes } from './core-group';
import CoreHeading, { CoreHeadingAttributes } from './core-heading';
import CoreHtml from './core-html';
import CoreImage, { CoreImageAttributes } from './core-image';
import CoreList, { CoreListAttributes } from './core-list';
import CoreListItem, { CoreListItemAttributes } from './core-list-item';
import CoreMediaText, { CoreMediaTextAttributes } from './core-media-text';
import CoreParagraph, { CoreParagraphAttributes } from './core-paragraph';
import CorePattern from './core-pattern';
import CorePostContent from './core-post-content';
import CorePreformatted, {
	CorePreformattedAttributes,
} from './core-preformatted';
import CorePullquote, { CorePullquoteAttributes } from './core-pullquote';
import CoreQuote, { CoreQuoteAttributes } from './core-quote';
import CoreSeparator from './core-separator';
import CoreSpacer, { CoreSpacerAttributes } from './core-spacer';
import CoreTemplatePart, {
	CoreTemplatePartAttributes,
} from './core-template-part';
import CoreVerse, { CoreVerseAttributes } from './core-verse';
import CoreVideo, { CoreVideoAttributes } from './core-video';
import Default from './default';

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

export type BlockDefinitions = Partial<
	{
		[ K in keyof BlockTypeMap ]: React.FC<
			BlockData< BlockTypeMap[ K ] >
		> | null;
	} & {
		[ key: string ]: React.FC< BlockData< any > > | null;
	}
>;

const blocks: BlockDefinitions = {
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
	CorePattern,
	CoreParagraph,
	CorePostContent,
	CorePreformatted,
	CorePullquote,
	CoreQuote,
	CoreSeparator,
	CoreSpacer,
	CoreTemplatePart,
	CoreVerse,
	CoreVideo,
	default: Default,
};

export default blocks;

export { CoreAudioAttributes, CoreAudioProps } from './core-audio';
export { CoreButtonAttributes, CoreButtonProps } from './core-button';
export { CoreButtonsAttributes, CoreButtonsProps } from './core-buttons';
export { CoreCodeAttributes, CoreCodeProps } from './core-code';
export { CoreColumnAttributes, CoreColumnProps } from './core-column';
export { CoreColumnsAttributes, CoreColumnsProps } from './core-columns';
export { CoreCoverAttributes, CoreCoverProps } from './core-cover';
export { CoreDetailsAttributes, CoreDetailsProps } from './core-details';
export { CoreFileAttributes, CoreFileProps } from './core-file';
export { CoreFreeformProps } from './core-freeform';
export { CoreGalleryAttributes, CoreGalleryProps } from './core-gallery';
export { CoreGroupAttributes, CoreGroupProps } from './core-group';
export { CoreHeadingAttributes, CoreHeadingProps } from './core-heading';
export { CoreHtmlProps } from './core-html';
export { CoreImageAttributes, CoreImageProps } from './core-image';
export { CoreListAttributes, CoreListProps } from './core-list';
export { CoreListItemAttributes, CoreListItemProps } from './core-list-item';
export { CoreMediaTextAttributes, CoreMediaTextProps } from './core-media-text';
export { CoreParagraphAttributes, CoreParagraphProps } from './core-paragraph';
export { CorePatternProps } from './core-pattern';
export { CorePostContentProps } from './core-post-content';
export {
	CorePreformattedAttributes,
	CorePreformattedProps,
} from './core-preformatted';
export { CorePullquoteAttributes, CorePullquoteProps } from './core-pullquote';
export { CoreQuoteAttributes, CoreQuoteProps } from './core-quote';
export { CoreSeparatorProps } from './core-separator';
export { CoreSpacerAttributes, CoreSpacerProps } from './core-spacer';
export {
	CoreTemplatePartAttributes,
	CoreTemplatePartProps,
} from './core-template-part';
export { CoreVerseAttributes, CoreVerseProps } from './core-verse';
export { CoreVideoAttributes, CoreVideoProps } from './core-video';
export { DefaultProps } from './default';
