import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SideRecent: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 5, sort: {frontmatter: {date: DESC}}) {
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
        <Link to="/">Recent Posts</Link>
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
