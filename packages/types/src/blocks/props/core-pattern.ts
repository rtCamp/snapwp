import type { ComponentType, PropsWithChildren } from 'react';
import type { BaseProps } from '../base';

export type CorePatternProps = PropsWithChildren< BaseProps< {} > >;

export type CorePattern = ComponentType< CorePatternProps >;
