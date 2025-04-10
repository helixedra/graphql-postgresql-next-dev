import React from "react";
import BookList from "@/components/BookList";

export default function BooksPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Books from DB</h1>
      <BookList />
    </div>
  );
}
