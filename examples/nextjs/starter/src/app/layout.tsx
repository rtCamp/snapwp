import { RootLayout } from '@snapwp/next';
import { getSiteMetadata } from '@snapwp/next/seo';
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
 * Generate site meta data.
 * @return Metadata for SEO.
 */
export async function generateMetadata(): Promise< Metadata > {
	const metaData = await getSiteMetadata();

	return {
		...metaData,
	};
}
