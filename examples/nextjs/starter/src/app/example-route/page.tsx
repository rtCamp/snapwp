import styles from './styles.module.css';

/**
 * You can override the default route using custom route at the same path.
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
