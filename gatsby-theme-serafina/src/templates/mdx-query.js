import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Page from "../components/page";
import SEO from "../components/seo";

export default function PageTemplate({ data: { mdx } }) {
    return (
        <Page>
            <SEO title={mdx.frontmatter.title} description={mdx.excerpt} />
            <h1>{mdx.frontmatter.title}</h1>
            <MDXRenderer>{mdx.body}</MDXRenderer>
        </Page>
    );
}
export const pageQuery = graphql`
    query PageQuery($id: String) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                title
            }
        }
    }
`;
