"use client"
import React, { useId } from 'react'
import styles from './tab.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Select from 'react-select'

interface MyForm {
	tel: string
	email: string
	name: string
	fullname: string
	sex: { value: string; label: string } | string;
}

const Tab1 = () => {
	// const router = useRouter();
	const { register, handleSubmit, control } = useForm<MyForm>({ defaultValues: {} })


	const submit: SubmitHandler<MyForm> = async (data) => {
		// router.push('/quizzes')
		console.log(data);

	}
	const options = [
		{ value: 'мужской', label: 'мужской' },
		{ value: 'женский', label: 'женский' },
	];
	return (
		<form className={styles.contactForm} onSubmit={handleSubmit(submit)}>
			<div className='inputs'>
				<div className='label'>
					<p>Никнейм</p>
					<input {...register('tel', { required: true })} placeholder='Your nickname' type="text" />
				</div>
				<div className='label'>
					<p>Имя</p>
					<input {...register('name')} placeholder='Your name' type="text" />
				</div>
				<div className='label'>
					<p>Фамилия</p>
					<input {...register('fullname')} placeholder='Your full name' type="text" />
				</div>
				<div className='label'>
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
			<button>Начать</button>
		</form>
	)
}

export default Tab1
