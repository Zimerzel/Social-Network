import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_THOUGHT = gql`
    mutation saveThought($thoughtData: ThoughtInput!) {
        saveThought(thoughtData: $thoughtData) {
            _id
            username
            email

        }
    }
`;

export const REMOVE_THOUGHT = gql`
    mutation removeThought($reactionId: String!) {
        removeThought(reactionId: $reactionId) {
            _id
            username
            email

        }
    }
`;