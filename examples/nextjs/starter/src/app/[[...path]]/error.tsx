'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error( {
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
} ) {
	useEffect( () => {
		// Log the error to an error reporting service
		console.error( error ); // eslint-disable-line no-console
	}, [ error ] );

	const errorMessage = 'Something went wrong! Please check the console logs';
	const tryAgainButtonText = 'Try again';

	return (
		<div>
			<h2>{ errorMessage }</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				{ tryAgainButtonText }
			</button>
		</div>
	);
}
