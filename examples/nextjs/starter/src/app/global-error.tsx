'use client'; // Error boundaries must be Client Components

export default function GlobalError( {
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
} ) {
	const unknownError =
		'An unexpected error has occurred. Please check the logs for more details.';
	const tryAgain = 'Try Again';

	let errorMessage = unknownError;

	// Show error message in development mode.
	// In Production mode NextJS will add message `An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.` So for that we are adding our own generic mesasge
	// eslint-disable-next-line n/no-process-env
	if ( process.env.NODE_ENV === 'development' ) {
		errorMessage = error?.message || unknownError;
	}

	return (
		<div className="error-container">
			<div
				className="error-content"
				dangerouslySetInnerHTML={ {
					__html: errorMessage,
				} }
			/>
			<div className="error-digest">
				{ error?.digest && error.digest }
			</div>
			<div className="buttons">
				<button onClick={ reset }>{ tryAgain }</button>
			</div>
			<style jsx>{ `
				.error-container {
					display: block;
					height: 100vh;
					text-align: center;
					background-color: #000;
					color: #fff;
					font-family: Arial, sans-serif;
					padding: 20px;
				}
				.error-content {
					display: block;
					font-size: 1.5rem;
					padding-left: 20px;
					width: 50%;
					white-space: wrap;
				}
				.error-digest {
					font-size: 0.8rem;
					margin-top: 10px;
				}
				.buttons {
					margin-top: 20px;
					display: flex;
					gap: 10px;
				}
				button,
				.home-button {
					padding: 10px 20px;
					background-color: #ff5555;
					color: #fff;
					border: none;
					border-radius: 5px;
					cursor: pointer;
					transition: background 0.3s ease;
					font-size: 1rem;
					text-decoration: none;
				}
				button:hover,
				.home-button:hover {
					background-color: #cc4444;
				}
			` }</style>
		</div>
	);
}
