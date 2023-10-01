import type { GatsbyConfig } from "gatsby";
import math from 'remark-math';
import katex from 'rehype-katex';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `skeep194.github.io`,
    siteUrl: `https://www.blog.skeep.link`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [math],
        rehypePlugins: [katex]
      },
    },"gatsby-plugin-sitemap", "gatsby-plugin-styled-components", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },    
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/pages/`,
    },
  },]
};

export default config;
