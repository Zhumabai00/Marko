"use client"
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from '../../page.module.css'
import { Buttons } from '@/components/Buttons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setFormData } from '@/store/reducers';

interface FormData {
	about: string;
}

const Quiz3: React.FC = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)

	const {
		control,
		handleSubmit,
	} = useForm<FormData>({
		defaultValues: { about: formData.about },
	});

	console.log(formData);
	const submit: SubmitHandler<FormData> = async (data) => {
		dispatch(setFormData(data))
	}

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.inputs}>
				<div className={styles.label}>
					<p>Никнейм</p>
					<Controller
						name="about"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<textarea
								{...field}
								placeholder='Write about you'
							/>
						)}
					/>
				</div>
			</div>
			<Buttons />
		</form>
	);
};

export default Quiz3;
