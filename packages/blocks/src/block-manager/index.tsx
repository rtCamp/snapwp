import {
	type BlockData,
	type BlockTreeNode,
	type BlockDefinitions,
} from '@snapwp/core';
import defaultBlockDefinitions from '@/blocks';
import flatListToHierarchical from '@/utils/flat-list-to-hierarchical';

/**
 * Singleton class that renders blocks using defined React components.
 * Falls back to a default block if the type isn't found.
 */
export default class BlockManager {
	private static blockDefinitions: BlockDefinitions = defaultBlockDefinitions;

	/**
	 * Update block definitions to be used while rendering blocks.
	 * @param blockDefinitions - rendering implementaion for blocks.
	 */
	public static addBlockDefinitions( blockDefinitions: BlockDefinitions ) {
		BlockManager.blockDefinitions = {
			...BlockManager.blockDefinitions,
			...blockDefinitions,
		};
	}

	/**
	 * Function to convert a flat list of blocks to a tree depending on `clientId` and `parentClientId`
	 * @param blockList - A flat list of blocks.
	 * @return A tree of blocks.
	 */
	public static flatListToHierarchical(
		blockList?: BlockData[] | null
	): BlockTreeNode[] {
		return flatListToHierarchical(
			blockList as unknown as Record< string | number, unknown >[],
			{
				idKey: 'clientId',
				parentKey: 'parentClientId',
				childrenKey: 'children',
			}
		) as unknown as BlockTreeNode[];
	}

	/**
	 * Mutates the passed the node by adding a render function to a node of block tree.
	 * if a node uses default renderer(which uses renderedHtml) prunes its children which does not need to be rendered.
	 * @param node - A flat list of blocks.
	 */
	public static attachRendererToTreeNode = ( node: BlockTreeNode ): void => {
		if (
			BlockManager.blockDefinitions[ node.type ] !== undefined &&
			BlockManager.blockDefinitions[ node.type ] !== null
		) {
			node.renderer = BlockManager.blockDefinitions[ node.type ];
		} else {
			node.renderer = BlockManager.blockDefinitions.default;
			node.children = null;
		}

		if ( node.children ) {
			node.children.map( this.attachRendererToTreeNode );
		}
	};

	/**
	 * Pre processes a flat list of blocks for rendering.
	 * @param blockList - A flat list of blocks.
	 * @return A tree of blocks with render functions.
	 */
	public static parseBlockForRendering(
		blockList?: BlockData[] | null
	): BlockTreeNode[] {
		const BlockTreeNodeArray = this.flatListToHierarchical( blockList );

		BlockTreeNodeArray.forEach( this.attachRendererToTreeNode );

		return BlockTreeNodeArray;
	}
}
