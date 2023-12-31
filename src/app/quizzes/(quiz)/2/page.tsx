"use client"
import React, { useId } from 'react'
import styles from '../../page.module.css'
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import basket from '@/assets/basket.svg'
import { Buttons } from '@/components/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { addInputField, handleChange, removeInputField, setFormData, updateInputValue } from '@/store/reducers'
import { IAdvan, IData } from '@/models/IForm'

interface FormData {
	advantages: IAdvan
	inputFields: { id: number; value: string }[];
}

const Quiz2 = () => {
	const dispatch = useAppDispatch()
	const { data, inputstore } = useAppSelector((state) => state.formReducer)
	const inputData = useAppSelector((state) => state.inputReducer)

	const router = useRouter();
	const {
		handleSubmit,
		register,
		control,
	} = useForm<IAdvan>({
		defaultValues: {},
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
	const changeHandle = (e: any) => {
		dispatch(handleChange({ [e.target.name]: e.target.value })),
			console.log(inputstore)
	}
	const submit: SubmitHandler<IAdvan> = async (data) => {
		router.push('/quizzes/3')
		dispatch(setFormData({ advantages: data }))
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
									{...register(`inputs.${index}.value` as const)}
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
							<input {...register('checkbox')} value={data.advantages.checkbox} type="checkbox" />
							1
						</label>
						<label>
							<input {...register('checkbox')} value={data.advantages.checkbox} type="checkbox" />
							2
						</label>
						<label>
							<input {...register('checkbox')} value={data.advantages.checkbox} type="checkbox" />
							3
						</label>
					</div>
					<div className={styles.checkbox}>
						<p>Radio группа</p>
						<label>
							<input {...register('radio')} value={data.advantages.radio} type="radio" />
							1
						</label>
						<label>
							<input {...register('radio')} value={data.advantages.radio} type="radio" />
							2
						</label>
						<label>
							<input {...register('radio')} value={data.advantages.radio} type="radio" />
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
