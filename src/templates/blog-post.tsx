// src/templates/blog-post.tsx

import React,{FC} from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import Layout from '../components/layout';
import 'katex/dist/katex.min.css';
import { MathBlock } from '../components/Mathblock';
import Utterances from '../components/Utterances';
import SEO from '../components/seo';
import InlineCode from '../components/InlineCode';



const components = {
  MathBlock,
  code: InlineCode
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
    <section className='single'>
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <hr/>
      <div className='content'>
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
    </section>
    <Utterances repo='skeep194/blog.skeep.link' theme='preferred-color-scheme'/>
  </Layout>
);

export default BlogPost;

export const Head = ({ data }: BlogPostProps) => {
  return <SEO title={data.mdx.frontmatter.title} />
}
