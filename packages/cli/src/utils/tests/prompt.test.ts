import readline from 'readline';
import { prompt } from '../prompt';

// Mock 'readline'
jest.mock( 'readline' );

describe( 'prompt', () => {
	let mockQuestion: jest.Mock;
	let mockClose: jest.Mock;
	let mockCreateInterface: jest.Mock;

	beforeEach( () => {
		mockQuestion = jest.fn();
		mockClose = jest.fn();
		mockCreateInterface = readline.createInterface as jest.Mock;

		mockCreateInterface.mockReturnValue( {
			question: mockQuestion,
			close: mockClose,
		} );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should call readline.createInterface with process.stdin and process.stdout', async () => {
		// We just need to call prompt to trigger createInterface
		prompt( 'Test query' );
		expect( mockCreateInterface ).toHaveBeenCalledWith( {
			input: process.stdin,
			output: process.stdout,
		} );
	} );

	it( 'should display the query and default value correctly', async () => {
		const query = 'Enter your name';
		const defaultValue = 'User';
		prompt( query, defaultValue );

		// Simulate user providing an answer to resolve the promise
		// The first argument to rl.question is the displayed query
		// The second is the callback, which we'll call manually
		const expectedQuery = `${ query } [default: ${ defaultValue }]\n> `;
		expect( mockQuestion ).toHaveBeenCalledWith(
			expectedQuery,
			expect.any( Function )
		);
	} );

	it( 'should display the query without default value if none is provided', async () => {
		const query = 'Enter your name';
		prompt( query );
		const expectedQuery = `${ query }\n> `;
		expect( mockQuestion ).toHaveBeenCalledWith(
			expectedQuery,
			expect.any( Function )
		);
	} );

	it( 'should resolve with user input if provided', async () => {
		const query = 'Your favorite color?';
		const userAnswer = 'blue';

		mockQuestion.mockImplementation( ( _, callback ) => {
			callback( userAnswer );
		} );

		const result = await prompt( query );
		expect( result ).toBe( userAnswer );
		expect( mockClose ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should resolve with default value if user input is empty', async () => {
		const query = 'Your favorite food?';
		const defaultValue = 'pizza';

		mockQuestion.mockImplementation( ( _, callback ) => {
			callback( '' ); // Simulate user pressing Enter without typing
		} );

		const result = await prompt( query, defaultValue );
		expect( result ).toBe( defaultValue );
		expect( mockClose ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should resolve with empty string if user input is empty and no default value', async () => {
		const query = 'Your favorite food?';

		mockQuestion.mockImplementation( ( _, callback ) => {
			callback( '' ); // Simulate user pressing Enter without typing
		} );

		const result = await prompt( query ); // No default value
		expect( result ).toBe( '' );
		expect( mockClose ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should replace escaped newlines in the answer', async () => {
		const query = 'Enter address';
		const userAnswerWithEscapedNewline = '123 Main St\\nCity, State';
		const expectedAnswer = '123 Main St\nCity, State';

		mockQuestion.mockImplementation( ( _, callback ) => {
			callback( userAnswerWithEscapedNewline );
		} );

		const result = await prompt( query );
		expect( result ).toBe( expectedAnswer );
	} );

	it( 'should not affect answers without escaped newlines', async () => {
		const query = 'Enter name';
		const userAnswer = 'John Doe';

		mockQuestion.mockImplementation( ( _, callback ) => {
			callback( userAnswer );
		} );

		const result = await prompt( query );
		expect( result ).toBe( userAnswer );
	} );
} );
