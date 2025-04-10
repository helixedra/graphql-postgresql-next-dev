import { gql } from "graphql-tag";

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $bookId: Int!
    $title: String
    $author: String
    $isbn: String
    $publicationYear: Int
    $genre: String
    $publisher: String
    $pageCount: Int
    $language: String
    $price: Float
    $inStock: Boolean
  ) {
    updateBook(
      bookId: $bookId
      title: $title
      author: $author
      isbn: $isbn
      publicationYear: $publicationYear
      genre: $genre
      publisher: $publisher
      pageCount: $pageCount
      language: $language
      price: $price
      inStock: $inStock
    ) {
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
