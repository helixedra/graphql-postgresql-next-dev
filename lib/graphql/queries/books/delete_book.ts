import { gql } from "@apollo/client";

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: Int!) {
    deleteBook(bookId: $bookId) {
      bookId
    }
  }
`;
