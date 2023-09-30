// src/templates/blog-post.tsx

import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react"

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;

interface BlogPostProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
}

const BlogPost: React.FC<React.PropsWithChildren<BlogPostProps>> = ({ data,children }) => (
  <>
    <h1>{data.mdx.frontmatter.title}</h1>
    <p>{data.mdx.frontmatter.date}</p>
    <MDXProvider>{children}</MDXProvider>
  </>
);

export default BlogPost;
