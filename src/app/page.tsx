import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'
import telegram from '../assets/telegram.svg'
import ContactForm from '@/components/contactForm'

export default function Home() {
  return (
    <>
      <div className={'App'}>
        <div className={styles.user}>
          {/* <div style={{ width: '50%' }} className="progress__inner"></div> */}
          <div className={styles.userHead}>
            <div className={styles.headContent}>
              <div className={styles.headAvatar}>
                АИ
              </div>
              <div className={styles.headName}>
                <h3>Алексей Иванов</h3>
                <div className="">
                  <Link href='https://t.me/Zhumabai00'>
                    <Image src={telegram} alt='Telegram' />
                    Telegram
                  </Link>
                  <Link href='https://github.com/Zhumabai00'>
                    <Image src={telegram} alt='Telegram' />
                    GitHub
                  </Link>
                  <Link href='https://t.me/Zhumabai00'>
                    <Image src={telegram} alt='Telegram' />
                    Резюме
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  )
}
