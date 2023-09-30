import React from 'react';
import { graphql, useStaticQuery, Link,PageProps,navigate } from 'gatsby';
import styled from 'styled-components';
import Pagination from '../components/pagination';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ListItem = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Tips = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTime = styled.time`
  font-size: 1rem;
`;

const Categories = styled.div`
  span {
    font-weight: bold;
  }
`;

const Tags = styled.div`
  span {
    font-weight: bold;
  }
`;

const Summary = styled.div`
  margin-top: 1rem;
`;

interface PageContextProps {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
}

const Layout: React.FC<PageProps<{}, PageContextProps>> = ({pageContext}) => {
  const {limit, skip, numPages, currentPage} = pageContext;
  const data = useStaticQuery<Queries.layoutQuery>(graphql`
    query layout {
      allMdx {
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
            }
          }
        }
      }
    }
  `);

  return (
    <Wrapper className="max-wrapper">
      {data.allMdx.edges.map(({ node }, uniqueKey) => {
        if (!node.fields?.slug || !node.frontmatter?.title || !node.frontmatter?.date)
          return <div key={uniqueKey}>Cannot query required fields</div>;

        return (
          <ListItem key={node.fields.slug} className="list-item" >
            <Title className="title">
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </Title>
            <Tips className="tips">
              <div className="date">
              <StyledTime dateTime={node.frontmatter.date && typeof node.frontmatter.date === 'string'
                ? new window.Date(node.frontmatter.date).toISOString()
                : ''}>
                {node.frontmatter.date && typeof node.frontmatter.date === 'string'
                  ? new window.Date(node.frontmatter.date).toLocaleDateString()
                  : 'Invalid Date'}
              </StyledTime>
              </div>
              {node.frontmatter.categories && (
                <Categories className="categories">
                  <span>Categories:</span>
                  {node.frontmatter.categories
                    .filter((category): category is string => category !== null)
                    .slice(0, 2)
                    .map((category: string) => (
                      <Link key={category} to={`/categories/${category}`}>
                        {category}
                      </Link>
                    ))}
                </Categories>
              )}
              {node.frontmatter.tags && (
                <Tags className="tags">
                  <span>Tags:</span>
                  {node.frontmatter.tags
                    .filter((tag): tag is string => tag !== null)
                    .slice(0, 5)
                    .map((tag: string) => (
                      <Link key={tag} to={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    ))}
                </Tags>
              )}
            </Tips>
            <Summary className="summary">{node.excerpt}</Summary>
          </ListItem>
        );
      })}
            <Pagination 
        current={currentPage} 
        total={numPages} 
        size={limit} 
        navigateToPage={(pageNumber) => {
          if(pageNumber === 1){
            navigate(`/page`); // 이걸로 갈거야? 수정 해~
          }
          else{
            navigate(`/page/${pageNumber}`);
          }
        }} 
      />
    </Wrapper>
  );
};



export default Layout;
