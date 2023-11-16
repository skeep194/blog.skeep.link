import { Link, graphql } from 'gatsby';
import React from 'react'
import Layout from '../components/layout';

interface Page {
  path: string;
  frontmatter: {
    title: string;
    publishDate: string;
    tags?: string[];
  };
}

interface Group {
  key: string;
  pages: Page[];
}

interface TagProps {
  data: {
    allMdx: {
      nodes: {
        frontmatter: {
          title: string
          date: string
          tags: string[]
        },
        fields: {
          slug: string
        }
      }[]
    }
  }
}

export const query = graphql`
  query($tag: String!) {
    allMdx(filter: { frontmatter: { tags: {in: [$tag]} } }, sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`;

const groupByYear = ({ data }: TagProps) => {
  const arr = data.allMdx.nodes
  let result = [[arr[0]]]
  arr.map((v) => {
    if(v.frontmatter.title == arr[0].frontmatter.title) return
    if(new Date(result[result.length-1][0].frontmatter.date).getFullYear() != new Date(v.frontmatter.date).getFullYear()) {
      result.push([])
    }
    result[result.length-1].push(v)
  })
  return result
}

const Category = (props: TagProps) => {
  const year = groupByYear(props)
  return (
    <Layout>
      <section id="archive">
        {year.map((group) =>{
          const presentYear = new Date(group[0].frontmatter.date).getFullYear()
          return (
          <div className="group" key={presentYear}>
            <h3 className="key">{presentYear}</h3>
            {group.map((page) => (
              <div className="value" key={page.fields.slug}>
                <time className="date" dateTime={page.frontmatter.date.toString()}>
                  {new Date(page.frontmatter.date).toLocaleDateString(
                    'ko-KR',
                    {
                      month: 'numeric',
                      day: 'numeric',
                    }
                  )}
                </time>

                <div className="title">
                  <Link to={page.fields.slug}>{page.frontmatter.title}</Link>

                  {page.frontmatter.tags && (
                    <div className="tags">
                      {page.frontmatter.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/tags/${tag.toLowerCase()}`}
                          className="tags"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )})}
      </section>
    </Layout>
  );
};

export default Category