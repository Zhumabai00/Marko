"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styles from '../../page.module.css'
import { Buttons } from '@/components/Buttons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setFormData } from '@/store/reducers';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_USER } from '@/apollos/queries';
import Modal from '@/components/Modal';

interface FormData {
	about: string;
}

const Quiz3: React.FC = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const [isModal, setModal] = useState<boolean>(false)
	const [isError, setError] = useState<boolean>(false)

	const {
		control,
		handleSubmit,
	} = useForm<FormData>({
		defaultValues: { about: formData.about },
	});


	const [createUser, { error }] = useMutation(CREATE_USER)
	const submit: SubmitHandler<FormData> = async (data) => {
		await dispatch(setFormData(data))
		try {
			await createUser({
				variables: {
					about: formData.about,
					advantages: formData.advantages,
					contacts: formData.contacts,
					personalData: formData.personalData
				},
			})
			console.log('User created successfully!', formData);
		} catch (err) {
			if (err instanceof ApolloError) {
				console.error('Apollo Error:', err.message);
				setError(true)
			} else {
				console.error('Unknown Error:', err);
				setError(true)
			}
		}
		setError(false)
		setModal(true)
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
						rules={{ required: true }}
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
			{(isModal) ? <Modal isModal={isModal} error={isError} setModal={setModal} /> : ''}
		</form>
	);
};

export default Quiz3;
