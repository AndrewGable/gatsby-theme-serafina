const withDefaults = require(`./utils/default-options`);
const menuLinks = require(`./utils/default-menu-links`);

module.exports = themeOptions => {
    const options = withDefaults(themeOptions);
    return {
        siteMetadata: {
            title: `Title placeholder`,
            description: `Description placeholder`,
            author: "Gatsby",
            image: "",
            name: `Serafina`,
            tagline: `Gatsby Theme`,
            menuLinks,
            socialLinks: [
                {
                    name: `Facebook`,
                    url: `https://facebook.com`
                },
                {
                    name: `Twitter`,
                    url: `https://twitter.com`
                },
                {
                    name: `Instagram`,
                    url: `https://instagram.com`
                }
            ]
        },
        plugins: [
            {
                resolve: `gatsby-plugin-mdx`,
                options: {
                    extensions: [`.mdx`, `.md`],
                    defaultLayouts: {
                        default: require.resolve("./src/components/page.js")
                    },
                    gatsbyRemarkPlugins: [
                        {
                            resolve: `gatsby-remark-images`,
                            options: {
                                maxWidth: 1380,
                                linkImagesToOriginal: false
                            }
                        },
                    ],
                }
            },
            `gatsby-plugin-react-helmet`,
            `gatsby-plugin-theme-ui`,
            `gatsby-transformer-sharp`,
            `gatsby-plugin-sharp`,
            {
                resolve: `gatsby-transformer-yaml`,
                options: {
                    typeName: `Gallery`
                }
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: options.contentPath || `src`,
                    name: options.contentPath || `src`
                }
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: options.assetPath || `src/assets`,
                    name: options.assetPath || `src/assets`
                }
            },
        ]
    }
};
