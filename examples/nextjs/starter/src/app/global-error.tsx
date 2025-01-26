'use client'; // Error boundaries must be Client Components

export default function GlobalError( {
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
} ) {
	const errorMessage = 'Something went wrong!';
	const tryAgainButtonText = 'Try again';

	return (
		<html lang="en">
			<body>
				<h2>{ errorMessage }</h2>
				{ error.message }
				<button onClick={ () => reset() }>
					{ tryAgainButtonText }
				</button>
			</body>
		</html>
	);
}
