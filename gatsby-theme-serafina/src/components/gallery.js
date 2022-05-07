import React, {useState} from "react";
import Layout from "./layout";
import PhotoAlbum from "react-photo-album";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {Box} from "theme-ui";
import SEO from "./seo";

export default ({name, options, data}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const openLightbox = (event, photo, index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const galleryPhotos = data.gallery.localImage.map((photo, index) => ({
        src: photo.childImageSharp.gatsbyImageData.images.fallback.src,
        width: photo.childImageSharp.gatsbyImageData.width,
        height: photo.childImageSharp.gatsbyImageData.height,
        sizes: photo.childImageSharp.gatsbyImageData.images.sources[0].sizes,
        srcSet: photo.childImageSharp.gatsbyImageData.images.sources[0].srcSet,
        alt: data.gallery.photos[index].alt,
        title: data.gallery.photos[index].alt
    }));

    console.log(galleryPhotos)

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
        </Box>
        {isOpen && (
            <Lightbox
                mainSrc={galleryPhotos[photoIndex].src}
                nextSrc={galleryPhotos[(photoIndex + 1) % galleryPhotos.length].src}
                prevSrc={galleryPhotos[(photoIndex + galleryPhotos.length - 1) % galleryPhotos.length].src}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + galleryPhotos.length - 1) % galleryPhotos.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % galleryPhotos.length)}
                imageCaption={galleryPhotos[photoIndex].title}
                reactModalStyle={{overlay: {zIndex: 200}}}
            />
        )}
    </Layout>);
};
