import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SideCategories: React.FC = () => {
  // GraphQL 쿼리를 사용하여 카테고리 데이터를 가져옵니다.
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <div className="side-categories">
      <h2>Categories</h2>
      <hr />
      <ul>
        {data.allMdx.group.map((category: any) => (
          <li key={category.fieldValue}>
            <Link to={`/categories/${category.fieldValue}`}>
              {category.fieldValue}({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideCategories;
