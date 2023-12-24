"use client"
import React from 'react'
import styles from '../app/quizzes/page.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CREATE_USER, GET_USERS } from '@/apollos/queries'
import { useMutation } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter, usePathname } from 'next/navigation'

interface MyForm {
	tel: string
	email: string
}
type Todo = {
	id: string;
	title: string;
	status: string;
};
type TodoList = {
	allTodos: Todo[];
};

const ContactForm = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<MyForm>({ defaultValues: {} })

	// const { data } = useSuspenseQuery<TodoList>(GET_USERS, {
	// 	fetchPolicy: "cache-first",
	// });

	const [createUser, { error }] = useMutation(CREATE_USER)

	const submit: SubmitHandler<MyForm> = async (data) => {
		console.log(data);
		try {
			await createUser({
				variables: {
					tel: data.tel,
					email: data.email,
				},
			})
			console.log('User created successfully!');
		} catch (err) {
			if (err instanceof ApolloError) {
				console.error('Apollo Error:', err.message);
			} else {
				console.error('Unknown Error:', err);
			}
		}
		router.push('/quizzes/1')
	}

	return (
		<div>
			<form className={styles.contactForm} onSubmit={handleSubmit(submit)}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Номер телефона</p>
						<input {...register('tel', { required: true })} placeholder='+7 999 999-99-99' type="text" />
					</div>
					<div className={styles.label}>
						<p>Email</p>
						<input {...register('email')} placeholder='webstudio.fractal@example.com' type="text" />
					</div>
				</div>
				<div className={styles.buttons}>
					<button>Начать</button>
				</div>
			</form>
		</div>
	)
}

export default ContactForm
