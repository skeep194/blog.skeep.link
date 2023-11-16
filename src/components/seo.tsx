import React, { PropsWithChildren } from 'react';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';

export interface SEOProps {
  title?: string | undefined
  description?: string | undefined
}

const SEO: React.FC<PropsWithChildren<SEOProps>> = ({ title, description, children }) => {
  const { pathname } = useLocation()

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const seo = {
    title: title || data.site.siteMetadata.title,
    description: description || data.site.siteMetadata.description,
    // image: `${siteUrl}${image}`,
    url: `${data.site.siteMetadata.siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <meta httpEquiv="content-language" content="ko" />
      <title>{seo.title}</title>
      <link rel="canonical" href={`${seo.url}${pathname}`} />
      <meta name="naver-site-verification" content="b0d1c97bfa92bc9b3e8775a6128ef79196cb0fb2" />
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="blog" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={`${seo.url}${pathname}`} />
      <meta property="og:description" content={seo.description} />
      <link rel="stylesheet" href="/lib/icofont/icofont.min.css" />
      {children}
    </>
  )
}

export default SEO;
