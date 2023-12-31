import { gql } from "@apollo/client";


export const CREATE_USER = gql`
	mutation createUser($about: String!, $advantages: JSON!, $contacts: JSON!, $personalData: JSON!) {
		createUser(about: $about, advantages: $advantages, contacts: $contacts, personalData: $personalData) {
			about
			advantages
			contacts
			personalData
		}
	}
`;
