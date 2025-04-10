"use client";
import React, { useState } from "react";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/apollo/apollo-client";
import { RiDeleteBinFill } from "react-icons/ri";
import { GET_USERS, CREATE_USER, DELETE_USER } from "@/lib/graphql/queries";
import UserForm from "./UserForm";

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  dateOfBirth?: string;
}

function UserListContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const handleCreate = async (formState: any) => {
    await createUser({ variables: { ...formState } });
  };

  const handleDelete = (id: number) => {
    deleteUser({
      variables: { id },
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
        Add User
      </button>
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
      />
      <ul className="flex gap-2">
        {data?.users.map((user: User) => (
          <li
            key={user.id}
            className="flex flex-col w-2/12 p-2 border border-zinc-200 hover:bg-zinc-100"
          >
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Avatar URL:</strong> {user.avatarUrl}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
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
