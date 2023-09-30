import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

const Head: React.FC = () => {
  // 여기서는 정적인 데이터를 사용했습니다. 실제로는 동적으로 가져와야 합니다.
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
  `);
  
  const { pathname } = useLocation();
  const { title, description, siteUrl } = data.site.siteMetadata;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <title>{title}</title>
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:description" content={description} />
      <link rel="stylesheet" href="/lib/icofont/icofont.min.css" />
      <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

export default Head;
