import { PropsWithChildren } from 'react';
import { BaseProps } from '../base';

export type CorePatternProps = PropsWithChildren< BaseProps< {} > >;

export type CorePattern = React.ComponentType< CorePatternProps >;
