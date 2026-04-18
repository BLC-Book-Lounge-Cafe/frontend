import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BookDto = {
  __typename?: 'BookDto';
  author: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  isReserved: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

/** A segment of a collection. */
export type BooksCollectionSegment = {
  __typename?: 'BooksCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<BookDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type EntityPropertyFilterInput = {
  fieldName: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type FilteringSpecificationInput = {
  propertyFilters: Array<EntityPropertyFilterInput>;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<BooksCollectionSegment>;
};


export type QueryBooksArgs = {
  filter?: InputMaybe<FilteringSpecificationInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorter?: InputMaybe<SortingSpecificationInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SortingSpecificationInput = {
  descendingOrder: Scalars['Boolean']['input'];
  propertyName: Scalars['String']['input'];
};

export type BooksPageQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilteringSpecificationInput>;
  sorter?: InputMaybe<SortingSpecificationInput>;
}>;


export type BooksPageQuery = { __typename?: 'Query', books?: { __typename?: 'BooksCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean }, items?: Array<{ __typename?: 'BookDto', id: number, name: string, author: string, imageUrl: string, isReserved: boolean }> | null } | null };


export const BooksPageDocument = gql`
    query BooksPage($skip: Int, $take: Int, $filter: FilteringSpecificationInput, $sorter: SortingSpecificationInput) {
  books(skip: $skip, take: $take, filter: $filter, sorter: $sorter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    items {
      id
      name
      author
      imageUrl
      isReserved
    }
  }
}
    `;

/**
 * __useBooksPageQuery__
 *
 * To run a query within a React component, call `useBooksPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksPageQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      filter: // value for 'filter'
 *      sorter: // value for 'sorter'
 *   },
 * });
 */
export function useBooksPageQuery(baseOptions?: Apollo.QueryHookOptions<BooksPageQuery, BooksPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksPageQuery, BooksPageQueryVariables>(BooksPageDocument, options);
      }
export function useBooksPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksPageQuery, BooksPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksPageQuery, BooksPageQueryVariables>(BooksPageDocument, options);
        }
// @ts-ignore
export function useBooksPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BooksPageQuery, BooksPageQueryVariables>): Apollo.UseSuspenseQueryResult<BooksPageQuery, BooksPageQueryVariables>;
export function useBooksPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BooksPageQuery, BooksPageQueryVariables>): Apollo.UseSuspenseQueryResult<BooksPageQuery | undefined, BooksPageQueryVariables>;
export function useBooksPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BooksPageQuery, BooksPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BooksPageQuery, BooksPageQueryVariables>(BooksPageDocument, options);
        }
export type BooksPageQueryHookResult = ReturnType<typeof useBooksPageQuery>;
export type BooksPageLazyQueryHookResult = ReturnType<typeof useBooksPageLazyQuery>;
export type BooksPageSuspenseQueryHookResult = ReturnType<typeof useBooksPageSuspenseQuery>;
export type BooksPageQueryResult = Apollo.QueryResult<BooksPageQuery, BooksPageQueryVariables>;