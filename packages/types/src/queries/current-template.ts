import type { TypedDocumentNode } from '@apollo/client';

// Until we figure out generic types for GraphQL queries, we'll use `any` for now.
export type CurrentTemplateDocument = TypedDocumentNode< any, any >;
