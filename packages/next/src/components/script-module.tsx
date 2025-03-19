/**
 * React component for rendering a script module, including its dependencies.
 *
 * A script module is typically a JavaScript file that needs to be loaded on a webpage.
 * This component ensures that all dependencies of a script module are loaded before the main script.
 * Dependencies are rendered as individual <Script /> components and are typically loaded asynchronously.
 */
import type { PropsWithoutRef } from 'react';
import Script from 'next/script';

interface ScriptModuleInterface {
	handle?: string | null | undefined;
	src?: string | null | undefined;
	dependencies?:
		| {
				importType?: string | null;
				connectedScriptModule?: {
					handle: string;
					src: string;
				} | null;
		  }[]
		| null
		| undefined;
	extraData?: string | null | undefined;
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
	// Generate dependency scripts
	const DependencyScripts = dependencies?.map( ( dep, index ) => {
		if ( ! dep?.connectedScriptModule ) {
			return null;
		}

		const { src: depSrc, handle: depHandle } = dep.connectedScriptModule;

		// @todo Remove `toUpperCase()` when we drop support for snapwp-helper v0.1.0.
		if ( 'STATIC' === dep.importType?.toUpperCase() ) {
			return (
				<link
					// We use "preload" instead of "modulepreload" to resolve the race condition where the script runs before the state is loaded.
					rel="preload"
					as="script"
					key={ depHandle || `${ handle }-dep-${ index }` }
					href={ depSrc }
					id={ `${ depHandle }-js-modulepreload` }
				/>
			);
		}

		return (
			<Script
				key={ depHandle || `${ handle }-dep-${ index }` }
				type="module"
				src={ depSrc }
				/*
				 * Use lazyOnload strategy for dependencies to ensure they are loaded asynchronously.
				 * This strategy is recommended for non-blocking scripts and they prevent preload warnings.
				 */
				strategy="lazyOnload"
				{ ...( depHandle && { id: depHandle } ) }
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
			src={ src }
			strategy="lazyOnload"
			{ ...props }
			{ ...( handle && { id: handle } ) }
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
