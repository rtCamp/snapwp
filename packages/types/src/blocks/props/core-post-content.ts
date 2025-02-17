import { PropsWithChildren } from 'react';
import { BaseProps } from '../base';

export type CorePostContentProps = PropsWithChildren< BaseProps< {} > >;

export type CorePostContent = React.ComponentType< CorePostContentProps >;
