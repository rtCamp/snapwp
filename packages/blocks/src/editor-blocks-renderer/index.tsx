import BlockManager from '@/block-manager';
import { getConfig } from '@snapwp/core/config';

import type { BlockData, BlockDefinitions, BlockTreeNode } from '@snapwp/types';
import type { ReactNode } from 'react';

type EditorBlocksRendererProps = {
	editorBlocks?: BlockData[] | null | undefined;
	blockDefinitions?: BlockDefinitions | null | undefined;
};

/**
 * A react component to render editor blocks.
 *
 * @param {Object}                                        props                  Props.
 * @param {EditorBlocksRendererProps['editorBlocks']}     props.editorBlocks     A list of blocks to be rendered.
 * @param {EditorBlocksRendererProps['blockDefinitions']} props.blockDefinitions Blocks rendering functions.
 *
 * @return The rendered template
 */
export default function EditorBlocksRenderer( {
	editorBlocks,
	blockDefinitions,
}: EditorBlocksRendererProps ): ReactNode {
	const { blockDefinitions: globalBlockDefinitions } = getConfig();

	const resolvedBlockDefinitions = globalBlockDefinitions ?? blockDefinitions;

	if ( resolvedBlockDefinitions ) {
		BlockManager.addBlockDefinitions( resolvedBlockDefinitions );
	}

	const parsedTree = BlockManager.parseBlockForRendering( editorBlocks );

	// eslint-disable-next-line jsdoc/require-jsdoc -- Disable jsdoc for local function.
	const renderNode = ( node: BlockTreeNode ): ReactNode => {
		const props: Record< string, unknown > = {
			key: node.clientId,
			...node,
		};

		delete props[ 'renderer' ];
		delete props[ 'children' ];

		const { key, ...properties } = props;

		return (
			<node.renderer key={ key } { ...properties }>
				{ node.children && node.children.map( renderNode ) }
			</node.renderer>
		);
	};

	return parsedTree.map( renderNode );
}
