import React from 'react';
import { graphql, useStaticQuery, Link,PageProps,navigate } from 'gatsby';
import Pagination from '../components/pagination';
import Layout from '../components/layout';
import SEO from '../components/seo';


function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}/${month}/${day}`;
}

interface PageContextProps {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
}

const PostList: React.FC<PageProps<{}, PageContextProps>> = ({pageContext}) => {
  const {limit, skip, numPages, currentPage} = pageContext;
  const query = useStaticQuery<Queries.postListQuery>(graphql`
    query postList {
      allMdx(sort: {fields: {nodeNum: DESC}}) {
        edges {
          node {
            frontmatter {
              title
              date
              tags
              categories
            }
            excerpt
            fields {
              slug
              nodeNum
            }
          }
        }
      }
    }
  `);
  const data = query.allMdx.edges.slice(skip, skip+limit);

  return (
    <Layout>
    <div className="max-wrapper">
      {data.map(({ node }, uniqueKey) => {
        if (!node.fields?.slug || !node.frontmatter?.title || !node.frontmatter?.date)
          return <div key={uniqueKey}>Cannot query required fields</div>;

        return (
          <section key={node.fields.slug} className="list-item" >
            <h1 className="title">
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </h1>
            <div className="tips">
              <div className="date">
              <time dateTime={node.frontmatter.date && typeof node.frontmatter.date === 'string'
                ? formatDate(new Date(node.frontmatter.date).toISOString())
                : ''}>
                {node.frontmatter.date && typeof node.frontmatter.date === 'string'
                  ? formatDate(new Date(node.frontmatter.date).toISOString())
                  : 'Invalid Date'}
              </time>
              </div>
              {node.frontmatter.categories && (
                <div className="categories">
                  <span>Categories:</span>
                  {node.frontmatter.categories
                    .filter((category): category is string => category !== null)
                    .slice(0, 2)
                    .map((category: string) => (
                      <Link key={category} to={`/categories/${category}`}>
                        {category}
                      </Link>
                    ))}
                </div>
              )}
              {node.frontmatter.tags && (
                <div className="tags">
                  <span>Tags:</span>
                  {node.frontmatter.tags
                    .filter((tag): tag is string => tag !== null)
                    .slice(0, 5)
                    .map((tag: string) => (
                      <Link key={tag} to={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    ))}
                </div>
              )}
            </div>
            <div className="summary">{node.excerpt}</div>
          </section>
        );
      })}
            <Pagination 
        current={currentPage} 
        total={numPages} 
        size={limit} 
        navigateToPage={(pageNumber) => {
          if(pageNumber === 1){
            navigate(`/`);
          }
          else{
            navigate(`/page/${pageNumber}`);
          }
        }} 
      />
    </div>
    </Layout>
  );
};



export default PostList;

export const Head = () => {
  return <SEO />
}
