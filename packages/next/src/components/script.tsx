import React, { type PropsWithoutRef } from 'react';
import NextScript, { type ScriptProps } from 'next/script';

// Define script location enum to match backend GraphQL schema changes
export type ScriptLoadingGroupLocationEnum = 'HEADER' | 'FOOTER';

interface ScriptInterface {
	after?: ( string | null )[] | null;
	before?: ( string | null )[] | null;
	extraData?: string | null;
	handle?: string | null;
	loadingStrategy?: 'ASYNC' | 'DEFER' | null;
	groupLocation?: ScriptLoadingGroupLocationEnum | null;
	src?: string | null;
}

/**
 * A reusable wrapper for Next.js Script component.
 *
 * @param props - Props for the Script component.
 * @param props.after - Scripts to be executed after the main script.
 * @param props.before - Scripts to be executed before the main script.
 * @param props.extraData - Additional data to be included in the script.
 * @param props.handle - The handle for the script.
 * @param props.loadingStrategy - The loading strategy for the script (async or defer).
 * @param props.groupLocation - The location where the script should be loaded.
 * @param props.src - The source URL for the script.
 * @return The rendered script element.
 */
export default function Script( {
	after,
	before,
	extraData,
	handle,
	groupLocation,
	src,
	loadingStrategy,
	...props
}: PropsWithoutRef< ScriptInterface & ScriptProps > ) {
	const beforeScript = Array.isArray( before )
		? before.join( ' ' )
		: undefined;
	const afterScript = Array.isArray( after ) ? after.join( ' ' ) : undefined;

	// Determine the strategy for the script.
	const nextStrategy =
		groupLocation === 'HEADER' ? 'beforeInteractive' : 'afterInteractive';

	// Generate an inline script for additional data if provided.
	const ExtraDataScript = extraData && (
		<NextScript
			id={ `${ handle }-extra` }
			dangerouslySetInnerHTML={ { __html: extraData } }
			strategy={ nextStrategy }
			{ ...props }
		/>
	);

	// Generate an inline script to execute before the main script, if provided.
	const BeforeScript = beforeScript && (
		<NextScript
			id={ `${ handle }-before` }
			dangerouslySetInnerHTML={ { __html: beforeScript } }
			strategy={ nextStrategy }
			{ ...props }
		/>
	);

	// Generate the main script element.
	const MainScript = src && (
		<NextScript
			{ ...( handle && { id: `${ handle }-js` } ) }
			src={ src }
			strategy={ nextStrategy }
			async={ loadingStrategy === 'ASYNC' || undefined }
			defer={ loadingStrategy === 'DEFER' || undefined }
			{ ...props }
		/>
	);

	// Generate an inline script to execute after the main script, if provided.
	const AfterScript = afterScript && (
		<NextScript
			id={ `${ handle }-after` }
			dangerouslySetInnerHTML={ { __html: afterScript } }
			strategy={ nextStrategy }
			{ ...props }
		/>
	);

	return (
		<>
			{ ExtraDataScript }
			{ BeforeScript }
			{ MainScript }
			{ AfterScript }
		</>
	);
}
