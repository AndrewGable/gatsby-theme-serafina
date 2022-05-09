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

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { spacing, layout } = withDefaults(themeOptions);

  const result = await graphql(`
    {
      allGallery {
        edges {
          node {
            name
            slug
            s3
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const { allGallery } = result.data;

  allGallery.edges.forEach(({ node }) => {
    createPage({
      path: sanitizeSlug(node.slug),
      component: GalleryTemplate,
      context: {
        name: node.name,
        s3: node.s3,
        options: {
          spacing,
          layout
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
