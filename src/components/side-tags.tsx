import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SideTags: React.FC = () => {
  // GraphQL 쿼리를 사용하여 태그 데이터를 가져옵니다.
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <div className="side-tags">
      <h2>Tags</h2>
      <hr />
      <ul>
        {data.allMdx.group.map((tag: any) => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${tag.fieldValue}`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideTags;
