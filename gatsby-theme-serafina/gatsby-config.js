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
            name: `Serena`,
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
        ]
    }
};
