import React from 'react';
import BlockManager from '@/block-manager';
import { getConfig } from '@snapwp/core/config';

import type { BlockData, BlockTreeNode } from '@snapwp/types';

type EditorBlocksRendererProps = {
	editorBlocks?: BlockData[] | null;
};

/**
 * A react component to render editor blocks.
 * @param props - Props.
 * @param props.editorBlocks - A list of blocks to be rendered.
 * @return The rendered template
 */
export default function EditorBlocksRenderer( {
	editorBlocks,
}: EditorBlocksRendererProps ) {
	const { blockDefinitions } = getConfig();

	if ( blockDefinitions ) {
		BlockManager.addBlockDefinitions( blockDefinitions );
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
