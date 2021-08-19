import * as React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
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
          <div>
            <h2>{node.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPage
