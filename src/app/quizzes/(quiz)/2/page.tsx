"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import basket from '@/assets/basket.svg'
import { Buttons } from '@/components/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { addInputField, removeInputField, setFormData, updateInputValue } from '@/store/reducers'
import { IAdvan } from '@/models/IForm'

interface FormData {
	advantages: IAdvan
	inputFields: { id: number; value: string }[];
}

const Quiz2 = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const inputData = useAppSelector((state) => state.inputReducer)

	const router = useRouter();
	const {
		handleSubmit,
		register,
	} = useForm<FormData>({
		defaultValues: { advantages: formData.advantages },
	});

	const handleAddField = () => {
		dispatch(addInputField());
	};

	const handleRemoveField = (id: number) => {
		dispatch(removeInputField(id));
	};

	const handleInputChange = (id: number, value: string) => {
		dispatch(updateInputValue({ id, value }));
	};

	const submit: SubmitHandler<FormData> = async (data) => {
		router.push('/quizzes/3')
		dispatch(setFormData(data))

	}

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.advantages}>
						<p>Преимущества</p>
						{inputData.inputFields.map((field, index) => (
							<div key={field.id}>
								<input
									{...register(`advantages.inputs.${index}.value` as const)}
									type="text"
									placeholder='Advantages'
									defaultValue={field.value}
									onChange={(e) => handleInputChange(field.id, e.target.value)}
								/>
								<Image alt='Basket' src={basket} onClick={() => handleRemoveField(field.id)} />
							</div>
						))}
						<button type="button" onClick={handleAddField}>
							+
						</button>
					</div>
					<div className={styles.checkbox}>
						<p>Checkbox группа</p>
						<label>
							<input {...register('advantages.checkbox')} type="checkbox" />
							1
						</label>
						<label>
							<input {...register('advantages.checkbox')} type="checkbox" />
							2
						</label>
						<label>
							<input {...register('advantages.checkbox')} type="checkbox" />
							3
						</label>
					</div>
					<div className={styles.checkbox}>
						<p>Radio группа</p>
						<label>
							<input {...register('advantages.radio')} value="1" type="radio" />
							1
						</label>
						<label>
							<input {...register('advantages.radio')} value="2" type="radio" />
							2
						</label>
						<label>
							<input {...register('advantages.radio')} value="3" type="radio" />
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
