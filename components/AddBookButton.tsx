"use client";

import Link from "next/link";

export default function AddBookButton() {
  return (
    <Link href="/books/create">
      <button className="bg-black text-white px-4 py-2 rounded cursor-pointer mb-4">
        Add Book
      </button>
    </Link>
  );
}
