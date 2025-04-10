import React from "react";

export default function Header() {
  return (
    <header className="flex items-center p-4 border-b border-zinc-200">
      <h1 className="text-lg font-bold">
        <a href="/" className="hover:underline">
          GraphQL/Apollo + Next.js
        </a>
      </h1>
      <nav>
        <ul className="flex space-x-4 ml-8">
          <li>
            <a href="/users" className="hover:underline">
              Users
            </a>
          </li>
          <li>
            <a href="/users/create" className="hover:underline">
              Create User
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
