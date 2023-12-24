import React, { useState } from 'react'
import styles from './page.module.css'
import Tab1 from '@/components/tabs/tab1'
import Tab2 from '@/components/tabs/tab2'


const Quizzes = () => {
	const [activeTab, setActiveTab] = useState(0);

	const tabContents = [Tab1, Tab2];

	return (
		<div className={styles.quiz}>
			<div className={styles.progress}>
				<div className={styles.dotGroup}>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
				</div>
				<div style={{ width: '50%' }} className={styles.progressInner}></div>
			</div>
			{tabContents.map((TabContent, index) => (
				<button key={index} onClick={() => setActiveTab(index)}>
					Tab {index + 1}
				</button>
			))}
			{/* <div style={{ marginTop: '20px' }}>{<TabContents[activeTab] /></div> */}
			<Tab1 />
		</div>
	)
}

export default Quizzes
