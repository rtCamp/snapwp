import { BlockData } from '..';
import CoreAudio from './core-audio';
import CoreButton from './core-button';
import CoreButtons from './core-buttons';
import CoreCode from './core-code';
import CoreColumn from './core-column';
import CoreColumns from './core-columns';
import CoreCover from './core-cover';
import CoreDetails from './core-details';
import CoreFile from './core-file';
import CoreFreeform from './core-freeform';
import CoreGallery from './core-gallery';
import CoreGroup from './core-group';
import CoreHeading from './core-heading';
import CoreHtml from './core-html';
import CoreImage from './core-image';
import CoreList from './core-list';
import CoreListItem from './core-list-item';
import CoreMediaText from './core-media-text';
import CoreParagraph from './core-paragraph';
import CorePattern from './core-pattern';
import CorePostContent from './core-post-content';
import CorePreformatted from './core-preformatted';
import CorePullquote from './core-pullquote';
import CoreQuote from './core-quote';
import CoreSeparator from './core-separator';
import CoreSpacer from './core-spacer';
import CoreTemplatePart from './core-template-part';
import CoreVerse from './core-verse';
import CoreVideo from './core-video';
import Default from './default';

export type BlockDefinitions = {
	[ key: string ]: React.FC< BlockData >;
};

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
