"use client"
import React from 'react'
import styles from '../app/page.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CREATE_USER, GET_USERS } from '@/apollos/queries'
import { useMutation } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'

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

	const { data } = useSuspenseQuery<TodoList>(GET_USERS, {
		fetchPolicy: "cache-first",
	});

	const [createUser, { error }] = useMutation(CREATE_USER)
	console.log(data);

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
		router.push('/quizzes')
	}

	return (
		<div>
			<form className={styles.contactForm} onSubmit={handleSubmit(submit)}>
				<div className='inputs'>
					<div className='label'>
						<p>Номер телефона</p>
						<input {...register('tel', { required: true })} placeholder='+7 999 999-99-99' type="text" />
					</div>
					<div className='label'>
						<p>Email</p>
						<input {...register('email')} placeholder='webstudio.fractal@example.com' type="text" />
					</div>
				</div>
				<button>Начать</button>
			</form>
		</div>
	)
}

export default ContactForm
