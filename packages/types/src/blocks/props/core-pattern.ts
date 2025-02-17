import type { PropsWithChildren } from 'react';
import type { BaseProps } from '../base';

export type CorePatternProps = PropsWithChildren< BaseProps< {} > >;

export type CorePattern = React.ComponentType< CorePatternProps >;
