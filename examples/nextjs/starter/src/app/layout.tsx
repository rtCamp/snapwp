import { RootLayout } from '@snapwp/next';
import { getRootMetadata } from '@snapwp/next/seo/root';
import { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

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
	const rootMetaData = await getRootMetadata();

	return {
		...rootMetaData,
	};
}
