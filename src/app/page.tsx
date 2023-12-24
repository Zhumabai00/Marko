import styles from './page.module.css'
import ContactForm from '@/components/contactForm'
import User from '@/components/user'

export default function Home() {
  return (
    <div className={styles.user}>
      {/* <div style={{ width: '50%' }} className="progress__inner"></div> */}
      <User />
      <ContactForm />
    </div>
  )
}
