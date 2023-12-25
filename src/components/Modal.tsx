import React from 'react'
import styles from '../app/quizzes/page.module.css'
import Image from 'next/image'
import Ok from '@/assets/Predefined.svg'
import close from '@/assets/close.svg'
import Error from '@/assets/DecorError.svg'
import { usePathname, useRouter } from 'next/navigation'

const Modal = ({ error, setModal, isModal }: any) => {
	const router = useRouter()
	const closeHandle = () => {
		setModal(false)
	}

	return (
		<div className={styles.modalBack}>
			{error ? <div className={styles.modalError}>
				<h1>
					<span>Ошибка</span>
					<Image onClick={closeHandle} alt='close' src={close} />
				</h1>
				<div className={''}>
					<Image alt='Error' src={Error} />
				</div>
				<button type='button' onClick={closeHandle}>Закрыть</button>
			</div>
				:
				<div className={styles.modal}>
					<h1>Форма успешно отправлена</h1>
					<div className={''}>
						<Image alt='Ok' src={Ok} />
					</div>
					<button type='button' onClick={() => router.push('/')}>На главную</button>
				</div>}
		</div>
	)
}

export default Modal
