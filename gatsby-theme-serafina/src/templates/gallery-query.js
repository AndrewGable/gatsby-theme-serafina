import React from "react";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";

const GalleryPage = ({ data, pageContext }) => {
  const { name, options } = pageContext;
  return <Gallery name={name} options={options} data={data} />;
};

export default GalleryPage;

export const query = graphql`query GalleryQuery($name: String) {
  gallery(name: {eq: $name}) {
    name
    localImage {
      childImageSharp {
        gatsbyImageData(quality: 80, placeholder: BLURRED, layout: FULL_WIDTH)
      }
    }
    photos {
      alt
    }
  }
}
`;
