import React from 'react'
import styles from '../app/quizzes/page.module.css'

const Progress = () => {
	return (
		<>
			<div className={styles.progress}>
				<div className={styles.dotGroup}>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
				</div>
				<div style={{ width: '50%' }} className={styles.progressInner}></div>
			</div>
		</>
	)
}

export default Progress
