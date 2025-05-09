import { blocks as defaultBlockDefinitions } from '@/blocks';
import { Default } from '@/blocks/default';
import { flatListToHierarchical } from '@/utils/flat-list-to-hierarchical';

import type { BlockData, BlockDefinitions, BlockTreeNode } from '@snapwp/types';

/**
 * Singleton class that renders blocks using defined React components.
 * Falls back to a default block if the type isn't found.
 */
export class BlockManager {
	private static blockDefinitions = defaultBlockDefinitions;

	/**
	 * Update block definitions to be used while rendering blocks.
	 *
	 * @param {BlockDefinitions} blockDefinitions Rendering implementation for blocks.
	 */
	public static addBlockDefinitions(
		blockDefinitions: BlockDefinitions
	): void {
		BlockManager.blockDefinitions = {
			...BlockManager.blockDefinitions,
			...blockDefinitions,
		};
	}

	/**
	 * Function to convert a flat list of blocks to a tree depending on `clientId` and `parentClientId`.
	 *
	 * @param {Array<BlockData>} blockList A flat list of blocks.
	 *
	 * @return A tree of blocks.
	 */
	public static flatListToHierarchical(
		blockList?: BlockData[] | null | undefined
	): BlockTreeNode[] {
		if ( ! blockList ) {
			return [];
		}

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
	 *
	 * @param {BlockTreeNode} node A flat list of blocks.
	 */
	public static attachRendererToTreeNode = ( node: BlockTreeNode ): void => {
		const customBlockDefinition =
			BlockManager.blockDefinitions[ node.type ];
		const defaultBlockDefinition = defaultBlockDefinitions[ node.type ];

		if ( customBlockDefinition === null ) {
			// If explicitly set to null in custom definitions, use default renderer
			node.renderer = BlockManager.blockDefinitions.default || Default;
		} else if ( customBlockDefinition ) {
			// If custom definition exists, use it
			node.renderer = customBlockDefinition;
		} else if ( defaultBlockDefinition ) {
			// If no custom definition but default definition exists, use default
			node.renderer = defaultBlockDefinition;
		} else {
			// If no definition found anywhere, use default renderer and prune children
			node.renderer = BlockManager.blockDefinitions.default || Default;
			node.children = null;
		}

		if ( node.children ) {
			node.children.map( this.attachRendererToTreeNode );
		}
	};

	/**
	 * Pre processes a flat list of blocks for rendering.
	 *
	 * @param {Array<BlockData>} blockList A flat list of blocks.
	 *
	 * @return A tree of blocks with render functions.
	 */
	public static parseBlockForRendering(
		blockList?: BlockData[] | null | undefined
	): BlockTreeNode[] {
		if ( ! blockList ) {
			return [];
		}

		const BlockTreeNodeArray = this.flatListToHierarchical( blockList );

		if ( ! BlockTreeNodeArray ) {
			return [];
		}

		BlockTreeNodeArray.forEach( this.attachRendererToTreeNode );

		return BlockTreeNodeArray;
	}
}
