import React, { type PropsWithChildren } from 'react';
import NextScript from 'next/script';
import Script from '@/components/script';
import ScriptModule from '@/components/script-module';
import { type EnqueuedScriptProps, type ScriptModuleProps } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';

/**
 * Renders a list of script elements from a given array of script data.
 *
 * @param props - The props for the component.
 * @param props.scripts - Array of script objects to be rendered.
 * @return A collection of `<Script />` components.
 */
const ScriptMap = ( { scripts }: { scripts: EnqueuedScriptProps[] } ) => (
	<>
		{ scripts?.map( ( { handle, src, ...rest }, id ) => {
			return (
				<Script
					key={ handle || id }
					src={ src || undefined }
					{ ...rest }
				/>
			);
		} ) }
	</>
);

/**
 * Generates and renders the import map for script modules.
 *
 * @param props - The props for the component.
 * @param props.scriptModules - Array of script module objects to generate import map from.
 * @return A Script component containing the import map if dependencies exist.
 */
const ImportMap = ( {
	scriptModules,
}: {
	scriptModules: ScriptModuleProps[];
} ) => {
	// Generate import map from all module dependencies
	const moduleAPIRoute = '/api/proxy/js/module';
	const { homeUrl } = getConfig();
	const imports = scriptModules.reduce< Record< string, string > >(
		( acc, module ) => {
			module.dependencies?.forEach( ( dep ) => {
				const { handle, src } = dep?.connectedScriptModule!;
				acc[ handle ] = src.replace( homeUrl, moduleAPIRoute );
			} );
			return acc;
		},
		{}
	);

	// Only render if we have imports
	if ( Object.keys( imports ).length === 0 ) {
		return null;
	}

	return (
		/*
		 * "@/components/script" is not taking the children into
		 * consideration, so it wasn't printing the import map.
		 */
		<NextScript
			type="importmap"
			id="wp-importmap"
			strategy="beforeInteractive"
		>
			{ JSON.stringify( { imports } ) }
		</NextScript>
	);
};

/**
 * Renders a list of script module elements from a given array of script module data.
 *
 * @param props - The props for the component.
 * @param props.scriptModules - Array of script module objects to be rendered.
 * @return A collection of `<ScriptModule />` components.
 */
const ScriptModuleMap = ( {
	scriptModules,
}: {
	scriptModules?: ScriptModuleProps[];
} ) => {
	// Array to store handles of script modules that should not be loaded
	const uniqueScriptModuleDependencies = new Set< string >();

	// Filter out script modules with invalid dependencies (no handle or src)
	const filteredScriptModules =
		scriptModules?.map( ( scriptModule ) => {
			scriptModule.dependencies =
				// Filter out invalid and duplicate dependencies
				scriptModule.dependencies?.filter( ( dep ) => {
					const isValid =
						dep?.connectedScriptModule?.handle &&
						dep?.connectedScriptModule?.src &&
						// If the script module is already included in the uniqueDependencies array, it is considered redundant and will be marked as invalid to prevent duplication.
						! uniqueScriptModuleDependencies.has(
							dep.connectedScriptModule!.handle!
						);

					// Add the handle to the uniqueScriptModuleDependencies array if it's valid.
					if ( isValid ) {
						uniqueScriptModuleDependencies.add(
							dep.connectedScriptModule!.handle!
						);
					}

					return isValid;
				} ) || [];

			return scriptModule;
		} ) || [];

	if ( ! filteredScriptModules.length ) {
		return null;
	}

	return (
		<>
			<ImportMap scriptModules={ filteredScriptModules } />

			{ filteredScriptModules.map(
				( { handle, src, extraData, dependencies }, id ) => {
					if ( ! src ) {
						return null;
					}

					// We use this to prevent (re)loading the main script module if it's already included in the page.
					const shouldLoadMainScript =
						! uniqueScriptModuleDependencies.has( handle! );

					return (
						<ScriptModule
							key={ handle || id }
							handle={ handle }
							src={ shouldLoadMainScript ? src : undefined }
							extraData={ extraData }
							dependencies={ dependencies }
						/>
					);
				}
			) }
		</>
	);
};

/**
 * Renders a list of scripts.
 *
 * @param props - The props for the component.
 * @param props.scripts - Array of script objects to be included in the page.
 * @param props.children - The children elements to be rendered.
 * @param props.scriptModules - Array of script module objects to be included in the page.
 * @return A collection of script elements.
 */
export function TemplateScripts( {
	children,
	scripts,
	scriptModules,
}: PropsWithChildren< {
	scripts: EnqueuedScriptProps[] | undefined;
	scriptModules: ScriptModuleProps[] | undefined;
} > ) {
	// Separate scripts by location
	const headerScripts =
		scripts?.filter( ( script ) => script.location === 'header' ) ?? [];
	const footerScripts =
		scripts?.filter( ( script ) => script.location === 'footer' ) ?? [];

	return (
		<>
			{ headerScripts.length > 0 && (
				<ScriptMap scripts={ headerScripts } />
			) }

			{ scriptModules && (
				<ScriptModuleMap scriptModules={ scriptModules } />
			) }

			{ children }

			{ footerScripts.length > 0 && (
				<ScriptMap scripts={ footerScripts } />
			) }
		</>
	);
}
