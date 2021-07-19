
import Link from "next/link"
import Layout from "../../components/Layout"
import styles from '../../styles/Home.module.css'

export default function Article({postData}) {
    
    const post = {
        title: postData[0].data.children[0].data.title,
        permalink: postData[0].data.children[0].data.permalink,
        image: postData[0].data.children[0].data.url,
        author: postData[0].data.children[0].data.author,
        created: new Date(postData[0].data.children[0].data.created_utc).toLocaleString(),
    }

    console.log(postData[0].data.children[0].data)
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.post}>
                    
                    <div className={styles.main}>
                    <h1>{post.title}</h1>
                        <img src={post.image} width='94%' height='94%'/>
                        <p>Posted by: {post.author} created at : {post.created}</p>
                        <div className={styles.grid}>
                            <Link href='/'>
                                <a className={styles.btn}>Go Back</a>
                            </Link>
                            <a className={styles.btn} href={`https://www.reddit.com/${post.permalink}`}>Read on Reddit</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { slug } }) {
    
    const res = await fetch(`https://www.reddit.com/${slug.join("/")}.json`)

        const postData = await res.json()
        
        return {
            props: {
                postData
            }
        }
    }