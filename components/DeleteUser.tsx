"use client";
import React, { useState } from "react";
import { gql } from "graphql-tag";
import { useMutation, ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo-client";

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

function DeleteUserButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteUser({
        variables: { id },
        update: (cache) => {
          // Remove the deleted user from cache
          cache.evict({ id: `User:${id}` });
          cache.gc();

          // Refresh the users list query
          cache.evict({ fieldName: "users" });
          cache.gc();
        },
        refetchQueries: [{ query: GET_USERS }],
      });
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
        className={isDeleting ? "opacity-50 cursor-not-allowed" : ""}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}

// Wrapper component that provides Apollo context
export default function DeleteUser({ id }: { id: number }) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <DeleteUserButton id={id} />
    </ApolloProvider>
  );
}
