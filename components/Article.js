import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Article({article}) {
  return (
    <article className={`${styles.card} ${styles.link}`}>
      <Link href={`article${article.permalink}`}>
        <h1>{article.title}</h1>
      </Link>
    </article>
  );
}