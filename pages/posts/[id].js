import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';

export async function getServerSideProps(context) {
    const { id } = context.params
    const res = await fetch(`https://taibacreations.com/wp-json/wp/v2/posts?_embed&slug=${id}`)
    const data = await res.json()
    console.log(data)
  
    return {
      props: {
        data
      },
    }
  }


  export default function Home({data}) {
    console.log(data)
  
    const postHtml = data.map((post,i) =>{
      return (
        <>
        <Head>
        <title key={post.id}>{post.title.rendered}</title>
        </Head>
      <article>
          <h1 className={utilStyles.headingXl} key={post.id}>{post.title.rendered}</h1>
          <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </article>
        </>  
      )
    })
    
    return (
      <>
      <Layout >
      {postHtml}
      </Layout>
      </>
    )
  }