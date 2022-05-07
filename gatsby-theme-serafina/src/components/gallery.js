import React, { useState, useCallback } from "react";
import Layout from "./layout";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Box } from "theme-ui";
import SEO from "./seo";

export default ({ name, options, data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const galleryPhotos = data.gallery.localImage.map(photo => ({
    src: photo.childImageSharp.gatsbyImageData.images.fallback.src,
    width: photo.childImageSharp.gatsbyImageData.width,
    height: photo.childImageSharp.gatsbyImageData.height,
    sizes: photo.childImageSharp.gatsbyImageData.images.sources.sizes,
    srcSet: photo.childImageSharp.gatsbyImageData.images.sources.srcSet,
    // alt: photo.alt,
    // title: photo.alt
  }));

  return (
    <Layout>
      <SEO title={name} />
      <Box sx={{ p: `${options.margin}px` }}>
        <Gallery
          photos={galleryPhotos}
          direction={options.direction}
          margin={options.margin}
          onClick={openLightbox}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={galleryPhotos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </Box>
    </Layout>
  );
};
