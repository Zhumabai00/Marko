"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { Buttons } from '@/components/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFormData } from '@/store/reducers'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IPersonal } from '@/models/IForm'

interface IPerson {
	personalData: IPersonal
}

const schema: yup.ObjectSchema<IPerson> = yup.object({
	personalData: yup.object({
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
	}),
});

const Quiz1 = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const router = useRouter();
	const { register, handleSubmit, control, formState: { errors } } = useForm<IPerson>(
		{ mode: "onChange", resolver: yupResolver(schema), defaultValues: { personalData: formData.personalData } })


	const submit: SubmitHandler<IPerson> = async (data) => {
		dispatch(setFormData(data))
		router.push('/quizzes/2')
	}
	const options = [
		{ value: 'man', label: 'man' },
		{ value: 'woman', label: 'woman' },
	];

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Никнейм</p>
						<input {...register(`personalData.nickName`, { required: true })} placeholder='Your nickname' type="text" />
						<span>{errors.personalData?.nickName?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Имя</p>
						<input {...register('personalData.name', { required: true })} placeholder='Your name' type="text" />
						<span>{errors.personalData?.name?.message}</span>
					</div>
					<div className={styles.label}>
						<p>Фамилия</p>
						<input {...register('personalData.surname', { required: true })} placeholder='Your full name' type="text" />
						<span>{errors.personalData?.surname?.message}</span>
					</div>
					<div className={styles.label}>
						<Controller
							name="personalData.sex"
							control={control}
							render={({ field }) => (
								<Select
									className={styles.select}
									{...field}
									options={options}
									instanceId={useId()}
								/>
							)}
						/>
						<span>{errors.personalData?.sex?.message}</span>
					</div>
				</div>
			</div>
			<Buttons />
		</form>
	)
}

export default Quiz1
