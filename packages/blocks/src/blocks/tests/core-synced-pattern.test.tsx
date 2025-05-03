import { render, screen } from '@testing-library/react';

import { CoreSyncedPattern } from '../core-synced-pattern';

describe('CoreSyncedPattern Component', () => {
	it('renders children correctly', () => {
		const { container } = render(
			<CoreSyncedPattern>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		expect(container).toHaveTextContent('Test Child');
	});

	it('applies className from renderedHtml', () => {
		const renderedHtml = '<div class="test-class another-class"></div>';
		const { container } = render(
			<CoreSyncedPattern renderedHtml={renderedHtml}>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass('test-class', 'another-class');
	});

	it('applies style from attributes', () => {
		const style = JSON.stringify({ color: 'red', padding: '10px' });
		const { container } = render(
			<CoreSyncedPattern attributes={{ style }}>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		const wrapper = container.firstChild;
		expect(wrapper).toHaveStyle({
			color: 'red',
			padding: '10px',
		});
	});

	it('handles empty attributes gracefully', () => {
		const { container } = render(
			<CoreSyncedPattern attributes={undefined}>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		expect(container).toHaveTextContent('Test Child');
	});

	it('handles empty renderedHtml gracefully', () => {
		const { container } = render(
			<CoreSyncedPattern renderedHtml={undefined}>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		expect(container).toHaveTextContent('Test Child');
	});

	it('combines className and style correctly', () => {
		const renderedHtml = '<div class="test-class"></div>';
		const style = JSON.stringify({ color: 'blue' });
		const { container } = render(
			<CoreSyncedPattern
				renderedHtml={renderedHtml}
				attributes={{ style }}
			>
				<div>Test Child</div>
			</CoreSyncedPattern>
		);

		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass('test-class');
		expect(wrapper).toHaveStyle({ color: 'blue' });
	});
}); 