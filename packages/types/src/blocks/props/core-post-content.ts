import type { ComponentType, PropsWithChildren } from 'react';

import type { BaseProps } from '../base';

export type CorePostContentProps = PropsWithChildren< BaseProps< {} > >;

export type CorePostContent = ComponentType< CorePostContentProps >;
