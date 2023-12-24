"use client"
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from '../../page.module.css'
import { Buttons } from '@/components/Buttons';

interface FormData {
	about: string;
}

const Quiz3: React.FC = () => {
	const {
		control,
		handleSubmit,
		register,
	} = useForm<FormData>({
		defaultValues: {},
	});

	const submit: SubmitHandler<FormData> = async (data) => {
		console.log(data);

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
