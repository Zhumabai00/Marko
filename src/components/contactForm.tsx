"use client"
import styles from '../app/quizzes/page.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { FormState, IContact } from '@/models/IForm'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { setFormData, handleChange } from '@/store/reducers'

const schema: yup.ObjectSchema<IContact> = yup.object({
	// contacts: yup.object({
	email: yup
		.string()
		.required('Email is required')
		.min(2, 'Min 2 characters')
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),

	tel: yup
		.string()
		.required('Phone number is required')
		.matches(/^\+?[0-9-]+$/, 'Invalid phone number format'),
	// }),
});

interface MyForm {
	// contacts: IContact
}


const ContactForm = () => {
	const dispatch = useAppDispatch()
	const { data, inputstore } = useAppSelector((state) => state.formReducer)

	const router = useRouter();
	const { register, handleSubmit, formState: { errors }, } = useForm<IContact>(
		{ mode: "onChange", resolver: yupResolver(schema), defaultValues: {} })


	// const { data } = useSuspenseQuery<TodoList>(GET_USERS, {
	// 	fetchPolicy: "cache-first",
	// });
	console.log("inputstore", inputstore);
	console.log("data", data);


	const submit: SubmitHandler<MyForm> = async (data) => {
		dispatch(setFormData({ contacts: data }))
		router.push('/quizzes/1')
	}


	const changeHandle = (e: any) => {
		dispatch(handleChange({ [e.target.name]: e.target.value })),
			console.log(inputstore)
	}

	return (
		<div>
			<form className={styles.contactForm} onSubmit={handleSubmit(submit)}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Номер телефона</p>
						<input {...register('tel', { required: true })} value={inputstore.tel} onChange={changeHandle} placeholder='+7 999 999-99-99' type="text" />
						<span>{errors.tel?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Email</p>
						<input {...register('email' as const, { required: true })} value={inputstore.email} onChange={changeHandle} placeholder='webstudio.fractal@example.com' type="text" />
						<span>{errors.email?.message}</span>
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
