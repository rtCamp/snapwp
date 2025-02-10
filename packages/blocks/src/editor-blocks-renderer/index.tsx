import BlockManager, { BlockData, BlockTreeNode } from '@/block-manager';
import React from 'react';
import { BlockDefinitions } from '@/blocks';

export type EditorBlocksRendererProps = {
	editorBlocks?: BlockData[] | null;
	blockDefinitions?: BlockDefinitions | null;
};

/**
 * A react component to render editor blocks.
 * @param props - Props.
 * @param props.blockDefinitions - blocks rendering functions.
 * @param props.editorBlocks - A list of blocks to be rendered.
 * @return The rendered template
 */
export default function EditorBlocksRenderer( {
	editorBlocks,
	blockDefinitions,
}: EditorBlocksRendererProps ) {
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

		// Removing renderer and children from props. Renderer should not be passed to the component.
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
