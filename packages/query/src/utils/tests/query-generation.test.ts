import { gql } from '@apollo/client';
import { print } from 'graphql';
import { generateRootQuery, generateTemplateQuery } from '../query-generation';

describe('query-generation utilities', () => {
	const mockFragment1 = gql`
		fragment FragmentOne on RootQuery {
			fieldOne
		}
	`;

	const mockFragment2 = gql`
		fragment FragmentTwo on RootQuery {
			fieldTwo
		}
	`;

	it('generates a valid root query with a single fragment', () => {
		const doc = generateRootQuery([mockFragment1]);
		const printed = print(doc);

		expect(printed).toContain('fragment FragmentOne');
		expect(printed).toContain('query getRoot');
		expect(printed).toContain('...FragmentOne');
	});

	it('generates a valid template query with a single fragment', () => {
		const doc = generateTemplateQuery([mockFragment1]);
		const printed = print(doc);

		expect(printed).toContain('fragment FragmentOne');
		expect(printed).toContain('query getTemplate');
		expect(printed).toContain('templateByUri');
		expect(printed).toContain('...FragmentOne');
	});

	it('handles multiple fragments correctly in root query', () => {
		const doc = generateRootQuery([mockFragment1, mockFragment2]);
		const printed = print(doc);

		expect(printed).toContain('fragment FragmentOne');
		expect(printed).toContain('fragment FragmentTwo');
		expect(printed).toContain('...FragmentOne');
		expect(printed).toContain('...FragmentTwo');
	});

	it('handles multiple fragments correctly in template query', () => {
		const doc = generateTemplateQuery([mockFragment1, mockFragment2]);
		const printed = print(doc);

		expect(printed).toContain('fragment FragmentOne');
		expect(printed).toContain('fragment FragmentTwo');
		expect(printed).toContain('templateByUri');
		expect(printed).toContain('...FragmentOne');
		expect(printed).toContain('...FragmentTwo');
	});
});
