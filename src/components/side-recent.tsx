import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SideRecent: React.FC = () => {
  // 여기서는 정적인 데이터를 사용했습니다. 실제로는 동적으로 가져와야 합니다.
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 5, sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  return (
    <div className="side-recent">
      <h2 className="side-title">
        <Link to="/recent">Recent Posts</Link>
      </h2>
      <hr />
      <ul>
        {data.allMdx.nodes.map((node: any) => (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideRecent;
