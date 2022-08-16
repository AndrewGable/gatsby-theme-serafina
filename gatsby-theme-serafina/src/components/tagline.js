import React from "react";
import { Text } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";

const Tagline = () => {
    const data = useStaticQuery(graphql`
    query TaglineQuery {
      site {
        siteMetadata {
          tagline
        }
      }
    }
  `);
    const {
        site: {
            siteMetadata: {tagline}
        }
    } = data;

    return tagline ? (
        <Text
            sx={{
                alignSelf: ["flex-end", null, null, "initial"],
                color: "muted",
                mt: [0, null, null, 2],
                fontSize: [2, 2, 4, 4],
                whiteSpace: "nowrap",
                fontWeight: 700
            }}
        >
            {tagline}
        </Text>
    ) : null;
};

export default Tagline;
