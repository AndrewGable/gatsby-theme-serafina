const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const Debug = require(`debug`);
const sanitizeSlug = require("./utils/sanitize-slug");
const debug = Debug(`gatsby-theme-blog-core`);
const withDefaults = require(`./utils/default-options`);

exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { galleriesPath, pagesPath, assetPath } = withDefaults(themeOptions);

  const dirs = [
    path.join(program.directory, galleriesPath),
    path.join(program.directory, pagesPath),
    path.join(program.directory, assetPath)
  ];

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

const GalleryTemplate = require.resolve(`./src/templates/gallery-query`);
const MdxTemplate = require.resolve(`./src/templates/mdx-query.js`);

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { margin, direction } = withDefaults(themeOptions);

  const result = await graphql(`
    {
      allGallery {
        edges {
          node {
            name
            slug
          }
        }
      }
      allMdx {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const { allGallery, allMdx } = result.data;

  allMdx.edges.forEach(({ node }) => {
    createPage({
      path: sanitizeSlug(node.frontmatter.slug),
      component: MdxTemplate,
      context: { id: node.id }
    });
  });

  allGallery.edges.forEach(({ node }) => {
    createPage({
      path: sanitizeSlug(node.slug),
      component: GalleryTemplate,
      context: {
        name: node.name,
        options: {
          margin,
          direction
        }
      }
    });
  });
};

exports.onCreatePage = ({ page, actions }, themeOptions) => {
  const { deletePage } = actions;
  const { disableContact } = withDefaults(themeOptions);

  if (disableContact && page.path === "/contact/") deletePage(page);
};
