import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoreButton from '../core-button';
import { getConfig } from '@snapwp/core/config';

jest.mock( '@wordpress/style-engine', () => {
	const actual = jest.requireActual( '@wordpress/style-engine' );
	return {
		...actual,
		compileCSS: jest.fn( ( style ) => style ),
	};
} );

describe( 'CoreButton Component', () => {
	let ORIG_ENV: NodeJS.ProcessEnv;

	beforeEach( () => {
		// @ts-ignore Allow setting global variable for testing
		ORIG_ENV = { ...process.env };
		// @ts-ignore Allow emptying global variable for testing
		global.backupSnapWPConfig = { ...global.__snapWPConfig };
	} );

	afterEach( () => {
		// @ts-ignore Allow emptying global variable for testing
		global.__snapWPConfig = global.backupSnapWPConfig;
		// @ts-ignore Allow emptying global variable for testing
		delete global.backupSnapWPConfig;
		process.env = {
			...ORIG_ENV,
		};
	} );

	test( 'renders with correct tag and attributes for an anchor tag', () => {
		const exampleAttributes = {
			cssClassName: 'test-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'red' } ),
			text: 'Click Me',
			title: 'Test Button',
			url: 'https://example.com',
			tagName: 'a',
			rel: 'noopener',
			linkTarget: '_blank',
			buttonType: 'button',
		};

		const { asFragment } = render(
			<CoreButton attributes={ exampleAttributes } />
		);
		const linkElement = screen.getByRole( 'link', { name: 'Click Me' } );

		expect( linkElement ).toBeInTheDocument();
		expect( linkElement ).toHaveAttribute( 'href', 'https://example.com' );
		expect( linkElement ).toHaveAttribute( 'target', '_blank' );
		expect( linkElement ).toHaveAttribute( 'rel', 'noopener' );
		expect( linkElement ).toHaveClass( 'link-class' );
		expect( linkElement ).toHaveStyle( 'color: red' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders with corrected url', () => {
		const { homeUrl } = getConfig();
		const exampleAttributes = {
			cssClassName: 'test-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'red' } ),
			text: 'Click Me',
			title: 'Test Button',
			url: homeUrl + '/sub',
			tagName: 'a',
			rel: 'noopener',
			linkTarget: '_blank',
			buttonType: 'button',
		};

		const { asFragment } = render(
			<CoreButton attributes={ exampleAttributes } />
		);
		const linkElement = screen.getByRole( 'link', { name: 'Click Me' } );

		expect( linkElement ).toHaveAttribute( 'href', '/sub' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders with correct tag and attributes for a button tag', () => {
		const buttonAttributes = {
			cssClassName: 'test-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'red' } ),
			text: 'Click Me',
			title: 'Test Button',
			tagName: 'button',
			buttonType: 'submit',
		};
		const { asFragment } = render(
			<CoreButton attributes={ buttonAttributes } />
		);
		const buttonElement = screen.getByRole( 'button', {
			name: 'Click Me',
		} );

		expect( buttonElement ).toBeInTheDocument();
		expect( buttonElement ).toHaveAttribute( 'type', 'submit' );
		expect( buttonElement ).not.toHaveAttribute( 'href' );
		expect( buttonElement ).not.toHaveAttribute( 'target' );
		expect( buttonElement ).toHaveClass( 'link-class' );
		expect( buttonElement ).toHaveStyle( 'color: red' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'applies default tag "a" when no tagName is provided', () => {
		const attributesWithoutTag = {
			cssClassName: 'test-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'red' } ),
			text: 'Click Me',
			title: 'Test Button',
			url: 'https://example.com',
			rel: 'noopener',
			linkTarget: '_blank',
			buttonType: 'button',
		};
		const { asFragment } = render(
			<CoreButton attributes={ attributesWithoutTag } />
		);
		const linkElement = screen.getByRole( 'link', { name: 'Click Me' } );

		expect( linkElement.tagName ).toBe( 'A' );
		expect( linkElement ).toHaveAttribute( 'href', 'https://example.com' );
		expect( linkElement ).toHaveStyle( 'color: red' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders without text if no text is provided', () => {
		const attributesWithoutText = {
			cssClassName: 'test-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'red' } ),
			title: 'Test Button',
			url: 'https://example.com',
			tagName: 'a',
			rel: 'noopener',
			linkTarget: '_blank',
			buttonType: 'button',
		};
		const { asFragment } = render(
			<CoreButton attributes={ attributesWithoutText } />
		);
		const linkElement = screen.getByRole( 'link' );

		expect( linkElement ).toBeEmptyDOMElement();
		expect( linkElement ).toHaveStyle( 'color: red' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders without optional attributes if not provided', () => {
		const minimalAttributes = {
			text: 'Minimal Button',
		};
		const { asFragment, container } = render(
			<CoreButton attributes={ minimalAttributes } />
		);
		const linkElement = container.querySelector( 'a' );

		expect( linkElement ).not.toBeNull();
		expect( linkElement ).not.toHaveAttribute( 'href' );
		expect( linkElement ).not.toHaveAttribute( 'target' );
		expect( linkElement ).not.toHaveAttribute( 'rel' );
		expect( linkElement ).not.toHaveClass();
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders correctly with custom CSS classes', () => {
		const customClassAttributes = {
			cssClassName: 'custom-class',
			linkClassName: 'link-class',
			style: JSON.stringify( { color: 'blue' } ),
			text: 'Custom Button',
			title: 'Custom Test Button',
			url: 'https://example.com',
			tagName: 'a',
			rel: 'noopener',
			linkTarget: '_blank',
		};
		const { asFragment } = render(
			<CoreButton attributes={ customClassAttributes } />
		);
		const linkElement = screen.getByRole( 'link', {
			name: 'Custom Button',
		} );

		expect( linkElement ).toHaveClass( 'link-class' );
		expect( linkElement ).toHaveStyle( 'color: blue' );
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders with empty attributes object', () => {
		const { asFragment, container } = render(
			<CoreButton attributes={ {} } />
		);
		const linkElement = container.querySelector( 'a' );

		expect( linkElement ).not.toBeNull();
		expect( linkElement!.tagName ).toBe( 'A' );
		expect( linkElement ).toBeEmptyDOMElement();
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders with undefined attributes', () => {
		const { asFragment, container } = render(
			<CoreButton attributes={ undefined } />
		);
		const linkElement = container.querySelector( 'a' );

		expect( linkElement ).not.toBeNull();
		expect( linkElement!.tagName ).toBe( 'A' );
		expect( linkElement ).toBeEmptyDOMElement();
		expect( asFragment() ).toMatchSnapshot();
	} );
} );
