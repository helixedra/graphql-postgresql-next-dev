import { gql } from "graphql-tag";

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $isbn: String
    $publicationYear: Int
    $genre: String
    $publisher: String
    $pageCount: Int
    $language: String
    $price: Float
    $inStock: Boolean
  ) {
    createBook(
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
