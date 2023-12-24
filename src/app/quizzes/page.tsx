import React from 'react'
import styles from './page.module.css'
import User from '@/components/user'
import ContactForm from '@/components/contactForm'

const Quizzes = () => {

	return (
		<div className={styles.user}>
			<User />
			<ContactForm />
		</div>
	)
}

export default Quizzes
