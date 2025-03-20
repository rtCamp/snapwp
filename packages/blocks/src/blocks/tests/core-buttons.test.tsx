import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoreButtons from '../core-buttons';

jest.mock( '@wordpress/style-engine', () => {
	const actual = jest.requireActual( '@wordpress/style-engine' );
	return {
		...actual,
		compileCSS: jest.fn( ( style ) => style ),
	};
} );

describe( 'CoreButtons', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );
	test( 'renders with given className and style', () => {
		const attributes = {
			cssClassName: 'test-class',
			style: JSON.stringify( { color: 'red' } ),
		};
		const children = <button>Click Me</button>;

		const { asFragment } = render(
			<CoreButtons attributes={ attributes }>{ children }</CoreButtons>
		);

		const divElement = screen.getByRole( 'button', {
			name: 'Click Me',
		} ).parentElement;
		expect( divElement ).toHaveClass( 'test-class' );
		expect( divElement ).toHaveStyle( 'color: red' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders with default attributes when none are provided', () => {
		const children = <button>Click Me</button>;

		const { asFragment } = render(
			<CoreButtons>{ children }</CoreButtons>
		);

		const divElement = screen.getByRole( 'button', {
			name: 'Click Me',
		} ).parentElement;
		expect( divElement ).not.toHaveClass();
		expect( divElement ).not.toHaveStyle( '' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders children correctly', () => {
		const attributes = {
			cssClassName: 'test-class',
			style: JSON.stringify( { color: 'red' } ),
		};
		const children = (
			<>
				<button>Button 1</button>
				<button>Button 2</button>
			</>
		);

		const { asFragment } = render(
			<CoreButtons attributes={ attributes }>{ children }</CoreButtons>
		);

		expect(
			screen.getByRole( 'button', { name: 'Button 1' } )
		).toBeInTheDocument();
		expect(
			screen.getByRole( 'button', { name: 'Button 2' } )
		).toBeInTheDocument();
		expect( asFragment() ).toMatchSnapshot();
	} );
} );
