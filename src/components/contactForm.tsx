import React from 'react'
import styles from '../app/page.module.css'

const ContactForm = () => {
	return (
		<div>
			<form className={styles.contactForm}>
				<div className={styles.inputs}>
					<div className={styles.label}>
						<p>Номер телефона</p>
						<input placeholder='+7 999 999-99-99' type="text" />
					</div>
					<div className={styles.label}>
						<p>Email</p>
						<input placeholder='webstudio.fractal@example.com' type="text" />
					</div>
				</div>
				<button>Начать</button>
			</form>
		</div>
	)
}

export default ContactForm
