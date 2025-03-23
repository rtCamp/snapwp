/**
 * Query Engine Base class
 */
export abstract class QueryEngineBase< T, ClientConfig > {
	protected readonly client: T;

	/**
	 * Base Constructor
	 *
	 * @param config configuration
	 */
	protected constructor( config: ClientConfig ) {
		this.client = this.createClient( config );
	}

	/**
	 * Create a new client
	 *
	 * @param config configuration
	 *
	 * @return The client
	 */
	public abstract createClient( config: ClientConfig ): T;

	/**
	 * Get the client
	 *
	 * @return The client
	 */
	public getClient() {
		return this.client;
	}

	/**
	 * Use the client
	 *
	 * @param client Optional client
	 *
	 * @return The client
	 */
	public abstract useClient( client?: T ): void;

	/**
	 * Fetch query.
	 *
	 * @param key Key
	 * @param query Query
	 * @param variables Variables
	 */
	public abstract fetchQuery( {
		key,
		query,
		variables,
	}: {
		key: string[];
		query: unknown;
		variables?: unknown;
	} ): Promise< unknown >;
}
