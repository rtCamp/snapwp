import { RootLayout, generateRootMetaData } from '@snapwp/next';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export default function Layout( { children }: PropsWithChildren ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}

/**
 * Generate custom metadata with rootMetadata generated using generateRootMeraData.
 *
 * @return dynamic metadata generated from generateRootMetaData() and custom logic.
 */
export async function generateMetadata(): Promise< Metadata > {
	const rootMetaData = await generateRootMetaData();
	return {
		...rootMetaData,
	};
}
