"use client"
import styles from '../app/quizzes/page.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CREATE_USER, GET_USERS } from '@/apollos/queries'
import { useMutation } from '@apollo/client';
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFormData } from '@/store/reducers/formSlice'
import { IContact } from '@/models/IForm'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react';



const schema: yup.ObjectSchema<MyForm> = yup.object({
	contacts: yup.object({
		email: yup
			.string()
			.required('Email is required')
			.min(2, 'Min 2 characters')
			.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),

		tel: yup
			.string()
			.required('Phone number is required')
			.matches(/^\+?[0-9-]+$/, 'Invalid phone number format'),
	}),
});

interface MyForm {
	contacts: IContact
}


const ContactForm = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)

	const router = useRouter();
	const { register, handleSubmit, formState: { errors }, } = useForm<MyForm>(
		{ mode: "onChange", resolver: yupResolver(schema), defaultValues: { contacts: formData.contacts } })


	// const { data } = useSuspenseQuery<TodoList>(GET_USERS, {
	// 	fetchPolicy: "cache-first",
	// });
	console.log(formData);


	const submit: SubmitHandler<MyForm> = async (data) => {
		dispatch(setFormData(data))
		router.push('/quizzes/1')
	}


	const changeHandle = (e: any) => {
		// setInput({ ...input, contacts: { tel: e.target.value } })
		dispatch(setFormData({ [e.target.name.text]: e.target.value }))
		console.log(e.target.name);

	}
	return (
		<div>
			<form className={styles.contactForm} onSubmit={handleSubmit(submit)}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Номер телефона</p>
						<input {...register('contacts.tel', { required: true })} value={formData.contacts.tel} onChange={(e) => changeHandle(e)} placeholder='+7 999 999-99-99' type="text" />
						<span>{errors.contacts?.tel?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Email</p>
						<input {...register('contacts.email' as const, { required: true })} value={formData.contacts.email} onChange={(e) => changeHandle(e)} placeholder='webstudio.fractal@example.com' type="text" />
						<span>{errors.contacts?.email?.message}</span>
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
