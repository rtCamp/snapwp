import type { BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CorePatternProps = PropsWithChildren< BaseProps< {} > >;

export type CorePattern = ComponentType< CorePatternProps >;
