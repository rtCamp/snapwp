import React from 'react';
import { BlockTypeMap } from './map';
import { BlockData } from './base';

export type BlockDefinitions = Partial<
	{
		[ K in keyof BlockTypeMap ]: React.FC<
			BlockData< BlockTypeMap[ K ] >
		> | null;
	} & {
		[ key: string ]: React.FC< BlockData< any > > | null;
	}
>;
