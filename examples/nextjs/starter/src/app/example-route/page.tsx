import styles from './styles.module.css';

/**
 * This is an example of a "traditional" Next.js app route.
 *
 * It coexists alongside the default WordPress template rendering ( in `./[[...path]]` ), but still has access to the global styles and theme.json styles.
 * You can use this to create custom routes that don't rely on the WordPress template hierarchy.
 *
 * @see https://nextjs.org/docs/app/getting-started/layouts-and-pages#nesting-layouts
 */

export default function Page() {
	return (
		<div className={ styles.container }>
			<h1 className="wp-block-heading has-text-align-center has-x-large-font-size">
				This is a test override page
			</h1>
			<div
				style={ { height: '1.25rem' } }
				aria-hidden="true"
				className="wp-block-spacer"
			></div>

			<p className="has-text-align-center">
				This has access to global styles and theme.json styles to some
				extent.
			</p>
		</div>
	);
}
