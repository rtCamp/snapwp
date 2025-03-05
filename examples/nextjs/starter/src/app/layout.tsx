import { RootLayout, generateRootMetaData } from '@snapwp/next';
import type { Metadata } from 'next';

export default function Layout( { children }: { children: React.ReactNode } ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}

/**
 * Generate custom metadata with rootMetadata generated using generateRootMeraData.
 */
export async function generateMetadata(): Promise< Metadata > {
	const rootMetaData = generateRootMetaData();
	return {
		...rootMetaData,
	};
}
