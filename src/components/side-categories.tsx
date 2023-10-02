import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SideCategories: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: {frontmatter: {categories: SELECT}}) {
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
