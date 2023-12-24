import { gql } from "@apollo/client";

export const GET_USERS = gql`
	query allUsers {
		allUsers {
			id
			tel
			email
		}
	}
`;
export const CREATE_USER = gql`
	mutation createUser($tel: String!, $email: String!) {
		createUser(tel: $tel, email: $email) {
			tel
			email
		}
	}
`;
