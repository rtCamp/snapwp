import CoreAudio from '../core-audio';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe( 'CoreAudio', () => {
	const attributes = {
		autoplay: true,
		caption: 'Sample Caption',
		loop: true,
		src: 'sample-audio.mp3',
		style: JSON.stringify( {
			spacing: {
				margin: {
					top: 'var:preset|spacing|50',
					bottom: 'var:preset|spacing|50',
					left: 'var:preset|spacing|50',
					right: 'var:preset|spacing|50',
				},
			},
		} ),
	};

	const renderedHtml = `
    <figure class="wp-block-audio" style="margin-top:var(--wp--preset--spacing--50);margin-right:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50);margin-left:var(--wp--preset--spacing--50)">
      <audio controls src="sample-audio.mp3"></audio>
      <figcaption class="wp-element-caption">Sample Caption</figcaption>
    </figure>
  `;

	test( 'renders correctly with all attributes', () => {
		const { container, asFragment } = render(
			<CoreAudio
				attributes={ attributes }
				renderedHtml={ renderedHtml }
			/>
		);

		expect( screen.getByText( 'Sample Caption' ) ).toBeInTheDocument();

		const audioElement = container.querySelector( 'audio' );
		expect( audioElement ).not.toBeNull();
		expect( audioElement ).toHaveAttribute( 'controls', '' );
		expect( audioElement ).toHaveAttribute( 'src', 'sample-audio.mp3' );
		expect( audioElement ).toHaveAttribute( 'autoplay', '' );
		expect( audioElement ).toHaveAttribute( 'loop', '' );

		const figureElement = container.querySelector( 'figure' );
		expect( figureElement ).not.toBeNull();
		expect( figureElement ).toHaveStyle(
			'margin-top:var(--wp--preset--spacing--50)'
		);
		expect( figureElement ).toHaveStyle(
			'margin-right:var(--wp--preset--spacing--50)'
		);
		expect( figureElement ).toHaveStyle(
			'margin-bottom:var(--wp--preset--spacing--50)'
		);
		expect( figureElement ).toHaveStyle(
			'margin-left:var(--wp--preset--spacing--50)'
		);

		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders null when src is not provided', () => {
		const attributesWithoutSrc = {
			...attributes,
			src: undefined,
		};

		const { container, asFragment } = render(
			<CoreAudio attributes={ attributesWithoutSrc } renderedHtml="" />
		);
		expect( container.firstChild ).toBeNull();
		expect( asFragment() ).toMatchSnapshot();
	} );

	test( 'renders correctly without optional attributes', () => {
		const attributesWithOnlySrc = {
			src: 'sample-audio.mp3',
		};

		const { container, asFragment } = render(
			<CoreAudio attributes={ attributesWithOnlySrc } renderedHtml="" />
		);

		const audioElement = container.querySelector( 'audio' );
		expect( audioElement ).toHaveAttribute( 'src', 'sample-audio.mp3' );
		expect( asFragment() ).toMatchSnapshot();
	} );
} );
