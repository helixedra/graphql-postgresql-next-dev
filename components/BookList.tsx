"use client";
import React, { useState } from "react";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/apollo/apollo-client";
import {
  GET_BOOKS,
  DELETE_BOOK,
  CREATE_BOOK,
  UPDATE_BOOK,
} from "@/lib/graphql/queries/books";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import Link from "next/link";
import BookForm from "@/components/BookForm";

interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn?: string;
  publicationYear?: number;
  genre?: string;
  publisher?: string;
  pageCount?: number;
  language?: string;
  price?: number;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
}

function BookListContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_BOOKS);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache, { data: { deleteBook } }) {
      const existingData = cache.readQuery({
        query: GET_BOOKS,
      }) as { books: Book[] } | null;

      if (existingData) {
        cache.writeQuery({
          query: GET_BOOKS,
          data: {
            books: existingData.books.filter(
              (book) => book.bookId !== deleteBook.bookId
            ),
          },
        });
      }
    },
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    update(cache, { data: { createBook } }) {
      const existingData = cache.readQuery({
        query: GET_BOOKS,
      }) as { books: Book[] } | null;

      if (existingData) {
        cache.writeQuery({
          query: GET_BOOKS,
          data: {
            books: [...existingData.books, createBook],
          },
        });
      }
    },
  });

  const handleCreate = async (formState: any) => {
    await createBook({ variables: { ...formState } });
  };

  const handleDelete = (bookId: number) => {
    deleteBook({
      variables: { bookId },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-4">
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-black text-white px-4 py-2 rounded cursor-pointer mb-4"
      >
        Add Book
      </button>
      <BookForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.books.map((book: Book) => (
          <div
            key={book.bookId}
            className="flex flex-col p-4 border border-zinc-200 hover:bg-zinc-100 rounded-md shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            {book.isbn && (
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
            )}
            {book.publicationYear && (
              <p>
                <strong>Year:</strong> {book.publicationYear}
              </p>
            )}
            {book.genre && (
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
            )}
            {book.publisher && (
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
            )}
            {book.pageCount && (
              <p>
                <strong>Pages:</strong> {book.pageCount}
              </p>
            )}
            {book.language && (
              <p>
                <strong>Language:</strong> {book.language}
              </p>
            )}
            {book.price && (
              <p>
                <strong>Price:</strong> ${book.price.toFixed(2)}
              </p>
            )}
            <p>
              <strong>In Stock:</strong> {book.inStock ? "Yes" : "No"}
            </p>

            <div className="flex mt-3 pt-3 border-t border-zinc-200 space-x-2">
              <Link
                href={`/books/edit/${book.bookId}`}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <AiOutlineEdit className="mr-1" /> Edit
              </Link>

              <button
                className="flex items-center text-red-600 hover:text-red-800"
                onClick={() => handleDelete(book.bookId)}
              >
                <RiDeleteBinFill className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data?.books?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No books found. Add a book to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default function BookList() {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <BookListContent />
    </ApolloProvider>
  );
}
