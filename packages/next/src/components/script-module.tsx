/**
 * React component for rendering a script module, including its dependencies.
 *
 * A script module is typically a JavaScript file that needs to be loaded on a webpage.
 * This component ensures that all dependencies of a script module are loaded before the main script.
 * Dependencies are rendered as individual <Script /> components and are typically loaded asynchronously.
 *
 * @todo Add CORS headers in production by fetching WordPress site URL from getConfig
 */
import React, { type PropsWithoutRef } from 'react';
import Script from 'next/script';
import { getConfig } from '@snapwp/core/config';

interface ScriptModuleInterface {
	handle?: string | null;
	src?: string | null;
	dependencies?:
		| {
				importType?: string | null;
				connectedScriptModule?: {
					handle: string;
					src: string;
				} | null;
		  }[]
		| null;
	extraData?: string | null;
}

/**
 * A reusable wrapper for Next.js Script component to handle script modules and their dependencies.
 * Uses Next.js script loading strategies to optimize loading behavior.
 *
 * @param props - Props for the Script Module component
 * @param props.handle - The unique identifier for the script module
 * @param props.src - The source URL for the script module
 * @param props.extraData - Additional data required by the script module
 * @param props.dependencies - Dependencies required by the script module
 * @return The rendered script module elements
 */
export default function ScriptModule( {
	handle,
	src,
	dependencies,
	extraData,
	...props
}: PropsWithoutRef< ScriptModuleInterface > ) {
	const { homeUrl } = getConfig();
	// Generate dependency scripts
	const DependencyScripts = dependencies?.map( ( dep, index ) => {
		if ( ! dep?.connectedScriptModule ) {
			return null;
		}

		const { src: depSrc, handle: depHandle } = dep.connectedScriptModule;

		if ( 'static' === dep.importType ) {
			return (
				<link
					// We use "preload" instead of "modulepreload" to resolve the race condition where the script runs before the state is loaded.
					rel="preload"
					as="script"
					key={ depHandle || `${ handle }-dep-${ index }` }
					href={ depSrc.replace( homeUrl, '/api/proxy/js/module' ) }
					id={ `${ depHandle }-js-modulepreload` }
				/>
			);
		}

		return (
			<Script
				key={ depHandle || `${ handle }-dep-${ index }` }
				id={ depHandle || undefined }
				type="module"
				src={ depSrc.replace( homeUrl, '/api/proxy/js/module' ) }
				/*
				 * Use lazyOnload strategy for dependencies to ensure they are loaded asynchronously.
				 * This strategy is recommended for non-blocking scripts and they prevent preload warnings.
				 */
				strategy="lazyOnload"
				{ ...props }
			/>
		);
	} );

	// Generate extra data script only for WordPress interactivity
	// Creating ID using handle as WordPress does the same.
	// See: https://github.com/WordPress/wordpress-develop/blob/trunk/src/wp-includes/class-wp-script-modules.php#L380
	const ExtraDataScript = extraData ? (
		<script
			type="application/json"
			id={ `wp-script-module-data-${ handle }` }
		>
			{ extraData }
		</script>
	) : null;

	// Generate main script with lazy loading strategy
	const MainScript = src && (
		<Script
			type="module"
			src={ src.replace( homeUrl, '/api/proxy/js/module' ) }
			id={ handle || undefined }
			strategy="lazyOnload"
			{ ...props }
		/>
	);

	return (
		<>
			{ ExtraDataScript }
			{ DependencyScripts }
			{ MainScript }
		</>
	);
}
