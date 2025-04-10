import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import pool from "@/lib/db";

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(username: String!): User!
    deleteUser(id: Int!): User
  }
`;

interface UserArgs {
  id: number;
}

interface CreateUserArgs {
  username: string;
}

const resolvers = {
  Query: {
    users: async () => {
      const { rows } = await pool.query("SELECT * FROM users");
      return rows.map((row) => ({
        id: row.id,
        username: row.username,
      }));
    },
    user: async (_: any, { id }: UserArgs) => {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (!rows[0]) return null;
      return {
        id: rows[0].id,
        username: rows[0].username,
      };
    },
  },
  Mutation: {
    createUser: async (_: any, args: CreateUserArgs) => {
      const { username } = args;
      const { rows } = await pool.query(
        "INSERT INTO users (username) VALUES ($1) RETURNING *",
        [username]
      );
      return {
        id: rows[0].id,
        username: rows[0].username,
      };
    },
    deleteUser: async (_: any, { id }: UserArgs) => {
      const { rows } = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      if (rows.length === 0) return null;
      return {
        id: rows[0].id,
        username: rows[0].username,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
