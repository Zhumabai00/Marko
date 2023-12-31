"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { Buttons } from '@/components/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFormData, handleChange } from '@/store/reducers'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IPersonal } from '@/models/IForm'

interface IPerson {
	personalData: IPersonal
}

const schema: yup.ObjectSchema<IPersonal> = yup.object({
	// personalData: yup.object({
	nickName: yup
		.string()
		.required('NickName is required')
		.min(2, 'Min 2 characters')
		.max(30, 'Max 30 characters')
		.matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed'),

	name: yup
		.string()
		.required('Name is required')
		.matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
		.max(50, 'Max 30 characters'),

	surname: yup
		.string()
		.required('Surname is required')
		.matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
		.max(50, 'Max 30 characters'),

	sex: yup.object().shape({
		label: yup.string().required('Option is required'),
		value: yup.string().required('Option is required'),
	}),
	// }),
});

const Quiz1 = () => {
	const dispatch = useAppDispatch()
	const { data, inputstore } = useAppSelector((state) => state.formReducer)
	const router = useRouter();
	const { register, handleSubmit, control, formState: { errors } } = useForm<IPersonal>(
		{ mode: "onChange", resolver: yupResolver(schema), defaultValues: {} })


	const submit: SubmitHandler<IPersonal> = async (data) => {
		dispatch(setFormData({ personalData: data }))
		router.push('/quizzes/2')
	}

	const changeHandle = (e: any) => {
		dispatch(handleChange({ [e.target.name]: e.target.value })),
			console.log(inputstore)
	}
	const options = [
		{ value: 'man', label: 'мужской' },
		{ value: 'woman', label: 'женский' },
	];

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Никнейм</p>
						<input {...register(`nickName`, { required: true })} onChange={changeHandle} value={inputstore.nickName} placeholder='Your nickname' type="text" />
						<span>{errors.nickName?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Имя</p>
						<input {...register('name', { required: true })} onChange={changeHandle} value={inputstore.name} placeholder='Your name' type="text" />
						<span>{errors.name?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Фамилия</p>
						<input {...register('surname', { required: true })} onChange={changeHandle} value={inputstore.surname} placeholder='Your full name' type="text" />
						<span>{errors.surname?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Пол</p>
						<Controller
							name="sex"
							control={control}
							defaultValue={data.personalData.sex}
							render={({ field }) => (
								<Select
									className={styles.select}
									{...field}
									options={options}
									instanceId={useId()}
								/>
							)}
						/>
						<span>{errors.sex?.message}</span>
					</div>
				</div>
			</div>
			<Buttons />
		</form>
	)
}

export default Quiz1
