import React from 'react'
import styles from '../app/quizzes/page.module.css'
import { usePathname, useRouter } from 'next/navigation'

export const Buttons = () => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={styles.buttons}>
			<button type='button' onClick={() => router.back()}>Назад</button>
			{(pathname == '/quizzes/3') ? <button>Отправить</button> : <button>Далее</button>}
		</div>
	)
}
