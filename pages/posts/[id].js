import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(
    `https://taibacreations.com/wp-json/wp/v2/posts?_embed&slug=${id}`
  );
  const data = await res.json();
  const my = await fetch("https://taibacreations.com/wp-json/wp/v2/users");
  const user = await my.json();
  return {
    props: {
      data,
      user,
    },
  };
}

export default function Home({ data, user }) {
  const postHtml = data.map((post, i) => {
    return (
      <>
        <Head>
          <title key={post.id}>{post.title.rendered}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl} key={post.id}>
            {post.title.rendered}
          </h1>
          <div className={utilStyles.lightText}>
            <div key={post.id} className={utilStyles.mosab}>
              <img
                alt="Author Name"
                className={utilStyles.borderCircle}
                src={post._embedded.author[0].avatar_urls["24"]}
                width={24}
                height={24}
              />
              <p className={utilStyles.nameauthor}>
                {post._embedded.author[0].name}
              </p>
            </div>
            <p key={post.id} className={utilStyles.datemy}>
              <Date dateString={post.date} />
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      </>
    );
  });

  return (
    <>
      <Layout>{postHtml}</Layout>
    </>
  );
}
