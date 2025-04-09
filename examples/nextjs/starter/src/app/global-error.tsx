'use client'; // Error boundaries must be Client Components

import {DefaultError} from '@snapwp/next/defaultError';

export default function GlobalError( {
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
} ) {
	return <DefaultError error={ error } reset={ reset } />;
}
