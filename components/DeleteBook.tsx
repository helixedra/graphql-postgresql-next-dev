"use client";

import { useMutation } from "@apollo/client";
import { RiDeleteBinFill } from "react-icons/ri";
import { DELETE_BOOK, GET_BOOKS } from "@/lib/graphql/queries/books";

interface DeleteBookProps {
  bookId: number;
}

export default function DeleteBook({ bookId }: DeleteBookProps) {
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (error) => {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook({
        variables: { bookId },
      }).catch((error) => {
        console.error("Error deleting book:", error);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 flex items-center"
    >
      <RiDeleteBinFill className="mr-1" /> Delete
    </button>
  );
}
