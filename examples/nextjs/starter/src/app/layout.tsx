import { RootLayout } from '@snapwp/next';

export default function Layout( { children }: { children: React.ReactNode } ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}
