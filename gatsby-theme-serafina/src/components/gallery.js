import React, {useState, useCallback} from "react";
import Layout from "./layout";
import PhotoAlbum from "react-photo-album";
import Carousel, {Modal, ModalGateway} from "react-images";
import {Box} from "theme-ui";
import SEO from "./seo";

export default ({name, options, data}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const galleryPhotos = data.gallery.localImage.map((photo, index) => ({
        src: photo.childImageSharp.gatsbyImageData.images.fallback.src,
        width: photo.childImageSharp.gatsbyImageData.width,
        height: photo.childImageSharp.gatsbyImageData.height,
        sizes: photo.childImageSharp.gatsbyImageData.images.sources.sizes,
        srcSet: photo.childImageSharp.gatsbyImageData.images.sources.srcSet,
        alt: data.gallery.photos[index].alt,
        title: data.gallery.photos[index].alt
    }));

    return (<Layout>
            <SEO title={name}/>
            <Box sx={{p: `${options.spacing}px`}}>
                <PhotoAlbum
                    photos={galleryPhotos}
                    layout={options.layout}
                    spacing={options.spacing}
                    columns={(containerWidth) => {
                        if (containerWidth < 500) return 1;
                        if (containerWidth < 800) return 2;
                        return 3;
                    }}
                    onClick={openLightbox}
                />
                <ModalGateway>
                    {viewerIsOpen ? (<Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={galleryPhotos.map(x => ({
                                    ...x, srcset: x.srcSet, caption: x.title
                                }))}
                            />
                        </Modal>) : null}
                </ModalGateway>
            </Box>
        </Layout>);
};
