"use client";
import { useState } from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@/apollo/apollo-client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;

export default function CreateUserPage() {
  const client = useApolloClient();

  const [form, setForm] = useState({
    username: "",
  });

  const [createUser, { data, error }] = useMutation(CREATE_USER, { client });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ variables: form });
      setForm({ username: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Create user</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          className="border p-2 rounded mr-4"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Create
        </button>
        <p className="mt-4">Please fill in the username to create a user.</p>
      </form>
      <div className="mt-4">
        {data && <p>User created: {data.createUser.username}</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </>
  );
}
