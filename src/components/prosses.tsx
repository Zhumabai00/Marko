"use client"
import React from 'react'
import styles from '../app/quizzes/page.module.css'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Dot, Dotblue, DotCompleted } from "@/assets";

const Progress = () => {
	const pathname = usePathname()
	const step = pathname.slice(-1)
	const percent = Math.round(((+step - 1) / 2 * 100))

	return (
		<>
			<div className={styles.progress}>
				<div className={styles.dotGroup}>
					<div className={styles.dot}>
						<Image alt='dot' src={(+step > 1) ? DotCompleted : (+step === 1) ? Dotblue : Dot} />
					</div>
					<div className={styles.dot}>
						<Image alt='dot' src={(+step > 2) ? DotCompleted : (+step === 2) ? Dotblue : Dot} />
					</div>
					<div className={styles.dot}>
						<Image alt='dot' src={(+step > 3) ? DotCompleted : (+step === 3) ? Dotblue : Dot} />
					</div>
				</div>
				<div style={{ width: `${percent}%` }} className={styles.progressInner}></div>
			</div>
		</>
	)
}

export default Progress
