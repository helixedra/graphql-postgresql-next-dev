"use client";
import React, { useState } from "react";
import { gql } from "graphql-tag";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo-client";
import { RiDeleteBinFill } from "react-icons/ri";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;

interface User {
  id: number;
  username: string;
}

function UserListContent() {
  const [formState, setFormState] = useState({
    username: "",
  });
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleCreate = async (username: string) => {
    await createUser({ variables: { username } });
    setFormState({ username: "" });
  };

  const handleDelete = (id: number) => {
    deleteUser({
      variables: { id },
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCreate(formState.username);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          className="border p-2 rounded mr-4"
          required
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Create
        </button>
        <p className="mt-4">Please fill in the username to create a user.</p>
      </form>
      <ul className="flex flex-col gap-2 w-72">
        {data?.users.map((user: User) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 border border-zinc-200 hover:bg-zinc-100"
          >
            {user.username}
            <button
              className="opacity-50 hover:opacity-100 cursor-pointer"
              onClick={() => handleDelete(user.id)}
            >
              <RiDeleteBinFill size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function UserList() {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <UserListContent />
    </ApolloProvider>
  );
}
