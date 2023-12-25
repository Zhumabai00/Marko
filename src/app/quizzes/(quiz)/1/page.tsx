"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { Buttons } from '@/components/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFormData } from '@/store/reducers'
interface MyForm {
	nickName: string
	name: string
	fullname: string
	sex: { value: string; label: string } | string;
}
interface IPerson {
	personalData: MyForm | string
}

const Quiz1 = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<IPerson>({ defaultValues: { personalData: formData.personalData } })


	const submit: SubmitHandler<IPerson> = async (data) => {
		dispatch(setFormData(data))
		router.push('/quizzes/2')
	}
	const options = [
		{ value: 'мужской', label: 'мужской' },
		{ value: 'женский', label: 'женский' },
	];

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Никнейм</p>
						<input {...register(`personalData.nickName` as const, { required: true })} placeholder='Your nickname' type="text" />
					</div>
					<div className={styles.label}>
						<p>Имя</p>
						<input {...register('personalData.name' as const)} placeholder='Your name' type="text" />
					</div>
					<div className={styles.label}>
						<p>Фамилия</p>
						<input {...register('personalData.fullname' as const)} placeholder='Your full name' type="text" />
					</div>
					<div className={styles.label}>
						<Controller
							name="personalData.sex"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Select
									className={styles.select}

									{...field}
									options={options}
									instanceId={useId()}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<Buttons />
		</form>
	)
}

export default Quiz1
