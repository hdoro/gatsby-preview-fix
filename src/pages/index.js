import * as React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const IndexPage = ({ data: { site, posts } }) => {
  console.log({ posts })
  return (
    <div>
      <h1>{site.title}</h1>
      <div>
        {posts.edges.map(({ node }) => (
          <div key={node.id}>
            <h2>{node.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPage
