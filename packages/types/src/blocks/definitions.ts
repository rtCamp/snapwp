import React from 'react';

export type BlockDefinitions = {
	[ key: string ]: React.ComponentType< any > | undefined | null;
};
