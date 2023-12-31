import path, { format } from 'path';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import reporter from 'gatsby-cli/lib/reporter';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const fileName: string = createFilePath({ node, getNode, basePath: `pages` })
    console.log(fileName)
    const formattedSlug: string = fileName.replace(/\/(\d+)-/, '/')
    const nodeNum: number = parseInt(fileName.substring(1).split("-")[0])
    if (Number.isNaN(nodeNum)) {
      console.log("nodeNum should not be NaN")
      reporter.panicOnBuild("nodeNum should not be NaN")
    }
    createNodeField({
      node,
      name: `slug`,
      value: formattedSlug,
    });
    createNodeField({
      node,
      name: `nodeNum`,
      value: nodeNum
    })
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageResult = await graphql<Queries.createPagesQuery>(`
    query createPages{
      allMdx {
        totalCount
      }
    }
  `);

  if (pageResult.errors || pageResult.data === undefined) {
    console.error(pageResult.errors)
    throw pageResult.errors
  }

  const postsPerPage = 10;

  const numPages = Math.ceil(pageResult.data.allMdx.totalCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve('./src/templates/post-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  const postsResult = await graphql<Queries.createPostQuery>(`
    query createPost{
      allMdx(sort: {fields: {nodeNum: DESC}}) {
        nodes {
          id
          fields {
            slug
            nodeNum
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)
  if (postsResult.errors) {
    reporter.panicOnBuild('Error loading MDX result', pageResult.errors)
  }

  // Create blog post pages.
  const posts = postsResult.data?.allMdx.nodes

  if(!posts) {
    reporter.panicOnBuild("something wrong with posts");
    return;
  }

  // 각 포스트 페이지 생성
  posts.forEach(node => {
    if(!node.fields?.slug || !node.internal.contentFilePath){
      reporter.panicOnBuild("something wrong when generating page")
      return;
    }
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: node.fields.slug,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${path.resolve('./src/templates/blog-post.tsx')}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
  // 태그 페이지 생성
  const tags = await graphql<Queries.createTagPagesQuery>(`
    query createTagPages {
      allMdx {
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  tags.data?.allMdx.group.forEach(node => {
    if(!node.fieldValue) {
      reporter.panicOnBuild("tag page build fail not exist fieldValue")
      return
    }
    createPage({
      path: `/tags/${node.fieldValue}`,
      component: `${path.resolve('./src/templates/tag.tsx')}`,
      context: { tag: node.fieldValue }
    })
  })
};