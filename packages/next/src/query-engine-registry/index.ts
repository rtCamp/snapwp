import { QueryEngineBase } from '@snapwp/core';
import { ApolloQueryEngine } from '@snapwp/apollo';
import { getConfig } from '@snapwp/core/config';

/**
 * Query Engine Registry
 */
export class QueryEngineRegistry {
	private static instance: QueryEngineRegistry | undefined;
	private queryEngine: QueryEngineBase< unknown, unknown > | undefined;

	/**
	 * Constructor
	 *
	 * @param queryEngine Query engine
	 */
	private constructor( queryEngine?: QueryEngineBase< unknown, unknown > ) {
		this.registerQueryEngine( queryEngine );
	}

	/**
	 * Get the query engine
	 *
	 * @return The query engine
	 */
	public getQueryEngine(): QueryEngineBase< unknown, unknown > {
		if ( ! this.queryEngine ) {
			throw new Error( 'Query engine is not registered' );
		}
		return this.queryEngine!;
	}

	/**
	 * Register the query engine
	 *
	 * @param queryEngine Query engine
	 */
	private registerQueryEngine(
		queryEngine?: QueryEngineBase< unknown, unknown >
	) {
		if ( queryEngine ) {
			this.queryEngine = queryEngine;
		} else {
			this.queryEngine = new ApolloQueryEngine();
		}
	}

	/**
	 * Get the instance
	 *
	 * @return The instance
	 */
	public static getInstance(): QueryEngineRegistry {
		if ( ! QueryEngineRegistry.instance ) {
			const { queryEngine } = getConfig();
			QueryEngineRegistry.instance = new QueryEngineRegistry(
				queryEngine
			);
		}
		return QueryEngineRegistry.instance;
	}
}
