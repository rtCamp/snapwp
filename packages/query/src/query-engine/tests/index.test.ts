import { QueryEngine } from '@/query-engine';
import { getConfig, getGraphqlUrl } from '@snapwp/core/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';

jest.mock( '@snapwp/core/config', () => ( {
	getConfig: jest.fn(),
	getGraphqlUrl: jest.fn(),
} ) );

jest.mock( '@apollo/client', () => ( {
	ApolloClient: jest.fn(),
	InMemoryCache: jest.fn(),
} ) );

describe( 'QueryEngine', () => {
	const validConfig = {
		homeUrl: 'https://home.example.com',
	};
	const graphqlUrl = 'https://graphql.example.com';

	beforeEach( () => {
		jest.clearAllMocks();
		( getConfig as jest.Mock ).mockReturnValue( validConfig );
		( getGraphqlUrl as jest.Mock ).mockReturnValue( graphqlUrl );
		( InMemoryCache as jest.Mock ).mockImplementation( () => ( {
			writeQuery: jest.fn(),
			readQuery: jest.fn(),
		} ) );
	} );

	it( 'should initialize the QueryEngine correctly', () => {
		QueryEngine.initialize();

		expect( getGraphqlUrl ).toHaveBeenCalled();
		expect( getConfig ).toHaveBeenCalled();
		expect( ( QueryEngine as any ).graphqlEndpoint ).toBe( graphqlUrl );
		expect( ( QueryEngine as any ).homeUrl ).toBe( validConfig.homeUrl );
		expect( ( QueryEngine as any ).apolloClient ).toBeInstanceOf(
			ApolloClient
		);
	} );

	it( 'should be a singleton', () => {
		const instance1 = QueryEngine.getInstance();
		const instance2 = QueryEngine.getInstance();
		expect( instance1 ).toBe( instance2 );
	} );
} );
