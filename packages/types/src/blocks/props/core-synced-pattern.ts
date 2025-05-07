import type { BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreSyncedPatternProps = PropsWithChildren<
	BaseProps< {
		style?: string;
	} >
>;

export type CoreSyncedPattern = ComponentType< CoreSyncedPatternProps >;
