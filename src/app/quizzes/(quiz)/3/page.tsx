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
import { IData } from '@/models/IForm';
import { clearSubmit } from '@/store/reducers/formSlice';

const Quiz3: React.FC = () => {
	const dispatch = useAppDispatch()
	const formData = useAppSelector((state) => state.formReducer)
	const [isModal, setModal] = useState<boolean>(false)
	const [isError, setError] = useState<boolean>(false)

	const {
		control,
		handleSubmit,
	} = useForm<IData>({
		defaultValues: { about: formData.data.about },
	});


	const [createUser, { error }] = useMutation(CREATE_USER)
	const submit: SubmitHandler<IData> = async (data) => {
		await dispatch(setFormData(data))
		try {
			await createUser({
				variables: {
					about: formData.data.about,
					advantages: formData.data.advantages,
					contacts: formData.data.contacts,
					personalData: formData.data.personalData
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
		await dispatch(clearSubmit({}))
		setError(false)
		setModal(true)
	}
	if (error) {
		return <h1>Error... ({error.message})</h1>
	}
	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className={styles.inputs}>
				<div className={styles.label}>
					<p>Никнейм</p>
					<Controller
						name="about"
						control={control}
						rules={{ required: true }}
						defaultValue={formData.data.about}
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
