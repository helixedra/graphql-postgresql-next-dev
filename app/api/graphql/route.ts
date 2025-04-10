import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import pool from "@/lib/db";

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    passwordHash: String!
    firstName: String
    lastName: String
    isActive: Boolean!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
    lastLoginAt: String
    phone: String
    avatarUrl: String
    bio: String
    dateOfBirth: String
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      passwordHash: String!
      firstName: String
      lastName: String
      isActive: Boolean
      isAdmin: Boolean
      phone: String
      avatarUrl: String
      bio: String
      dateOfBirth: String
    ): User!
    deleteUser(id: Int!): User
  }
`;

interface UserArgs {
  id: number;
}

interface CreateUserArgs {
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  dateOfBirth?: string;
}

const resolvers = {
  Query: {
    users: async () => {
      const { rows } = await pool.query("SELECT * FROM users");
      return rows.map((row) => ({
        id: row.id,
        username: row.username,
        email: row.email,
        passwordHash: row.password_hash,
        firstName: row.first_name,
        lastName: row.last_name,
        isActive: row.is_active,
        isAdmin: row.is_admin,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        lastLoginAt: row.last_login_at,
        phone: row.phone,
        avatarUrl: row.avatar_url,
        bio: row.bio,
        dateOfBirth: row.date_of_birth,
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
        email: rows[0].email,
        passwordHash: rows[0].password_hash,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        isActive: rows[0].is_active,
        isAdmin: rows[0].is_admin,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
        lastLoginAt: rows[0].last_login_at,
        phone: rows[0].phone,
        avatarUrl: rows[0].avatar_url,
        bio: rows[0].bio,
        dateOfBirth: rows[0].date_of_birth,
      };
    },
  },
  Mutation: {
    createUser: async (_: any, args: CreateUserArgs) => {
      const {
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        isActive = true,
        isAdmin = false,
        phone,
        avatarUrl,
        bio,
        dateOfBirth,
      } = args;
      const { rows } = await pool.query(
        `INSERT INTO users (
          username, email, password_hash, first_name, last_name, is_active, is_admin, phone, avatar_url, bio, date_of_birth
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          username,
          email,
          passwordHash,
          firstName,
          lastName,
          isActive,
          isAdmin,
          phone,
          avatarUrl,
          bio,
          dateOfBirth,
        ]
      );
      return {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
        passwordHash: rows[0].password_hash,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        isActive: rows[0].is_active,
        isAdmin: rows[0].is_admin,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
        lastLoginAt: rows[0].last_login_at,
        phone: rows[0].phone,
        avatarUrl: rows[0].avatar_url,
        bio: rows[0].bio,
        dateOfBirth: rows[0].date_of_birth,
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
        email: rows[0].email,
        passwordHash: rows[0].password_hash,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        isActive: rows[0].is_active,
        isAdmin: rows[0].is_admin,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
        lastLoginAt: rows[0].last_login_at,
        phone: rows[0].phone,
        avatarUrl: rows[0].avatar_url,
        bio: rows[0].bio,
        dateOfBirth: rows[0].date_of_birth,
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
