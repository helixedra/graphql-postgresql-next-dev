import { gql } from "graphql-tag";

export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      bookId
      title
      author
      isbn
      publicationYear
      genre
      publisher
      pageCount
      language
      price
      inStock
      createdAt
      updatedAt
    }
  }
`;
