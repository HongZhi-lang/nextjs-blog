import Head from "next/head"
// import { useRouter } from "next/router"
import Layout from "/components/layout"
import Date from "/components/date"
import { getAllPostIds, getPostData } from "/utils/posts"
import utilStyles from "../../styles/utils.module.css"

export default function Post({ postData }) {
  // const router = useRouter()
  // if (router.isFallback) {
  //   return <div>...加载中</div>
  // }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
