"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import basket from '@/assets/basket.svg'
import { Buttons } from '@/components/Buttons'

interface FormData {
	advantages: string
	email: string
	checkbox: string
	radio: string
	sex: { value: string; label: string } | string;
	inputFields: { id: number; value: string }[];
}


const Quiz2 = () => {

	const router = useRouter();
	// const { register, handleSubmit } = useForm<MyForm>({ defaultValues: {} })
	const {
		control,
		handleSubmit,
		register,
	} = useForm<FormData>({
		defaultValues: { inputFields: [{ id: 1, value: '' }] },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'inputFields',
	});

	const submit: SubmitHandler<FormData> = async (data) => {
		router.push('/quizzes/3')
		console.log(data);

	}

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.advantages}>
						<p>Преимущества</p>
						{fields.map((field, index) => (
							<div key={field.id}>
								<input
									{...register(`inputFields.${index}.value` as const)}
									type="text"
									placeholder='Advantages'
									defaultValue={field.value}
								/>
								<Image alt='Basket' src={basket} onClick={() => remove(index)} />
							</div>
						))}
						<button type="button" onClick={() => append({ id: fields.length + 1, value: '' })}>
							+
						</button>
					</div>
					<div className={styles.checkbox}>
						<p>Checkbox группа</p>
						<label>
							<input {...register('checkbox')} type="checkbox" />
							1
						</label>
						<label>
							<input {...register('checkbox')} type="checkbox" />
							2
						</label>
						<label>
							<input {...register('checkbox')} type="checkbox" />
							3
						</label>
					</div>
					<div className={styles.checkbox}>
						<p>Radio группа</p>
						<label>
							<input {...register('radio')} value="1" type="radio" />
							1
						</label>
						<label>
							<input {...register('radio')} value="2" type="radio" />
							2
						</label>
						<label>
							<input {...register('radio')} value="3" type="radio" />
							3
						</label>
					</div>
				</div>
			</div>
			<Buttons />
		</form>
	)
}

export default Quiz2
