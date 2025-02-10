import defaultBlockDefinitions from '@/blocks';
import flatListToHierarchical from '@/utils/flat-list-to-hierarchical';

export interface BlockData {
	type: keyof typeof defaultBlockDefinitions;
	cssClassNames?: Array< string | null > | null;
	clientId?: string | null;
	parentClientId?: string | null;
	renderedHtml?: string | null;
	attributes?: Record< any, any >;
}

export type BlockTreeNode = Omit< BlockData, 'clientId' & 'parentClientId' > & {
	children?: BlockTreeNode[] | null;
	// @todo: implement as generic type once we enforce `no-explicit-any`
	renderer: React.FC< React.PropsWithChildren< any > >;
};

/**
 * Singleton class that renders blocks using defined React components.
 * Falls back to a default block if the type isn't found.
 */
export default class BlockManager {
	private static blockDefinitions = defaultBlockDefinitions;

	/**
	 * Update block definitions to be used while rendering blocks.
	 * @param blockDefinitions - rendering implementaion for blocks.
	 */
	public static addBlockDefinitions(
		blockDefinitions: typeof defaultBlockDefinitions
	) {
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
