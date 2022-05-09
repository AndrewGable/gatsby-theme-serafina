import React from "react";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";

const GalleryPage = ({ data, pageContext }) => {
  const { name, s3, options } = pageContext;
  return <Gallery name={name} s3={s3} options={options} photos={getPhotos(s3, data)} />;
};

const getPhotos = (s3, data) => {
    return s3 ?
      // Images loaded from `gatsby-source-s3-image` come in a different shape than `gallery`
      data.allS3ImageAsset.edges.map((photo) => ({
        src: photo.node.childImageSharp.gatsbyImageData.images.fallback.src,
        width: photo.node.childImageSharp.gatsbyImageData.width,
        height: photo.node.childImageSharp.gatsbyImageData.height,
        sizes: photo.node.childImageSharp.gatsbyImageData.images.sources[0].sizes,
        srcSet: photo.node.childImageSharp.gatsbyImageData.images.sources[0].srcSet,
        alt: photo.node.Key.replace(/\.[^/.]+$/, ""),
        title: photo.node.Key.replace(/\.[^/.]+$/, ""),
        EXIF: photo.node.EXIF
      }))
      :
      data.gallery.localImage.map((photo, index) => ({
        src: photo.childImageSharp.gatsbyImageData.images.fallback.src,
        width: photo.childImageSharp.gatsbyImageData.width,
        height: photo.childImageSharp.gatsbyImageData.height,
        sizes: photo.childImageSharp.gatsbyImageData.images.sources[0].sizes,
        srcSet: photo.childImageSharp.gatsbyImageData.images.sources[0].srcSet,
        alt: data.gallery.photos[index].alt,
        title: data.gallery.photos[index].alt
      }));
}

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
  allS3ImageAsset {
    edges {
      node {
        Key
        EXIF {
          Model
          LensModel
          ExposureTime
          FNumber
          ISO
          FocalLength
        }
        childImageSharp {
          gatsbyImageData(quality: 80, placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`;
