// export async function generateMetadata(): Promise< Metadata > {
// 	const globalMetadata = await QueryEngine.getGlobalMetadata();
// 	const { nextUrl } = getConfig();

// 	return {
// 		title: globalMetadata.siteTitle,
// 		applicationName: globalMetadata.siteTitle,
// 		description: globalMetadata.description,
// 		openGraph: {
// 			title: globalMetadata.siteTitle,
// 			description: globalMetadata.description,
// 			locale: globalMetadata.locale,
// 			siteName: globalMetadata.siteTitle,
// 			url: nextUrl,
// 		},
// 		twitter: {
// 			title: globalMetadata.siteTitle,
// 			description: globalMetadata.description,
// 		},
// 	};
// }
import { RootLayout, generateRootMetaData } from '@snapwp/next';
import type { Metadata } from 'next';
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
	const rootMetaData = await generateRootMetaData();

	return {
		...rootMetaData,
	};
}
