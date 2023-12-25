"use client"
import React from 'react'
import styles from '../app/quizzes/page.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CREATE_USER, GET_USERS } from '@/apollos/queries'
import { useMutation } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFormData } from '@/store/reducers/formSlice'

interface MyForm {
	contacts: {
		tel: string
		email: string
	}
}

const ContactForm = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const router = useRouter();
	const { register, handleSubmit } = useForm<MyForm>({ defaultValues: { contacts: formData.contacts } })

	// const { data } = useSuspenseQuery<TodoList>(GET_USERS, {
	// 	fetchPolicy: "cache-first",
	// });

	const [createUser, { error }] = useMutation(CREATE_USER)

	const submit: SubmitHandler<MyForm> = async (data) => {
		dispatch(setFormData(data))
		console.log(data);
		try {
			await createUser({
				variables: {
					tel: data.contacts.tel,
					email: data.contacts.email,
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
						<input {...register('contacts.tel' as const, { required: true })} value={formData.contacts.tel} defaultValue={formData.contacts.tel} placeholder='+7 999 999-99-99' type="text" />
					</div>
					<div className={styles.label}>
						<p>Email</p>
						<input {...register('contacts.email' as const)} defaultValue={formData.contacts.email} placeholder='webstudio.fractal@example.com' type="text" />
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
