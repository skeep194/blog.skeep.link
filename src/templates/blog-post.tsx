// src/templates/blog-post.tsx

import React,{FC} from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import Layout from '../components/layout';
import 'katex/dist/katex.min.css';
import { MathBlock } from '../components/Mathblock';



const components = {
  MathBlock,
};



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
  <Layout>
    <h1>{data.mdx.frontmatter.title}</h1>
    <p>{data.mdx.frontmatter.date}</p>
    <MDXProvider components={components}>{children}</MDXProvider>
  </Layout>
);

export default BlogPost;
