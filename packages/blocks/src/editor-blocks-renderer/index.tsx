import React from 'react';
import BlockManager from '@/block-manager';
import { getConfig } from '@snapwp/core/config';

import type { BlockData, BlockDefinitions, BlockTreeNode } from '@snapwp/types';

type EditorBlocksRendererProps = {
	editorBlocks?: BlockData[] | null;
	blockDefinitions?: BlockDefinitions | null;
};

/**
 * A react component to render editor blocks.
 *
 * @param {Object}                                 props                  Props.
 * @param {EditorBlocksRendererProps.editorBlocks} props.editorBlocks     A list of blocks to be rendered.
 * @param {EditorBlocksRendererProps}              props.blockDefinitions Blocks rendering functions.
 *
 * @return The rendered template
 */
export default function EditorBlocksRenderer( {
	editorBlocks,
	blockDefinitions,
}: EditorBlocksRendererProps ) {
	const { blockDefinitions: globalBlockDefinitions } = getConfig();

	const resolvedBlockDefinitions = globalBlockDefinitions ?? blockDefinitions;

	if ( resolvedBlockDefinitions ) {
		BlockManager.addBlockDefinitions( resolvedBlockDefinitions );
	}

	const parsedTree = BlockManager.parseBlockForRendering( editorBlocks );

	// eslint-disable-next-line jsdoc/require-jsdoc
	const renderNode = ( node: BlockTreeNode ) => {
		const props: Record< any, any > = {
			key: node.clientId,
			...node,
		};

		delete props.renderer;
		delete props.children;

		return (
			<node.renderer { ...props }>
				{ node.children && node.children.map( renderNode ) }
			</node.renderer>
		);
	};

	return parsedTree.map( renderNode );
}
