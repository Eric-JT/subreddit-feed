import {useState, useEffect} from 'react'

import Article from '../components/Article'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('fortnitebr')

  useEffect( () => {
    if (searchTerm !== '') {
      fetch(`http://www.reddit.com/search.json?q=${searchTerm}`).then(res => {
          if (res.status === 404) {
            throw new Error({error : '404 - subreddit not found'})
          }
          if (res.status !== 200) {
            throw new Error({error : `${res.status} - Failed to load subreddit` });
          }
          return res.json().then(data => {
            if (data !== null) {
              setArticles(data.data.children)
            }
          })
        })
    }
      
  }, [searchTerm])

  return (
    <Layout>
      <header className={styles.main}>
          <input className={styles.search} type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
          <h3 className={styles.title}>Current posts on <span className={styles.logo}>{searchTerm}</span></h3>
        </header>
        <div className={styles.grid}>
          {articles.map(article => (
            <Article key={article.data.id} article={article.data} />
          ))}
        </div>
      
    </Layout>
  )
}
