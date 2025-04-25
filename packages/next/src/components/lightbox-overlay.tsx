import type { ReactNode } from 'react';

/**
 * Renders the lightbox overlay for displaying an enlarged image with interactions.
 *
 * @return The lightbox overlay.
 * @see https://github.com/WordPress/gutenberg/blob/accde16096464ac832fbe8e249a3b61535800800/packages/block-library/src/image/index.php#L253
 */
export function LightboxOverlay(): ReactNode {
	const closeButtonLabel = 'Close';
	// These are the css variables for the button color and background color. Ideally, these should be fetched from the site's theme.json.
	// Since we don't have a way to do this, we'll use the default variables.
	// @todo Implement fetching css variables from theme.json
	const closeButtonColor = 'var(--wp--preset--color--contrast)';
	const backgroundColor = 'var(--wp--preset--color--base)';

	return (
		<div
			className="wp-lightbox-overlay zoom"
			data-wp-interactive="core/image"
			data-wp-context="{}"
			data-wp-bind--role="state.roleAttribute"
			data-wp-bind--aria-label="state.currentImage.ariaLabel"
			data-wp-bind--aria-modal="state.ariaModal"
			data-wp-class--active="state.overlayEnabled"
			data-wp-class--show-closing-animation="state.showClosingAnimation"
			data-wp-watch="callbacks.setOverlayFocus"
			data-wp-on--keydown="actions.handleKeydown"
			data-wp-on-async--touchstart="actions.handleTouchStart"
			data-wp-on--touchmove="actions.handleTouchMove"
			data-wp-on-async--touchend="actions.handleTouchEnd"
			data-wp-on-async--click="actions.hideLightbox"
			data-wp-on-async-window--resize="callbacks.setOverlayStyles"
			data-wp-on-async-window--scroll="actions.handleScroll"
			data-wp-bind--style="state.overlayStyles"
			tabIndex={ -1 }
		>
			<button
				type="button"
				aria-label={ closeButtonLabel }
				style={ { fill: closeButtonColor } }
				className="close-button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="20"
					height="20"
					aria-hidden="true"
					focusable="false"
				>
					<path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
				</svg>
			</button>
			<div className="lightbox-image-container">
				<figure
					data-wp-bind--class="state.currentImage.figureClassNames"
					data-wp-bind--style="state.figureStyles"
				>
					<img
						alt=""
						data-wp-bind--alt="state.currentImage.alt"
						data-wp-bind--class="state.currentImage.imgClassNames"
						data-wp-bind--style="state.imgStyles"
						data-wp-bind--src="state.currentImage.currentSrc"
					/>
				</figure>
			</div>
			<div className="lightbox-image-container">
				<figure
					data-wp-bind--class="state.currentImage.figureClassNames"
					data-wp-bind--style="state.figureStyles"
				>
					<img
						alt=""
						data-wp-bind--alt="state.currentImage.alt"
						data-wp-bind--class="state.currentImage.imgClassNames"
						data-wp-bind--style="state.imgStyles"
						data-wp-bind--src="state.enlargedSrc"
					/>
				</figure>
			</div>
			<div
				className="scrim"
				style={ { backgroundColor } }
				aria-hidden="true"
			></div>
		</div>
	);
}
