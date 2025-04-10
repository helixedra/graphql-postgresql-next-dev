import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $passwordHash: String!
    $firstName: String
    $lastName: String
    $phone: String
    $avatarUrl: String
    $bio: String
    $dateOfBirth: String
  ) {
    createUser(
      username: $username
      email: $email
      passwordHash: $passwordHash
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      avatarUrl: $avatarUrl
      bio: $bio
      dateOfBirth: $dateOfBirth
    ) {
      id
      username
      email
      firstName
      lastName
      phone
      avatarUrl
      bio
      dateOfBirth
    }
  }
`;
