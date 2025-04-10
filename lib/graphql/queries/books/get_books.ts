import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
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
