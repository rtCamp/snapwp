import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';

/**
 * @todo To enable blocks, import { blocks } from '@snapwp/blocks' and use those instead of the block definitions below.
 */
const blockDefinitions = {
	CoreParagraph: null,
	CoreGroup: null,
	CoreSeparator: null,
	CoreSpacer: null,
	CoreHeading: null,
	CoreList: null,
	CoreListItem: null,
	CoreAudio: null,
	CoreVideo: null,
	CorePullquote: null,
	CoreFreeform: null,
	CoreVerse: null,
	CoreHtml: null,
	CorePreformatted: null,
	CoreButton: null,
	CoreButtons: null,
	CoreFile: null,
	CoreColumns: null,
	CoreColumn: null,
	CorePostContent: null,
	CoreCode: null,
	CoreDetails: null,
	CoreImage: null,
	CoreGallery: null,
	CoreQuote: null,
	CoreTemplatePart: null,
	CoreMediaText: null,
	CoreCover: null,
};

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => {
				return (
					<EditorBlocksRenderer
						editorBlocks={ editorBlocks }
						//@ts-ignore type from frontend package are not exported correctly.
						blockDefinitions={ blockDefinitions }
					/>
				);
			} }
		</TemplateRenderer>
	);
}
