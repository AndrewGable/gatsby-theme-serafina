module.exports = {
  siteMetadata: {
    title: `Serafina`,
    description: `Photography Theme`,
    author: "Gatsby",
    image: "https://gatsby-theme-serena.netlify.com/og-image.webp",
    name: `Serafina`,
    tagline: `Photography Theme`,
    socialLinks: [
      {
        name: `Facebook`,
        url: `https://facebook.com/123`,
      },
      {
        name: `Twitter`,
        url: `https://twitter.com/123`,
      },
      {
        name: `Instagram`,
        url: `https://instagram.com/123`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Serafina`,
        short_name: `Serafina`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        icon: `src/assets/icon.png`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-theme-serafina`,
      options: {
        enableS3: true,
        s3AccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        s3SecretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
        s3BucketName: process.env.AWS_S3_BUCKET_NAME,
        s3Domain: process.env.AWS_S3_DOMAIN,
      },
    },
  ],
}
