import { getConfig } from '@snapwp/core/config';
import { RootLayout } from '@snapwp/next';
import { QueryEngine } from '@snapwp/query';
import { Metadata } from 'next';

export async function generateMetadata(): Promise< Metadata > {
	const globalMetadata = await QueryEngine.getGlobalMetadata();
	const { nextUrl } = getConfig();

	return {
		title: globalMetadata.siteTitle,
		applicationName: globalMetadata.siteTitle,
		description: globalMetadata.description,
		openGraph: {
			title: globalMetadata.siteTitle,
			description: globalMetadata.description,
			locale: globalMetadata.locale,
			siteName: globalMetadata.siteTitle,
			url: nextUrl,
		},
		twitter: {
			title: globalMetadata.siteTitle,
			description: globalMetadata.description,
		},
	};
}

export default function Layout( { children }: { children: React.ReactNode } ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}
