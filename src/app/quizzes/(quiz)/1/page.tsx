"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { Buttons } from '@/components/Buttons'
interface MyForm {
	tel: string
	email: string
	name: string
	fullname: string
	sex: { value: string; label: string } | string;
}

const Quiz1 = () => {
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<MyForm>({ defaultValues: {} })


	const submit: SubmitHandler<MyForm> = async (data) => {
		router.forward()
		router.push('/quizzes/2')
		console.log(data);

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
						<input {...register('tel', { required: true })} placeholder='Your nickname' type="text" />
					</div>
					<div className={styles.label}>
						<p>Имя</p>
						<input {...register('name')} placeholder='Your name' type="text" />
					</div>
					<div className={styles.label}>
						<p>Фамилия</p>
						<input {...register('fullname')} placeholder='Your full name' type="text" />
					</div>
					<div className={styles.label}>
						<Controller
							name="sex"
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
