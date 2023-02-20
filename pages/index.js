import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css';

export default function Home({data}) {
  console.log(data)

  const postHtml = data.map((post,i) =>{
    return (
      <>
      <ul className={utilStyles.list}>
      <li className={utilStyles.listItem}>
        <Link href={`/posts/${post['slug']}`}>
        <h3 key={post.id}>{post.title.rendered}</h3>
        </Link>
        <small className={utilStyles.lightText}>
        <Date dateString={post.date} />
        </small>
        </li>
        </ul>
      </>  
    )
  })
  
  return (
    <>
    <Layout home>
    <Head>
        <title>Taiba Creation</title>
    </Head>
    <section className={utilStyles.headingMd}>
    <p>My name is Mosab Shaheen. I am web developer.</p>
        <p>
          (This is a sample blog website using next js.)
        </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>Blog</h2>
    {postHtml}
    </section>
    </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://taibacreations.com/wp-json/wp/v2/posts?_embed`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data
    },
  }
}
