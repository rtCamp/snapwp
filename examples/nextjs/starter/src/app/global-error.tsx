'use client'; // Error boundaries must be Client Components

export default function GlobalError( {
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
} ) {
	const unknownError = 'An unexpected error occurred.';
	const tryAgain = 'Try Again';
	return (
		<div className="error-container">
			<div
				className="error-content"
				dangerouslySetInnerHTML={ {
					__html: error?.message || unknownError,
				} }
			/>
			<div className="buttons">
				<button onClick={ reset }>{ tryAgain }</button>
			</div>
			<style jsx>{ `
				.error-container {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100vh;
					text-align: center;
					background-color: #000;
					color: #fff;
					font-family: Arial, sans-serif;
					padding: 20px;
				}
				.error-content {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 1.5rem;
					border-left: 2px solid rgba( 255, 255, 255, 0.5 );
					padding-left: 20px;
					gap: 12px;
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
