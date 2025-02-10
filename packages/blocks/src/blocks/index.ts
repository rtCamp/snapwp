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

const blocks = {
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

export type BlockDefinitions = typeof blocks;

export default blocks;

export * from './core-audio';
export * from './core-button';
export * from './core-buttons';
export * from './core-code';
export * from './core-column';
export * from './core-columns';
export * from './core-cover';
export * from './core-details';
export * from './core-file';
export * from './core-freeform';
export * from './core-gallery';
export * from './core-group';
export * from './core-heading';
export * from './core-html';
export * from './core-image';
export * from './core-list';
export * from './core-list-item';
export * from './core-media-text';
export * from './core-paragraph';
export * from './core-pattern';
export * from './core-post-content';
export * from './core-preformatted';
export * from './core-pullquote';
export * from './core-quote';
export * from './core-separator';
export * from './core-spacer';
export * from './core-template-part';
export * from './core-verse';
export * from './core-video';
export * from './default';
