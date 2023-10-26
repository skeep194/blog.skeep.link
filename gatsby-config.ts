import type { GatsbyConfig } from "gatsby";
import { remarkCodeHike } from "@code-hike/mdx";
import math from 'remark-math';
import katex from 'rehype-katex';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `RedMage`,
    siteUrl: `https://www.blog.skeep.link`,
    descripion: `RedMage is final fantasy hybrid class. My goal is to study wide range tech like RedMage`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [[remarkCodeHike, {theme: "github-dark", lineNumbers: false}], math],
          rehypePlugins: [katex]
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },"gatsby-plugin-sitemap", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": `${__dirname}/pages/`
    },
    __key: "pages"
  },    
  {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: ["G-N2CEM3WYG4"]
    }
  },
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/images`,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `RedMage`,
      short_name: `RedMage`,
      description: `RedMage is final fantasy hybrid class. My goal is to study wide range tech like RedMage`,
      start_url: `/`,
      background_color: `#f7f0eb`,
      theme_color: `#a2466c`,
      display: `standalone`,
      icon: `images/icon.png`
    },
  },
  `gatsby-plugin-offline`,
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://blog.skeep.link',
      sitemap: 'https://blog.skeep.link/sitemap.xml',
      policy: [{userAgent: '*', allow: '/'}]
    }
  }
  ],

  flags: {
    DEV_SSR: true,
  }
};

export default config;
